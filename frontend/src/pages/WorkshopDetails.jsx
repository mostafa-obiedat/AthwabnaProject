import React from 'react'
import shmaghImage from '../assets/shmaghW.jpg'

const WorkshopDetails = () => {
  return (
    <>
      {/* Header */}
      <header className="bg-blue-600 py-10 text-center text-white">
        <h1 className="text-4xl font-bold">تفاصيل ورشة تصميم الشماغ الأردني</h1>
        <p className="mx-auto mt-3 max-w-3xl text-xl">
          انضم إلينا في هذه الورشة المثيرة وتعلم فنون تصميم الشماغ الأردني التقليدي بأساليب عصرية
        </p>
      </header>

      {/* Workshop Details */}
      <div className="container mx-auto mt-12 px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="rounded-lg shadow-lg">
            <img 
              src={shmaghImage} 
              className="h-auto w-full rounded-lg object-cover" 
              alt="ورشة تصميم الشماغ الأردني" 
            />
          </div>
          <div>
            <h2 className="mb-4 text-3xl font-bold">ورشة تصميم الشماغ الأردني</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              تعلم خطوات تصميم الشماغ الأردني التقليدي بأساليب عصرية وتقنيات الطباعة والنسيج. 
              سيتعلم المشاركون كيفية استخدام الأدوات والمواد الخاصة بالشماغ لتحقيق تصاميم فريدة.
            </p>

            <h4 className="mt-8 text-xl font-semibold text-gray-600">تفاصيل الورشة</h4>
            <ul className="mt-3 space-y-2">
              <li><span className="font-bold">التاريخ:</span> 25 فبراير 2025</li>
              <li><span className="font-bold">الوقت:</span> 10:00 صباحاً - 4:00 مساءً</li>
              <li><span className="font-bold">الموقع:</span> مركز الفنون التقليدية، عمان، الأردن</li>
              <li><span className="font-bold">الفئة العمرية:</span> 14 - 80 سنة</li>
            </ul>

            <a 
              href="/worckshopForm" 
              className="mt-6 inline-block rounded bg-blue-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-blue-700"
            >
              التسجيل الآن
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkshopDetails;

