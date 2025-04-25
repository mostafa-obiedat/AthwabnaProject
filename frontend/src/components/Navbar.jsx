import React from 'react';
import logo from '../assets/logo (3).png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-[#2B2B2B]">
      <div className="container mx-auto flex items-center justify-between p-4">

        {/* القائمة اليمنى */}
        <ul className="flex space-x-4">
          <li>
            <Link to="men" className="text-white hover:text-gray-300">رجال</Link>
          </li>
          <li>
            <Link to="women" className="text-white hover:text-gray-300">نساء</Link>
          </li>
          <li>
            <Link to="kids" className="text-white hover:text-gray-300">أطفال</Link>
          </li>
        </ul>

        {/* الشعار في المنتصف */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-46" />
        </Link>

        {/* الأيقونات */}
        <div className="flex space-x-5 text-white text-lg">
          <a href="?lang=en" className="hover:text-gray-300">
            <i className="bi bi-globe text-white hover:text-gray-300 text-xl"></i>
          </a>
          <a href="/profile" className="hover:text-gray-300">
            <i className="bi bi-person text-white hover:text-gray-300 text-xl"></i>
          </a>
          <a href="#" className="hover:text-gray-300">
            <i className="bi bi-search text-white hover:text-gray-300 text-xl"></i>
          </a>
          <div className="relative">
            <Link to="/cart" className="hover:text-gray-300">
              <i className="bi bi-cart text-white hover:text-gray-300 text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
