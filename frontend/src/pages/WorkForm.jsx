import React, { useState } from 'react'

const WorkForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: ''
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // هنا يمكنك إضافة التحقق من البيانات وإرسالها إلى الخادم
    console.log('تم إرسال البيانات:', formData)
    // يمكنك إضافة رسالة نجاح أو إعادة توجيه المستخدم
    alert('تم التسجيل بنجاح!')
  }

  return (
    <>
      {/* Header */}
      <header className="bg-blue-600 py-10 text-center text-white">
        <h1 className="text-4xl font-bold">التسجيل في ورشة تصميم الشماغ الأردني</h1>
        <p className="mx-auto mt-3 max-w-3xl text-xl">
          يرجى ملء النموذج أدناه للانضمام إلى الورشة
        </p>
      </header>

      {/* Registration Form */}
      <div className="container mx-auto mt-12 px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="rounded-2xl bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-center text-2xl font-bold">نموذج التسجيل</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="fullName" className="mb-2 block font-medium text-gray-700">
                    الاسم الكامل
                  </label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border border-gray-300 p-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    id="fullName" 
                    placeholder="الاسم الكامل"
                    value={formData.fullName}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="mb-2 block font-medium text-gray-700">
                    البريد الإلكتروني
                  </label>
                  <input 
                    type="email" 
                    className="w-full rounded-lg border border-gray-300 p-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    id="email" 
                    placeholder="البريد الإلكتروني"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="mb-2 block font-medium text-gray-700">
                    رقم الهاتف
                  </label>
                  <input 
                    type="text" 
                    className="w-full rounded-lg border border-gray-300 p-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    id="phone" 
                    placeholder="رقم الهاتف"
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="age" className="mb-2 block font-medium text-gray-700">
                    الفئة العمرية
                  </label>
                  <input 
                    type="number" 
                    className="w-full rounded-lg border border-gray-300 p-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                    id="age" 
                    placeholder="العمر"
                    value={formData.age}
                    onChange={handleChange}
                    required 
                  />
                </div>

                <div className="mt-6 text-center">
                  <button 
                    type="submit" 
                    className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    إرسال
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkForm;
