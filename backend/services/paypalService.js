const axios = require("axios");
const Payment = require("../models/Payment"); 
const Coupon = require("../models/Coupon");

const CLIENT_ID = "AX-C0Lfx8Y7qJT7OvUX7X2u7elmt9rUxvyZJWMoTVtdt06Xi6mVzqYKn4u4s6hkB39uOCBtb9nRn8-so";
const CLIENT_SECRET = "EMrHdDSYPHt92uoMeTnyNaHGFPJDFqt-eQvLvP_cZVI-rcoSHWgRrJ37-NjJnOCmcx6WWRLYbzUwCo7Z";

async function getAccessToken() {
  const response = await axios({
    url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    method: "post",
    auth: {
      username: CLIENT_ID,
      password: CLIENT_SECRET,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: "grant_type=client_credentials",
  });
  return response.data.access_token;
}

// Create PayPal Order for workshop registration
async function createPayPalOrder(price) {
  const accessToken = await getAccessToken();

  const response = await axios.post(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: price.toString(),
          },
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

  return response.data.id; // orderID
}

//Create PayPal Order for product purchase
async function createProductOrder(price, description) {
  const accessToken = await getAccessToken();

  const response = await axios.post(
    "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: price.toString(),
          },
          description: description || "Product Purchase",
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

  return response.data; // كامل بيانات الطلب
}

// const captureOrder = async (req, res) => {
//   try {
//     const { orderID } = req.body;
//     const userId = req.user.id || req.user._id;

//     const accessToken = await getAccessToken();

//     const response = await axios.post(
//       `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     const captureData = response.data;

//     // استخراج البيانات من response
//     const transaction = captureData.purchase_units[0].payments.captures[0];

//     // حفظ في قاعدة البيانات
//     const newPayment = new Payment({
//       userId,
//       orderId: captureData.id,
//       transactionId: transaction.id,
//       amount: transaction.amount.value,
//       currency: transaction.amount.currency_code,
//       status: transaction.status,
//       payerEmail: captureData.payer.email_address,
//       createTime: transaction.create_time,
//     });

//     await newPayment.save();

//     return res.json({ success: true, message: "تم الدفع وحفظ البيانات بنجاح" });
//   } catch (error) {
//     console.error("Error during payment capture:", error?.response?.data || error.message);
//     return res.status(500).json({ success: false, message: "حدث خطأ أثناء معالجة الدفع" });
//   }
// };

const captureOrder = async (req, res) => {
  try {
    const { orderID, couponCode, productId } = req.body;
    const userId = req.user.id || req.user._id;

    const accessToken = await getAccessToken();

    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const captureData = response.data;
    const transaction = captureData.purchase_units[0].payments.captures[0];

    let coupon = null;

    // إذا المستخدم استخدم كوبون، نجيبه من القاعدة
    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode });

      if (coupon) {
        // زيد عدد الاستخدامات
        coupon.currentUses += 1;
        coupon.usedAt = new Date(); 
        await coupon.save();
      }
    }

    // أنشئ سجل الدفع
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
      productId: productId 
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



// const axios = require("axios");
// const Payment = require("../models/Payment"); 

// const CLIENT_ID = "AX-C0Lfx8Y7qJT7OvUX7X2u7elmt9rUxvyZJWMoTVtdt06Xi6mVzqYKn4u4s6hkB39uOCBtb9nRn8-so";
// const CLIENT_SECRET = "EMrHdDSYPHt92uoMeTnyNaHGFPJDFqt-eQvLvP_cZVI-rcoSHWgRrJ37-NjJnOCmcx6WWRLYbzUwCo7Z";

// async function getAccessToken() {
//   const response = await axios({
//     url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
//     method: "post",
//     auth: {
//       username: CLIENT_ID,
//       password: CLIENT_SECRET,
//     },
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: "grant_type=client_credentials",
//   });
//   return response.data.access_token;
// }

// // Create PayPal Order for workshop registration
// async function createPayPalOrder(price) {
//   const accessToken = await getAccessToken();

//   const response = await axios.post(
//     "https://api-m.sandbox.paypal.com/v2/checkout/orders",
//     {
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "USD",
//             value: price.toString(),
//           },
//         },
//       ],
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data.id; // orderID
// }

// //Create PayPal Order for product purchase
// async function createProductOrder(price, description) {
//   const accessToken = await getAccessToken();

//   const response = await axios.post(
//     "https://api-m.sandbox.paypal.com/v2/checkout/orders",
//     {
//       intent: "CAPTURE",
//       purchase_units: [
//         {
//           amount: {
//             currency_code: "USD",
//             value: price.toString(),
//           },
//           description: description || "Product Purchase",
//         },
//       ],
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data; // كامل بيانات الطلب
// }

// const captureOrder = async (req, res) => {
//   try {
//     const { orderID } = req.body;
//     const userId = req.user.id || req.user._id;

//     const accessToken = await getAccessToken();

//     const response = await axios.post(
//       `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     const captureData = response.data;

//     // استخراج البيانات من response
//     const transaction = captureData.purchase_units[0].payments.captures[0];
//  // استخراج الـ productId (الـ sku)
//  const products = captureData.purchase_units[0].items.map(item => ({
//   productId: item.sku,  // هنا يتم استخراج الـ productId
//   name: item.name,
//   quantity: item.quantity,
//   price: item.unit_amount.value,
// }));

//     // حفظ في قاعدة البيانات
//     const newPayment = new Payment({
//       userId,
//       orderId: captureData.id,
//       transactionId: transaction.id,
//       amount: transaction.amount.value,
//       currency: transaction.amount.currency_code,
//       status: transaction.status,
//       payerEmail: captureData.payer.email_address,
//       createTime: transaction.create_time,
//       products,
//     });

//     await newPayment.save();

//     return res.json({ success: true, message: "تم الدفع وحفظ البيانات بنجاح" });
//   } catch (error) {
//     console.error("Error during payment capture:", error?.response?.data || error.message);
//     return res.status(500).json({ success: false, message: "حدث خطأ أثناء معالجة الدفع" });
//   }
// };


// module.exports = {
//   createPayPalOrder,
//   createProductOrder,
//   captureOrder,
// };
