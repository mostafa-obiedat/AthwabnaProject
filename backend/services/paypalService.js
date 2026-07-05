const axios = require("axios");
const Payment = require("../models/Payment");
const Coupon = require("../models/Coupon");

const PAYPAL_API = process.env.PAYPAL_API || "https://api-m.sandbox.paypal.com";

const getCredentials = () => ({
  username: process.env.PAYPAL_CLIENT_ID,
  password: process.env.PAYPAL_CLIENT_SECRET,
});

async function getAccessToken() {
  const response = await axios({
    url: `${PAYPAL_API}/v1/oauth2/token`,
    method: "post",
    auth: getCredentials(),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: "grant_type=client_credentials",
  });
  return response.data.access_token;
}

// إنشاء طلب PayPal — يستخدم للورشات (يرجع orderID) وللمنتجات (يرجع كامل البيانات)
async function createCheckoutOrder(price, description) {
  const accessToken = await getAccessToken();

  const response = await axios.post(
    `${PAYPAL_API}/v2/checkout/orders`,
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: price.toString(),
          },
          ...(description && { description }),
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

// Create PayPal Order for workshop registration
async function createPayPalOrder(price) {
  const order = await createCheckoutOrder(price);
  return order.id;
}

// Create PayPal Order for product purchase
async function createProductOrder(price, description) {
  return createCheckoutOrder(price, description || "Product Purchase");
}

// تأكيد الدفع وحفظ سجل العملية
const captureOrder = async (req, res) => {
  try {
    const { orderID, couponCode, productId } = req.body;
    const userId = req.user.id || req.user._id;

    const accessToken = await getAccessToken();

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
      {},
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const captureData = response.data;
    const transaction = captureData.purchase_units[0].payments.captures[0];

    // إذا المستخدم استخدم كوبون، حدّث عدد الاستخدامات
    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode });
      if (coupon) {
        coupon.currentUses += 1;
        coupon.usedAt = new Date();
        await coupon.save();
      }
    }

    const newPayment = new Payment({
      userId,
      orderId: captureData.id,
      transactionId: transaction.id,
      amount: transaction.amount.value,
      currency: transaction.amount.currency_code,
      status: transaction.status,
      payerEmail: captureData.payer.email_address,
      createTime: transaction.create_time,
      coupon: coupon ? coupon._id : null,
      productId: productId,
    });

    await newPayment.save();

    return res.json({ success: true, message: "تم الدفع وحفظ البيانات بنجاح" });
  } catch (error) {
    console.error("Error during payment capture:", error?.response?.data || error.message);
    return res.status(500).json({ success: false, message: "حدث خطأ أثناء معالجة الدفع" });
  }
};

module.exports = {
  createPayPalOrder,
  createProductOrder,
  captureOrder,
};
