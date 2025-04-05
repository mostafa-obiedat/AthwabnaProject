// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom"; // استيراد useNavigate

// const ProductDetails = () => {
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [isDetailsVisible, setIsDetailsVisible] = useState(true);
//   const [selectedSize, setSelectedSize] = useState(""); // حالة لتخزين المقاس المختار
//   const { id } = useParams();
//   const navigate = useNavigate(); // استخدام useNavigate للتنقل

//   useEffect(() => {
//     // جلب تفاصيل المنتج
//     axios.get(`http://localhost:5000/api/products/${id}`)
//       .then((response) => setProduct(response.data))
//       .catch((error) => console.error('فشل جلب تفاصيل المنتج:', error));

//     // جلب المنتجات ذات الصلة
//     axios.get(`http://localhost:5000/api/products/related/men`)
//       .then((response) => setRelatedProducts(response.data))
//       .catch((error) => console.error('فشل جلب المنتجات ذات الصلة:', error));
//   }, [id]);

//   // تبديل عرض التفاصيل
//   const toggleDetails = () => {
//     setIsDetailsVisible(!isDetailsVisible);
//   };

//   // إضافة المنتج إلى السلة
//   const addToCart = async () => {
//     if (!selectedSize) {
//       alert("الرجاء اختيار المقاس");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/cart/add", {
//         productId: product._id,
//         quantity: 1, // الكمية الافتراضية
//         size: selectedSize, // المقاس المختار
//       });

//       if (response.status === 200) {
//         alert("تمت إضافة المنتج إلى السلة بنجاح");
//         navigate("/cart"); // الانتقال إلى صفحة السلة
//       }
//     } catch (error) {
//       console.error("فشل إضافة المنتج إلى السلة:", error);
//       alert("حدث خطأ أثناء إضافة المنتج إلى السلة");
//     }
//   };

//   if (!product) {
//     return <div className="text-center py-5">جاري التحميل...</div>;
//   }

//   return (
//     <div className="bg-[#FFF7F2] min-h-screen font-['29LT_Bukra']">
//       {/* Content */}
//       <div className="container mx-auto my-8 px-4">
//         <div className="flex flex-col md:flex-row items-center">
//           {/* Product Image */}
//           <div className="md:w-1/3 mb-8 md:mb-0">
//             <img src={product.images[0]} alt="Product" className="w-80 h-96 border-2 border-gray-700 rounded-lg" />
//           </div>

//           {/* Product Details */}
//           <div className="md:w-1/2">
//             <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
//             <p className="text-gray-500">السعر السابق: <del>60 دينار</del></p>
//             <p className="text-red-500 text-xl">السعر: {product.price} دينار</p>
//             <form className="mt-4">
//               <div className="mb-4">
//                 <select
//                   className="w-full p-2 border border-gray-300 rounded"
//                   value={selectedSize}
//                   onChange={(e) => setSelectedSize(e.target.value)} // تحديث المقاس المختار
//                 >
//                   <option value="" hidden>اختر المقاس</option>
//                   {product.size.map((size) => (
//                     <option key={size} value={size}>{size}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex-grow flex items-center justify-center"
//                   onClick={addToCart} // النقر على زر "أضف إلى السلة"
//                 >
//                   <i className="bi bi-cart mr-2"></i> أضف الى السلة
//                 </button>
//                 <button className="border border-gray-300 px-4 py-2 rounded">
//                   <i className="bi bi-heart"></i>
//                 </button>
//               </div>
//             </form>
//             <div className="mt-6">
//               <h6 className="mb-2">تاريخ التوصيل المتوقع: 9 يناير - 13 يناير</h6>
//               <h6>ألوان أخرى متوفرة</h6>
//             </div>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="mt-8 bg-white p-6 border border-black rounded-lg shadow-md w-4/5 mx-auto">
//           <div className="flex justify-between items-center">
//             <h3 className="text-xl font-bold">التفاصيل</h3>
//             <button onClick={toggleDetails} className="text-2xl">
//               {isDetailsVisible ? "↑" : "↓"}
//             </button>
//           </div>
//           {isDetailsVisible && (
//             <div className="mt-4">
//               <h4 className="text-lg font-semibold">{product.name}</h4>
//               <ul className="list-disc pr-6">
//                 <li><strong>المواصفات</strong></li>
//                 {product.color.map((color) => (
//                   <li key={color}>لون {color}</li>
//                 ))}
//               </ul>
//               <h4 className="text-lg font-semibold mt-4">عن المنتج</h4>
//               <p className="mt-2">{product.description}</p>
//             </div>
//           )}
//         </div>

