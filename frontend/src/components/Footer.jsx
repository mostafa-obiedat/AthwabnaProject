import React from 'react';
import footerLogo from '../assets/footer_logo.png';
import VisaLogo from '../assets/Visa.png';
import MadaLogo from '../assets/mada.png';

const Footer = () => {
  return (
    <footer className="bg-[#2B2B2B] text-white text-sm">
      <div className="footer-main container mx-auto py-9 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* القسم الأول: معلومات الشركة */}
          <div className="mb-6 md:mb-0 text-center w-full md:w-auto">
            <img src={footerLogo} alt="شعار أثوابنا" className="w-12 mx-auto mb-4 rounded-full" />
            <p className="max-w-xs mx-auto md:mx-0">
              نقدم لكم أزياء شعبية تعزز ارتباطنا بثقافتنا الشعبية وتحافظ على الفلكلور والعروض الثقافية في الأردن.
            </p>
          </div>

          {/* القسم الثاني: الروابط */}
          <div className="mb-6 text-center  md:ml-10 lg:ml-40">
            <h6 className="font-bold mb-3">روابط تهمك</h6>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white hover:text-gray-300">من نحن</a></li>
              <li><a href="/contact" className="text-white hover:text-gray-300">اتصل بنا</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">الخصوصية</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">الشروط والأحكام</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">سياسة الاستبدال والاسترجاع</a></li>
            </ul>
          </div>

          {/* القسم الثالث: خدمة العملاء */}
          <div className="text-center md:text-right md:ml-8">
            <h6 className="font-bold mb-3">خدمة العملاء</h6>
            <div className="flex justify-center md:justify-start gap-6">
              <a href="#" className="text-white hover:text-gray-300"><i className="bi bi-phone"></i> جوال</a>
              <a href="#" className="text-white hover:text-gray-300"><i className="bi bi-whatsapp"></i> واتساب</a>
            </div>
          </div>
        </div>
      </div>

      {/* القسم السفلي */}
      <div className="footer-bottom text-center py-6 border-t border-gray-600 px-4 sm:px-6 lg:px-8">
        <div className="social-media mb-4">
          <h6 className="font-bold mb-4">تابع أثوابنا</h6>
          <div className="flex justify-center gap-6 text-xl">
            <a href="#" className="text-white hover:text-gray-300"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-white hover:text-gray-300"><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-white hover:text-gray-300"><i className="bi bi-snapchat"></i></a>
            <a href="#" className="text-white hover:text-gray-300"><i className="bi bi-tiktok"></i></a>
            <a href="#" className="text-white hover:text-gray-300"><i className="bi bi-twitter-x"></i></a>
          </div>
        </div>

        {/* قسم بطاقات الائتمان تحت "تابع أثوابنا" */}
        <div className="credit-cards mb-4">
          <div className="flex justify-center">
            <i className="bi bi-credit-card w-10 mx-2"></i> 
            <i className="bi bi-google w-10 mx-2"></i> 
            <i className="bi bi-apple w-10 mx-2"></i>
            <i className="bi bi-credit-card w-10 mx-2"></i>
          </div>
        </div>

        <p className="text-gray-400">© جميع الحقوق محفوظة | 2025 أثوابنا </p>
      </div>
    </footer>
  );
};

export default Footer;