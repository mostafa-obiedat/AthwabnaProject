// import image from '../assets/hero.jpg';

// function Login() {
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log('تم الضغط على زر تسجيل الدخول');
//     };
//     const handleGoogleSignUp = () => {
//       console.log('تم الضغط على زر التسجيل باستخدام جوجل');
//       // Here you would implement Google authentication
//     };
  
//     return (
//       <div 
//         className="min-h-screen w-full bg-cover bg-center font-cairo text-[#5A3E2B]" 
//         style={{ backgroundImage: `url(${image})`}}
//       >
//         <div className="flex justify-center items-center min-h-screen w-full p-4">
//           <div className="w-full max-w-md relative overflow-hidden rounded-2xl shadow-lg">
//             {/* الصورة الخلفية للفورم */}
//             <div 
//               className="absolute inset-0 bg-cover bg-center z-0" 
//               style={{ backgroundImage: "url('/images/form-background.jpg')" }}
//             ></div>
            
//             {/* طبقة شفافة فوق الصورة */}
//             <div className="absolute inset-0 bg-[#FFF7F2] bg-opacity-50 z-10"></div>
            
//             {/* محتوى النموذج */}
//             <div className="relative z-20 p-8 text-center">
//               <h2 className="text-2xl font-bold text-[#8B4513] mb-6">تسجيل الدخول</h2>
              
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-4 text-right">
//                   <label htmlFor="email" className="block mb-1">البريد الإلكتروني</label>
//                   <input 
//                     type="email" 
//                     id="email" 
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]" 
//                     required 
//                   />
//                 </div>
                
//                 <div className="mb-6 text-right">
//                   <label htmlFor="password" className="block mb-1">كلمة المرور</label>
//                   <input 
//                     type="password" 
//                     id="password" 
//                     className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513]" 
//                     required 
//                   />
//                 </div>
                
//                 <button 
//                   type="submit" 
//                   className="w-full py-2 px-4 bg-[#8B4513] text-white rounded-md hover:bg-[#6A2E0F] transition duration-300"
//                 >
//                   تسجيل الدخول
//                 </button>
//               </form>
              
//             {/* الخط الفاصل */}
//             <div className="flex items-center my-4">
//               <div className="flex-grow h-px bg-gray-300"></div>
//               <p className="mx-3 text-sm text-gray-500">أو</p>
//               <div className="flex-grow h-px bg-gray-300"></div>
//             </div>

//             {/* زر تسجيل الدخول بواسطة جوجل */}
//             <button
//               onClick={handleGoogleSignUp}
//               className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300 mb-4"
//             >
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 viewBox="0 0 48 48" 
//                 width="24px" 
//                 height="24px"
//               >
//                 <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
//                 <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
//                 <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
//                 <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
//               </svg>
//               <span>تسجيل الدخول باستخدام جوجل</span>
//             </button>
//               <p className="mt-4">
//                 ليس لديك حساب؟{' '}
//                 <a href="/register" className="text-[#8B4513] hover:underline">
//                   سجل الآن
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default Login;


import React from 'react';
// يجب استيراد صورة الخلفية هنا
import image from '../assets/hero.jpg';

function Login() {
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('تم الضغط على زر تسجيل الدخول');
    };
    
    const handleGoogleSignUp = () => {
      console.log('تم الضغط على زر التسجيل باستخدام جوجل');
      // هنا ستقوم بتنفيذ المصادقة عبر جوجل
    };
  
    return (
      <div 
        className="min-h-screen w-full bg-cover bg-center font-cairo text-[#2B2B2B]" 
        style={{ backgroundImage: `url(${image})`}}
      >
        <div className="flex justify-center items-center min-h-screen w-full p-4">
          <div className="w-full max-w-md relative overflow-hidden rounded-2xl shadow-lg">
            {/* الصورة الخلفية للفورم */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0" 
              style={{ backgroundImage: "url('/images/form-background.jpg')" }}
            ></div>
            
            {/* طبقة شفافة فوق الصورة */}
            <div className="absolute inset-0 bg-[#FFF7F2] bg-opacity-90 z-10"></div>
            
            {/* محتوى النموذج */}
            <div className="relative z-20 p-8 text-center">
              <h2 className="text-2xl font-bold text-[#2B2B2B] mb-6">تسجيل الدخول</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4 text-right">
                  <label htmlFor="email" className="block mb-1">البريد الإلكتروني</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-3 py-2 border rounded-md bg-[#FFF7F2] focus:outline-none focus:ring-2 focus:ring-[#2B2B2B]" 
                    required 
                  />
                </div>
                
                <div className="mb-6 text-right">
                  <label htmlFor="password" className="block mb-1">كلمة المرور</label>
                  <input 
                    type="password" 
                    id="password" 
                    className="w-full px-3 py-2 border rounded-md bg-[#FFF7F2] focus:outline-none focus:ring-2 focus:ring-[#2B2B2B]" 
                    required 
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-2 px-4 bg-[#2B2B2B] text-[#FFF7F2] rounded-md hover:bg-opacity-80 transition duration-300"
                >
                  تسجيل الدخول
                </button>
              </form>
              
              {/* الخط الفاصل */}
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-300"></div>
                <p className="mx-3 text-sm text-gray-500">أو</p>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              {/* زر تسجيل الدخول بواسطة جوجل */}
              <button
                onClick={handleGoogleSignUp}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition duration-300 mb-4"
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
                <span>تسجيل الدخول باستخدام جوجل</span>
              </button>
                <p className="mt-4">
                  ليس لديك حساب؟{' '}
                  <a href="/register" className="text-[#2B2B2B] font-semibold hover:underline">
                    سجل الآن
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
    );
}
  
export default Login;