import React from 'react';
import logo from '../assets/logo (3).png';

const Navbar = () => {
    return (
        <nav className="bg-[#2B2B2B]">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* القائمة اليمنى */}
                <ul className="flex space-x-4">
                    <li>
                        <a className="text-white hover:text-gray-300" href="men.html">رجال</a>
                    </li>
                    <li>
                        <a className="text-white hover:text-gray-300" href="woman.html">نساء</a>
                    </li>
                    <li>
                        <a className="text-white hover:text-gray-300" href="kids.html">أطفال</a>
                    </li>
                </ul>

                {/* الشعار في المنتصف */}
                <a href="index.html" className="mx-auto">
                    <img src={logo} alt="Logo" className="w-46" />
                </a>

                {/* الأيقونات */}
                <div className="flex space-x-5 text-white text-lg">
                    <a href="?lang=en" className="hover:text-gray-300">
                        <i className="bi bi-globe text-white hover:text-gray-300 text"></i> {/* استخدم text-xl لتصغير الأيقونة */}
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        <i className="bi bi-person text-white hover:text-gray-300 text"></i>
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        <i className="bi bi-search text-white hover:text-gray-300 text"></i>
                    </a>
                    <a href="#" className="hover:text-gray-300">
                        <i className="bi bi-cart text-white hover:text-gray-300 text"></i>
                    </a>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
