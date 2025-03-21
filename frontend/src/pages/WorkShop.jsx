import React, { useState } from 'react';

const WorkShop = () => {
  // Sample workshop data
  const workshops = [
    {
      id: 1,
      title: "ورشة تصميم الشماغ الأردني",
      price: "100 دينار",
      image: "/images/shmaghW.jpg",
      description: "الورشة عبارة عن تعلم خطوات تصميم الشماغ الأردني التقليدي بأساليب عصرية وتقنيات الطباعة والنسيج.",
      ageRange: "14 - 80 سنة"
    },
    {
      id: 2,
      title: "ورشة خياطة الدامر الأردني",
      price: "100 دينار",
      image: "/images/damerW.png",
      description: "الورشة عبارة عن تعلم خياطة وصنع الدامر الأردني التقليدي بخطوات",
      ageRange: "14 - 80 سنة"
    },
    {
      id: 3,
      title: "ورشة خياطة الثياب الأردنية",
      price: "100 دينار",
      image: "/images/tatreezW.jpg",
      description: "الورشة عبارة عن تعلم خياطة وتصميم الثياب الأردنية التقليدية.",
      ageRange: "14 - 80 سنة"
    },
    {
      id: 4,
      title: "ورشة خياطة الثياب الأردنية",
      price: "100 دينار",
      image: "/images/shmaghW.jpg",
      description: "الورشة عبارة عن تعلم خياطة وتصميم الثياب الأردنية التقليدية.",
      ageRange: "14 - 80 سنة"
    },
    {
      id: 5,
      title: "ورشة خياطة الثياب الأردنية",
      price: "100 دينار",
      image: "/images/shmaghW.jpg",
      description: "الورشة عبارة عن تعلم خياطة وتصميم الثياب الأردنية التقليدية.",
      ageRange: "14 - 80 سنة"
    },
    {
      id: 6,
      title: "ورشة خياطة الثياب الأردنية",
      price: "100 دينار",
      image: "/images/shmaghW.jpg",
      description: "الورشة عبارة عن تعلم خياطة وتصميم الثياب الأردنية التقليدية.",
      ageRange: "14 - 80 سنة"
    }
  ];

  const [freeWorkshopsOnly, setFreeWorkshopsOnly] = useState(false);
  const [ageRange, setAgeRange] = useState(60); // Default age range
  const [priceRange, setPriceRange] = useState(500); // Default price range

  return (
    <div className="container mx-auto my-5 px-4" id="top">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Section */}
        <div className="lg:w-1/4 w-full mb-4">
          <div className="sticky top-8 z-10 bg-white border border-gray-300 rounded-2xl p-4 shadow-md">
            <h5 className="mb-3 font-medium">تصنيف حسب الفئة</h5>
            <select className="w-full border border-gray-300 rounded mb-3 p-2">
              <option>مكان الورشة</option>
              <option>جميع الأماكن</option>
            </select>
            
            <h5 className="mb-3 font-medium">تصنيف حسب العمر</h5>
            <input 
              type="range" 
              className="w-full mb-3 accent-[#CEBEB3]" 
              min="0" 
              max="120"
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
            />
            
            <h5 className="mb-3 font-medium">تصنيف حسب السعر</h5>
            <input 
              type="range" 
              className="w-full mb-3 accent-[#AA1313]" 
              min="80" 
              max="1100"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            />
            
            <div className="mb-3 flex items-center">
              <input 
                className="mr-2" 
                type="checkbox" 
                id="freeWorkshops"
                checked={freeWorkshopsOnly}
                onChange={() => setFreeWorkshopsOnly(!freeWorkshopsOnly)}
              />
              <label className="form-check-label" htmlFor="freeWorkshops">ورشات مجانية</label>
            </div>
            
            <button className="w-full bg-[#CEBEB3] text-white py-2 px-4 rounded hover:bg-opacity-90 transition">
              بحث
            </button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="lg:w-3/4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workshops.map((workshop) => (
              <div key={workshop.id} className="mb-4">
                <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-md h-[500px] flex flex-col">
                  <div className="bg-[#CEBEB3] text-white font-bold text-center py-2">
                    {workshop.price}
                  </div>
                  <img 
                    src={workshop.image} 
                    className="h-[170px] w-full object-cover" 
                    alt="ورشة"
                  />
                  <div className="p-4 flex-grow">
                    <h6 className="font-medium">{workshop.title}</h6>
                    <p className="text-[#444] text-xs mt-8">{workshop.description}</p>
                    <p className="text-xs text-gray-400 mb-1">الفئة العمرية</p>
                    <p className="text-sm">{workshop.ageRange}</p>
                  </div>
                  <div className="text-center p-4 border-t">
                    <button className="border border-[#AA1313] text-[#AA1313] py-2 px-4 rounded hover:bg-[#AA1313] hover:text-white transition duration-400">
                      المزيد
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center my-6">
        <a 
          href="#top" 
          className="inline-block py-2 px-5 text-gray-700 border border-gray-300 rounded hover:bg-[#fcf0e9] transition duration-400"
        >
          العودة إلى أعلى ↑
        </a>
      </div>
    </div>
  );
};

export default WorkShop;