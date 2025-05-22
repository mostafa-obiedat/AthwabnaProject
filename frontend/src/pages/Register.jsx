import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import image from '../assets/hero.jpg';

function Register() {
  
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phonenumber: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      email: '',
      phonenumber: '',
      password: '',
    };
   
    // التحقق من اسم المستخدم
    if (!formData.username.trim()) {
      newErrors.username = 'اسم المستخدم مطلوب';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'يجب أن يكون اسم المستخدم 3 أحرف على الأقل';
      isValid = false;
    }

    // التحقق من البريد الإلكتروني
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
      isValid = false;
    }

    // التحقق من رقم الهاتف
    if (!formData.phonenumber.trim()) {
      newErrors.phonenumber = 'رقم الهاتف مطلوب';
      isValid = false;
    } else if (!/^07\d{8}$/.test(formData.phonenumber)) {
      newErrors.phonenumber = 'يجب أن يبدأ الرقم بـ 07 ويتكون من 10 أرقام';
      isValid = false;
    }

    // التحقق من كلمة المرور
    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'يجب أن تكون كلمة المرور 8 أحرف على الأقل';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'يجب أن تحتوي على حرف كبير وصغير على الأقل';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // مسح رسالة الخطأ عند البدء بالكتابة
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('يوجد أخطاء في البيانات المدخلة', {
        position: 'top-center',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        toast.success('تم التسجيل بنجاح!', {
          position: 'top-center',
          duration: 3000,
        });

        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      let errorMessage = 'حدث خطأ أثناء التسجيل';

      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }

      toast.error(errorMessage, {
        position: 'top-center',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    toast.loading('جاري التوجيه إلى خدمة جوجل...', {
      position: 'top-center',
      duration: 2000,
    });
    console.log('تم الضغط على زر التسجيل باستخدام جوجل');
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center font-cairo text-[#2B2B2B]"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            direction: 'rtl',
            textAlign: 'right',
          },
        }}
      />

      <div className="flex justify-center items-center min-h-screen w-full p-4">
        <div className="w-full max-w-md relative overflow-hidden rounded-2xl shadow-lg">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('/images/form-background.jpg')" }}
          ></div>

          <div className="absolute inset-0 bg-[#FFF7F2] bg-opacity-80 z-10"></div>

          <div className="relative z-20 p-8 text-center">
            <h2 className="text-2xl font-bold text-[#2B2B2B] mb-6">إنشاء حساب جديد</h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-4 text-right">
                <label htmlFor="username" className="block mb-1">اسم المستخدم</label>
                <input
                  type="text"
                  id="username"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.username ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#2B2B2B]'} bg-[#FFF7F2]`}
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1 text-right">{errors.username}</p>}
              </div>

              <div className="mb-4 text-right">
                <label htmlFor="email" className="block mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  id="email"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#2B2B2B]'} bg-[#FFF7F2]`}
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 text-right">{errors.email}</p>}
              </div>

              <div className="mb-4 text-right">
                <label htmlFor="phonenumber" className="block mb-1">رقم الهاتف</label>
                <input
                  type="tel"
                  id="phonenumber"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.phonenumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#2B2B2B]'} bg-[#FFF7F2]`}
                  required
                  value={formData.phonenumber}
                  onChange={handleChange}
                  placeholder="07XXXXXXXX"
                />
                {errors.phonenumber && <p className="text-red-500 text-sm mt-1 text-right">{errors.phonenumber}</p>}
              </div>

              <div className="mb-6 text-right">
                <label htmlFor="password" className="block mb-1">كلمة المرور</label>
                <input
                  type="password"
                  id="password"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#2B2B2B]'} bg-[#FFF7F2]`}
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1 text-right">{errors.password}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#2B2B2B] text-[#FFF7F2] rounded-md hover:bg-[#222222] transition duration-300 flex justify-center items-center cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري التسجيل...
                  </>
                ) : 'تسجيل'}
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <p className="mx-3 text-sm text-[#2B2B2B]">أو</p>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#FFF7F2] border border-[#2B2B2B] border-opacity-20 rounded-md hover:bg-[#FFF7F2] hover:bg-opacity-70 transition duration-300 mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
              >
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <span className="text-[#2B2B2B]">التسجيل باستخدام جوجل</span>
            </button>

            <p className="mt-2 text-[#2B2B2B]">
              لديك حساب بالفعل؟{' '}
              <a href="/login" className="text-[#2B2B2B] font-semibold hover:underline">
                تسجيل الدخول
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;