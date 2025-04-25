import React from "react";
import { Globe, Heart, Eye } from "lucide-react";

const About = () => {
  return (
    <div className="bg-[#FFF7F2] min-h-screen py-16">
      {/* Header with decorative elements */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="relative text-center">
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 border-b-2 border-[#f8e5d7]"></div>
          <h1 className="relative inline-block px-8 bg-[#FFF7F2] text-4xl font-bold text-[#AA1313]">من نحن</h1>
        </div>
        <p className="text-center mt-6 text-gray-600 max-w-2xl mx-auto">
          نرحب بكم في متجرنا للأزياء التراثية الأردنية الأصيلة
        </p>
      </div>

      {/* Main content with three sections */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Who We Are Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-2 bg-[#AA1313]"></div>
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-[#f8e5d7] rounded-full">
                  <Heart className="h-8 w-8 text-[#AA1313]" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center text-[#AA1313]">من نحن</h2>
              <div className="w-12 h-1 bg-[#f8e5d7] mx-auto mb-6"></div>
              <p className="text-gray-700 leading-relaxed text-right">
                نحن فريق شغوف بالتراث الأردني الأصيل، نسعى للحفاظ على جمال وأناقة الثوب
                الأردني عبر منصة رقمية تجمع بين الأصالة والحداثة. نوفر تصاميم تقليدية
                بجودة عالية تناسب جميع الأذواق.
              </p>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-2 bg-[#AA1313]"></div>
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-[#f8e5d7] rounded-full">
                  <Globe className="h-8 w-8 text-[#AA1313]" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center text-[#AA1313]">رسالتنا</h2>
              <div className="w-12 h-1 bg-[#f8e5d7] mx-auto mb-6"></div>
              <p className="text-gray-700 leading-relaxed text-right">
                تمكين الأفراد من التعبير عن هويتهم الأردنية من خلال ارتداء ثوب يعكس
                ثقافتنا الغنية، مع تسهيل الوصول إليه عبر تجربة تسوق إلكترونية مريحة
                وآمنة.
              </p>
            </div>
          </div>

          {/* Our Vision Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-2 bg-[#AA1313]"></div>
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-[#f8e5d7] rounded-full">
                  <Eye className="h-8 w-8 text-[#AA1313]" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center text-[#AA1313]">رؤيتنا</h2>
              <div className="w-12 h-1 bg-[#f8e5d7] mx-auto mb-6"></div>
              <p className="text-gray-700 leading-relaxed text-right">
                أن نكون المنصة الرائدة في بيع الأزياء التراثية الأردنية، ونساهم في
                نشر هذا الفن الجميل على مستوى محلي وعالمي، مع التركيز على الجودة،
                الحرفية، والهوية.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Element */}
      <div className="max-w-5xl mx-auto px-6 mt-16">
        <div className="flex justify-center">
          <div className="w-24 h-1 bg-[#AA1313]"></div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="w-16 h-1 bg-[#f8e5d7]"></div>
        </div>
      </div>
    </div>
  );
};

export default About;