//         {/* Related Products */}
//         <div className="mt-20">
//           <h4 className="text-xl font-bold mb-4">قد يعجبك أيضاً</h4>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             {relatedProducts.map((product) => (
//               <div key={product._id} className="bg-white p-4 rounded-lg shadow-md text-center">
//                 <img src={product.images[0]} alt="Product" className="w-full h-48 object-cover rounded-lg mb-4" />
//                 <h6 className="font-semibold">{product.name}</h6>
//                 <p className="text-gray-500">{product.price} دينار</p>
//                 <div className="flex justify-between mt-4">
//                   <button className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex-grow flex items-center justify-center">
//                     <i className="bi bi-cart mr-2"></i> أضف الى السلة
//                   </button>
//                   <button className="border border-gray-300 px-4 py-2 rounded">
//                     <i className="bi bi-heart"></i>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // استيراد useNavigate

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  const [selectedSize, setSelectedSize] = useState(""); // حالة لتخزين المقاس المختار
  const { id } = useParams();
  const navigate = useNavigate(); // استخدام useNavigate للتنقل

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('فشل جلب تفاصيل المنتج:', error);
        if (error.response) {
          console.error('بيانات الخطأ:', error.response.data);
          console.error('حالة الخطأ:', error.response.status);
          console.error('رأسيات الخطأ:', error.response.headers);
        } else if (error.request) {
          console.error('لم يتم استلام أي رد من الخادم:', error.request);
        } else {
          console.error('خطأ في إعداد الطلب:', error.message);
        }
      }
    };
  
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/related/men`);
        setRelatedProducts(response.data);
      } catch (error) {
        console.error('فشل جلب المنتجات ذات الصلة:', error);
        if (error.response) {
          console.error('بيانات الخطأ:', error.response.data);
          console.error('حالة الخطأ:', error.response.status);
          console.error('رأسيات الخطأ:', error.response.headers);
        } else if (error.request) {
          console.error('لم يتم استلام أي رد من الخادم:', error.request);
        } else {
          console.error('خطأ في إعداد الطلب:', error.message);
        }
      }
    };
  
    fetchProductDetails();
    fetchRelatedProducts();
  }, [id]);

  // تبديل عرض التفاصيل
  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };
// إضافة المنتج إلى السلة
const addToCart = () => {
  if (!selectedSize) {
    alert("الرجاء اختيار المقاس");
    return;
  }

  // استرجاع المنتجات من localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // إنشاء المنتج الجديد
  const newItem = {
    productId: product._id,
    title: product.title,
    price: product.price,
    image: product.image, // تأكد من وجود صورة للمنتج
    quantity: 1,
    size: selectedSize,
  };

  // البحث عن المنتج في السلة للتحقق من وجوده مسبقًا
  const existingItemIndex = cart.findIndex(
    (item) => item.productId === product._id && item.size === selectedSize
  );

  if (existingItemIndex !== -1) {
    // إذا كان المنتج موجودًا، نقوم بزيادة الكمية
    cart[existingItemIndex].quantity += 1;
  } else {
    // إضافة المنتج الجديد إلى السلة
    cart.push(newItem);
  }

  // تحديث السلة في localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("✅ تمت إضافة المنتج إلى السلة بنجاح");
};

  
  if (!product) {
    return <div className="text-center py-5">جاري التحميل...</div>;
  }

  return (
    <div className="bg-[#FFF7F2] min-h-screen font-['29LT_Bukra']">
      {/* Content */}
      <div className="container mx-auto my-8 px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Product Image */}
          <div className="md:w-1/3 mb-8 md:mb-0">
            <img src={product.images[0]} alt="Product" className="w-80 h-96 border-2 border-gray-700 rounded-lg" />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
            <p className="text-gray-500">السعر السابق: <del>60 دينار</del></p>
            <p className="text-red-500 text-xl">السعر: {product.price} دينار</p>
            <form className="mt-4">
              <div className="mb-4">
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)} // تحديث المقاس المختار
                >
                  <option value="" hidden>اختر المقاس</option>
                  {product.size.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex-grow flex items-center justify-center"
                  onClick={addToCart} // النقر على زر "أضف إلى السلة"
                >
                  <i className="bi bi-cart mr-2"></i> أضف الى السلة
                </button>
                <button className="border border-gray-300 px-4 py-2 rounded">
                  <i className="bi bi-heart"></i>
                </button>
              </div>
            </form>
            <div className="mt-6">
              <h6 className="mb-2">تاريخ التوصيل المتوقع: 9 يناير - 13 يناير</h6>
              <h6>ألوان أخرى متوفرة</h6>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-8 bg-white p-6 border border-black rounded-lg shadow-md w-4/5 mx-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">التفاصيل</h3>
            <button onClick={toggleDetails} className="text-2xl">
              {isDetailsVisible ? "↑" : "↓"}
            </button>
          </div>
          {isDetailsVisible && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold">{product.name}</h4>
              <ul className="list-disc pr-6">
                <li><strong>المواصفات</strong></li>
                {product.color.map((color) => (
                  <li key={color}>لون {color}</li>
                ))}
              </ul>
              <h4 className="text-lg font-semibold mt-4">عن المنتج</h4>
              <p className="mt-2">{product.description}</p>
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h4 className="text-xl font-bold mb-4">قد يعجبك أيضاً</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-md text-center">
                <img src={product.images[0]} alt="Product" className="w-full h-48 object-cover rounded-lg mb-4" />
                <h6 className="font-semibold">{product.name}</h6>
                <p className="text-gray-500">{product.price} دينار</p>
                <div className="flex justify-between mt-4">
                  <button className="bg-[#2B2B2B] text-white px-4 py-2 rounded flex-grow flex items-center justify-center">
                    <i className="bi bi-cart mr-2"></i> أضف الى السلة
                  </button>
                  <button className="border border-gray-300 px-4 py-2 rounded">
                    <i className="bi bi-heart"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;