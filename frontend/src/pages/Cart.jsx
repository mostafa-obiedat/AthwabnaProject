import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Cart = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const suggestedProducts = [
    {
      id: 1,
      name: "الدامر الأردني التقليدي المصنوع من الجود",
      price: "60 دينار",
      image: "/path/to/product1.jpg"
    },
    {
      id: 2,
      name: "البدلة التقليدية الأردنية معطوفة من",
      price: "60 دينار",
      image: "/path/to/product2.jpg"
    },
    {
      id: 3,
      name: "البدلة الأردنية التقليدية معطوفة من",
      price: "60 دينار",
      image: "/path/to/product3.jpg"
    },
    {
      id: 4,
      name: "البدلة التقليدية الأردنية معطوفة من",
      price: "60 دينار",
      image: "/path/to/product4.jpg"
    },
    {
      id: 5,
      name: "البدلة الأردنية التقليدية معطوفة من",
      price: "60 دينار",
      image: "/path/to/product5.jpg"
    },
    {
      id: 6,
      name: "الدامر الأردني التقليدي المصنوع من",
      price: "60 دينار",
      image: "/path/to/product6.jpg"
    },
    {
      id: 7,
      name: "البشت أو العباءة معطوفة من",
      price: "63 دينار",
      image: "/path/to/product7.jpg"
    }
  ];

  // Auto scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
      );
    }, 3000); // تغيير كل 3 ثواني

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === suggestedProducts.length - 4 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? suggestedProducts.length - 4 : prevIndex - 1
    );
  };

  return (
    <div className="bg-rose-50 min-h-screen p-8">
      <h1 className="text-right text-2xl font-bold mb-8">سلة التسوق</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-right">الملخص</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>60 دينار</span>
                <span>السعر</span>
              </div>
              <div className="flex justify-between">
                <span>5 دينار</span>
                <span>التوصيل</span>
              </div>
              <div className="flex justify-between">
                <span>15 دينار</span>
                <span>التخفيضات</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold">
                <span>50 دينار</span>
                <span>الإجمالي</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-gray-900 text-white py-3 rounded hover:bg-gray-800 transition">
              التوجه إلى الدفع
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <button className="text-2xl text-gray-400">&times;</button>
              <div className="flex gap-6">
                <div className="text-right">
                  <h3 className="font-bold text-lg mb-2">الدامر الأردني التقليدي المصنوع من الجود</h3>
                  <p className="text-gray-600 mb-1">S :المقاس</p>
                  <p className="text-gray-600 mb-2">الكمية: 1</p>
                  <p className="text-red-500 font-bold">45 دينار</p>
                </div>
                <img
                  src="/path/to/product.jpg"
                  alt="الدامر التقليدي"
                  className="w-24 h-32 object-cover rounded"
                />
              </div>
            </div>
            <button className="mt-4 text-gray-600 flex items-center gap-2 hover:text-gray-800">
              <span>أضف إلى المفضلة</span>
              <span>♡</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Products Carousel Section */}
      <div className="mt-12">
        <h2 className="text-right text-xl font-bold mb-6">قد يعجبك أيضا</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${currentIndex * 25}%)` }}
            >
              {suggestedProducts.map((product) => (
                <div key={product.id} className="flex-none w-1/4 px-2">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <div className="text-right">
                      <p className="text-sm mb-2">{product.name}</p>
                      <p className="font-bold mb-2">{product.price}</p>
                      <button className="text-gray-600 hover:text-gray-800">
                        أضف للسلة ♡
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;