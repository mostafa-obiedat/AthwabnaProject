// import React from 'react';
// import logo from '../assets/logo (3).png';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const Navbar = () => {
//   const cartItems = useSelector(state => state.cart.items);
//   const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <nav className="bg-[#2B2B2B]">
//       <div className="container mx-auto flex items-center justify-between p-4">

//         {/* القائمة اليمنى */}
//         <ul className="flex space-x-4">
//           <li>
//             <Link to="men" className="text-white hover:text-gray-300">رجال</Link>
//           </li>
//           <li>
//             <Link to="women" className="text-white hover:text-gray-300">نساء</Link>
//           </li>
//           <li>
//             <Link to="kids" className="text-white hover:text-gray-300">أطفال</Link>
//           </li>
//         </ul>

//         {/* الشعار في المنتصف */}
//         <Link to="/">
//           <img src={logo} alt="Logo" className="w-46" />
//         </Link>

//         {/* الأيقونات */}
//         <div className="flex space-x-5 text-white text-lg">
//           <a href="?lang=en" className="hover:text-gray-300">
//             <i className="bi bi-globe text-white hover:text-gray-300 text-xl"></i>
//           </a>
//           <Link to="/profile" className="hover:text-gray-300">
//             <i className="bi bi-person text-white hover:text-gray-300 text-xl"></i>
//           </Link>
//           <Link to="#" className="hover:text-gray-300">
//             <i className="bi bi-search text-white hover:text-gray-300 text-xl"></i>
//           </Link>
//           <div className="relative">
//             <Link to="/cart" className="hover:text-gray-300">
//               <i className="bi bi-cart text-white hover:text-gray-300 text-xl"></i>
//               {cartCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from 'react';
// import logo from '../assets/logo (3).png';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [activeLink, setActiveLink] = useState('');

//   // تحديد العنصر النشط بناءً على المسار الحالي
//   useEffect(() => {
//     const path = location.pathname;
//     if (path.includes('/men')) setActiveLink('men');
//     else if (path.includes('/women')) setActiveLink('women');
//     else if (path.includes('/kids')) setActiveLink('kids');
//     else setActiveLink('');
//   }, [location]);

//   // التحقق من تسجيل الدخول عن طريق API
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/users/me', {
//           withCredentials: true
//         });
//         setIsLoggedIn(true);
//       } catch (err) {
//         setIsLoggedIn(false);
//       }
//     };
//     checkLoginStatus();
//   }, []);

//   // تسجيل الخروج
//   const handleLogout = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/users/logout', {}, {
//         withCredentials: true
//       });
//       setIsLoggedIn(false);
//       window.location.reload();
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };

//   // دالة لتحديد التنسيق بناءً على العنصر النشط
//   const getLinkStyle = (linkName) => {
//     return activeLink === linkName 
//       ? 'bg-white text-[#2B2B2B] px-6 py-13 transition-colors duration-200' 
//       : 'text-white hover:text-gray-300 transition-colors duration-200';
//   };

//   return (
//     <nav className="bg-[#2B2B2B] relative z-50">
//       <div className="container mx-auto flex items-center justify-between p-4">
//         {/* القائمة اليمنى */}
//         <ul className="flex space-x-4">
//           <li>
//             <Link 
//               to="/men" 
//               className={getLinkStyle('men')}
//               onClick={() => setActiveLink('men')}
//             >
//               رجال
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to="/women" 
//               className={getLinkStyle('women')}
//               onClick={() => setActiveLink('women')}
//             >
//               نساء
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to="/kids" 
//               className={getLinkStyle('kids')}
//               onClick={() => setActiveLink('kids')}
//             >
//               أطفال
//             </Link>
//           </li>
//         </ul>

//         {/* الشعار */}
//         <Link to="/">
//           <img src={logo} alt="Logo" className="w-46" />
//         </Link>

//         {/* الأيقونات */}
//         <div className="flex space-x-5 text-white text-lg items-center relative">
//           <a href="?lang=en" className="hover:text-gray-300 transition-colors duration-200">
//             <i className="bi bi-globe text-xl"></i>
//           </a>

//           {/* البروفايل + الدروب داون */}
//           <div className="relative">
//             <button 
//               onClick={() => setDropdownOpen(!dropdownOpen)} 
//               className="hover:text-gray-300 focus:outline-none transition-colors duration-200"
//             >
//               <i className="bi bi-person text-xl"></i>
//             </button>

//             {dropdownOpen && (
//               <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50 text-right">
//                 {isLoggedIn ? (
//                   <>
//                     <Link 
//                       to="/profile" 
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm transition-colors duration-200"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       الملف الشخصي
//                     </Link>
//                     <button 
//                       onClick={() => {
//                         handleLogout();
//                         setDropdownOpen(false);
//                       }} 
//                       className="w-full text-right px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm cursor-pointer transition-colors duration-200"
//                     >
//                       تسجيل الخروج
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <Link 
//                       to="/login" 
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm transition-colors duration-200"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       تسجيل الدخول
//                     </Link>
//                     <Link 
//                       to="/register" 
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm transition-colors duration-200"
//                       onClick={() => setDropdownOpen(false)}
//                     >
//                       إنشاء حساب
//                     </Link>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>

//           <Link to="#" className="hover:text-gray-300 transition-colors duration-200">
//             <i className="bi bi-search text-xl"></i>
//           </Link>

//           <div className="relative">
//             <Link to="/cart" className="hover:text-gray-300 transition-colors duration-200">
//               <i className="bi bi-cart text-xl"></i>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo (3).png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaHeart, FaShoppingCart, FaUser, FaGlobe } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // تحديد العنصر النشط بناءً على المسار الحالي
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/men')) setActiveLink('men');
    else if (path.includes('/women')) setActiveLink('women');
    else if (path.includes('/kids')) setActiveLink('kids');
    else setActiveLink('');
  }, [location]);

  // التحقق من تسجيل الدخول
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        await axios.get('http://localhost:5000/api/users/me', {
          withCredentials: true
        });
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  // تسجيل الخروج
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/logout', {}, {
        withCredentials: true
      });
      setIsLoggedIn(false);
      navigate('/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // دالة لتحديد تنسيق الروابط
  const getLinkStyle = (linkName) => {
    const baseStyle = 'px-4 py-2 md:px-6 md:py-3 transition-all duration-300';
    return activeLink === linkName
      ? `${baseStyle} bg-white text-[#2B2B2B] font-bold rounded-lg`
      : `${baseStyle} text-white hover:bg-[#222222] rounded-lg`;
  };

  return (
    <nav className="bg-[#2B2B2B] w-full sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        {/* نسخة سطح المكتب */}
        <div className="hidden md:flex items-center justify-between py-3">
          {/* القائمة اليمنى */}
          <div className="flex space-x-2">
            <Link to="/men" className={getLinkStyle('men')}>
              رجال
            </Link>
            <Link to="/women" className={getLinkStyle('women')}>
              نساء
            </Link>
            <Link to="/kids" className={getLinkStyle('kids')}>
              أطفال
            </Link>
          </div>

          {/* الشعار - في المنتصف */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* الأيقونات */}
          <div className="flex items-center space-x-6">
            <a href="?lang=en" className="text-white hover:text-gray-300">
              <FaGlobe className="text-xl" />
            </a>

            {/* أيقونة المستخدم */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white hover:text-gray-300 "
              >
                <FaUser className="text-xl cursor-pointer" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-right"
                        onClick={() => setDropdownOpen(false)}
                      >
                        الملف الشخصي
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-right px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      >
                        تسجيل الخروج
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-right"
                        onClick={() => setDropdownOpen(false)}
                      >
                        تسجيل الدخول
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-right"
                        onClick={() => setDropdownOpen(false)}
                      >
                        إنشاء حساب
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* أيقونة المفضلة */}
            <Link to="/favorites" className="text-white hover:text-gray-300">
              <FaHeart className="text-xl" />
            </Link>

            {/* أيقونة السلة */}
            <Link to="/cart" className="text-white hover:text-gray-300 relative">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* نسخة الموبايل */}
        <div className="md:hidden flex items-center justify-between py-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white text-2xl"
          >
            <i className="bi bi-list"></i>
          </button>

          <Link to="/" className="mx-auto">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>

          <div className="flex items-center space-x-4">
            {/* أيقونة المفضلة للجوال */}
            <Link to="/favorites" className="text-white text-xl">
              <FaHeart />
            </Link>

            <Link 
      to="/cart" 
      className="relative text-white hover:text-gray-200 transition-colors duration-200"
    >
      {/* حجم الأيقونة يتناسب مع الشاشة */}
      <FaShoppingCart className="text-xl md:text-2xl lg:text-3xl" />
      
      {/* عداد السلة */}
      {cartCount > 0 && (
        <span className="
          absolute 
          -top-2 
          -right-2 
          bg-red-500 
          text-white 
          text-xs 
          md:text-sm
          rounded-full 
          w-5 h-5 
          md:w-6 md:h-6
          flex 
          items-center 
          justify-center
          transform transition-transform duration-200 hover:scale-110
        ">
          {cartCount}
        </span>
      )}
    </Link>
          </div>
        </div>

        {/* قائمة الموبايل المنسدلة */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#3a3a3a] py-2 px-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/men"
                className={getLinkStyle('men')}
                onClick={() => setMobileMenuOpen(false)}
              >
                رجال
              </Link>
              <Link
                to="/women"
                className={getLinkStyle('women')}
                onClick={() => setMobileMenuOpen(false)}
              >
                نساء
              </Link>
              <Link
                to="/kids"
                className={getLinkStyle('kids')}
                onClick={() => setMobileMenuOpen(false)}
              >
                أطفال
              </Link>

              <div className="pt-2 border-t border-gray-600">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="block py-2 text-white hover:bg-gray-700 px-4 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      الملف الشخصي
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-right py-2 text-white hover:bg-gray-700 px-4 rounded-lg"
                    >
                      تسجيل الخروج
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block py-2 text-white hover:bg-gray-700 px-4 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      تسجيل الدخول
                    </Link>
                    <Link
                      to="/register"
                      className="block py-2 text-white hover:bg-gray-700 px-4 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      إنشاء حساب
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;