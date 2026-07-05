import { API_URL } from "../config";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import AutoSlider from "../components/AutoSlider";

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // features section
  const features = [
    {
      icon: `${API_URL}/uploads/saving-money.png`,
      text: "أسعار تنافسية",
      highlighted: true,
    },
    {
      icon: `${API_URL}/uploads/credit-card.png`,
      text: "طرق دفع متعددة",
      highlighted: false,
    },
    {
      icon: `${API_URL}/uploads/customer-service.png`,
      text: "خدمة عملاء",
      highlighted: true,
    },
    {
      icon: `${API_URL}/uploads/fast-delivery.png`,
      text: "توصيل سريع",
      highlighted: false,
    },
  ];

  // جلب تعليقات العملاء من الباكند
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/contacts/feedbacks`);
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // استخدام بيانات افتراضية في حالة الخطأ
        setTestimonials([
          {
            name: "عميل",
            message: "ما شاء الله، ممتاز.",
            rating: 5,
          },
          {
            name: "عميل",
            message: "متجر ممتاز في جميع الأشياء الشعبية الجميلة، تعامله راقي وصاحبه قمة الأخلاق.",
            rating: 5,
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // دوال التحكم بالسلايدر
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const getSlideStyle = (index) => {
    return {
      transform: `translateX(${(index - activeIndex) * 100}%)`,
      zIndex: index === activeIndex ? 1 : 0,
      opacity: index === activeIndex ? 1 : 0,
      transition: "all 0.5s ease-in-out",
    };
  };

  // التمرير التلقائي
  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeIndex, testimonials]);

  return (
    <main className="bg-[#FFF7F2]">
      {/* Hero Section */}
      <div>
        <section
          className="hero h-[60vh] sm:h-[76vh] bg-cover bg-center bg-no-repeat text-center text-white flex flex-col justify-center items-center"
          style={{
            backgroundImage: `url(${API_URL}/uploads/hero.jpg)`,
            backgroundPosition: "center",
          }}
        >
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold animate-fade-down mb-4">
            أهلا بك في متجرنا
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl animate-fade-down mb-8 px-4">
            اكتشف جمال الزي التراثي الأردني مع منتجاتنا الفريدة
          </h2>
          <a
            href="#clothing-section"
            className="inline-block mt-4 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold text-white bg-[#AA1313] rounded-full shadow-lg transition-all hover:bg-[#8a0f0f] duration-300 animate-fade-down"
          >
            تسوق الآن
          </a>
        </section>
        <img
          src={`${API_URL}/uploads/line.jpg`}
          className="w-full"
          alt="زخرفة تراثية"
        />
      </div>
      <AutoSlider />

      {/* Main Content */}
      <div className="mt-8 sm:mt-16 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Title Section */}
        <div className="flex justify-center items-center mb-10 sm:mb-20">
          <div className="w-full sm:w-4/5 md:w-3/5 bg-gradient-to-r from-[#f8e5d7] to-[#f0d0bd] p-6 sm:p-10 rounded-2xl shadow-xl text-center border-2 border-[#e6c9b8]">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2B2B2B] font-tajawal">منتجاتنا</h2>
            <p className="text-base sm:text-lg text-gray-700 mt-4 sm:mt-6 font-naskh">
              استكشف مجموعتنا الحصرية من الملابس التراثية الأصيلة التي تعكس جمال تراثنا
            </p>
          </div>
        </div>

        {/* Main Categories Banner */}
        <div className="relative rounded-3xl overflow-hidden h-64 sm:h-80 md:h-96 mb-16 sm:mb-24 shadow-2xl">
          <img
            src={`${API_URL}/uploads/bestSellers.png`}
            alt="تراثنا الأصيل"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
            <div className="text-white p-6 sm:p-8 md:p-12 max-w-md sm:max-w-lg">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-tajawal">الأناقة التراثية</h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">تشكيلة فريدة من الأزياء التراثية المصممة بحرفية عالية لتجمع بين الأصالة والمعاصرة</p>
              <button className="px-6 py-2 sm:px-8 sm:py-3 bg-[#AA1313] hover:bg-[#8a0f0f] transition-colors duration-300 rounded-lg font-bold shadow-lg cursor-pointer text-sm sm:text-base">
                استكشف المجموعة
              </button>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 mt-8 sm:mt-16" id="clothing-section">
          {/* Men Section */}
          <div className="group mx-auto relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl w-full sm:w-11/12 h-[400px] sm:h-[500px] md:h-[600px]">
            <img
              src={`${API_URL}/uploads/men.jpeg`}
              alt="رجال"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 w-full p-4 sm:p-6 md:p-8 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-8">
              <h5 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 font-tajawal">ملابس رجالية</h5>
              <p className="text-white/90 mb-3 sm:mb-6 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm sm:text-base">تشكيلة واسعة من الأزياء الرجالية تعكس الأصالة والفخامة بلمسات تراثية فريدة</p>
              <Link to="/men"
                className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-[#AA1313] text-white rounded-lg hover:bg-[#800f0f] transition-all duration-300 font-bold shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                تسوق الآن
              </Link>
            </div>
          </div>

          {/* Women Section */}
          <div className="group mx-auto relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl w-full sm:w-11/12 h-[400px] sm:h-[500px] md:h-[600px]">
            <img
              src={`${API_URL}/uploads/woman.jpg`}
              alt="نساء"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 w-full p-4 sm:p-6 md:p-8 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-8">
              <h5 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 font-tajawal">ملابس نسائية</h5>
              <p className="text-white/90 mb-3 sm:mb-6 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm sm:text-base">اكتشفي أروع التصاميم النسائية المطرزة يدويًا بلمسة تراثية تعكس جمال الماضي بروح معاصرة</p>
              <Link to="/women"
                className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-[#AA1313] text-white rounded-lg hover:bg-[#800f0f] transition-all duration-300 font-bold shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                اكتشفي المزيد
              </Link>
            </div>
          </div>

          {/* Kids Section */}
          <div className="group mx-auto relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl w-full sm:w-11/12 h-[400px] sm:h-[500px] md:h-[600px]">
            <img
              src={`${API_URL}/uploads/kids.jpeg`}
              alt="أطفال"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 w-full p-4 sm:p-6 md:p-8 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-8">
              <h5 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 font-tajawal">ملابس أطفال</h5>
              <p className="text-white/90 mb-3 sm:mb-6 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm sm:text-base">ملابس أطفال أنيقة تجمع بين الراحة والأناقة بلمسات شعبية تناسب الصغار</p>
              <Link to="/kids"
                className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-[#AA1313] text-white rounded-lg hover:bg-[#800f0f] transition-all duration-300 font-bold shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                تسوق الآن
              </Link>
            </div>
          </div>

          {/* Most Popular Section */}
          <div className="group mx-auto relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl w-full sm:w-11/12 h-[400px] sm:h-[500px] md:h-[600px]">
            <img
              src={`${API_URL}/uploads/bestSellers1.png`}
              alt="الأكثر مبيعًا"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 w-full p-4 sm:p-6 md:p-8 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-8">
              <h5 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 font-tajawal">الأكثر مبيعًا</h5>
              <p className="text-white/90 mb-3 sm:mb-6 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-sm sm:text-base">تسوق أفضل المنتجات مبيعًا واكتشف سبب اختيار الكثيرين لها</p>
              <Link to="/bestsellers"
                className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-[#AA1313] text-white rounded-lg hover:bg-[#800f0f] transition-all duration-300 font-bold shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                استكشف المجموعة
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="flex justify-center my-12 sm:my-24">
          <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#e6c9b8] to-transparent"></div>
        </div>

        {/* Accessories Section */}
        <div className="mt-8 sm:mt-16">
          <div className="flex justify-center items-center mb-8 sm:mb-16">
            <div className="w-full sm:w-4/5 md:w-3/5 bg-gradient-to-r from-[#f8e5d7] to-[#f0d0bd] p-6 sm:p-10 rounded-2xl shadow-xl text-center border-2 border-[#e6c9b8]">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2B2B2B] font-tajawal">الإكسسوارات التراثية</h2>
              <p className="text-base sm:text-lg text-gray-700 mt-4 sm:mt-6 font-naskh">
                أضف لمسة تراثية أنيقة مع تشكيلتنا المتنوعة من الإكسسوارات الأصيلة
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { title: "كوفية وعقال", image: `${API_URL}/uploads/ex1.jpg`, link: "/menaccessories" },
              { title: "حلي و قلائد", image: `${API_URL}/uploads/ex2.jpg`, link: "/womenaccessories" }
            ].map((item, index) => (
              <Link to={item.link}
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl mx-auto h-[350px] sm:h-[400px] md:h-[450px] w-full"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                <div className="absolute bottom-0 w-full p-4 sm:p-6 text-center">
                  <h5 className="bg-[rgba(240,221,207,0.9)] backdrop-blur-sm text-[#2B2B2B] py-3 sm:py-4 rounded-xl text-lg sm:text-xl font-semibold border border-[#e6c9b8] shadow-md transition-transform duration-500 group-hover:translate-y-2">
                    {item.title}
                  </h5>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto my-12 sm:my-20 md:my-28 bg-gradient-to-r from-[#f8e5d7] to-[#f0d0bd] p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl text-center border-2 border-[#e6c9b8]">
          <h2 className="text-[#8a0f0f] text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 font-tajawal">مميزات متجرنا</h2>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`w-40 sm:w-48 md:w-56 p-4 sm:p-6 md:p-8 rounded-3xl text-center ${feature.highlighted
                    ? "bg-[#AA1313] text-white"
                    : "border-4 border-[#AA1313] text-[#AA1313] bg-[#FFF7F2]"
                  }`}
              >
                <div className="p-1 sm:p-2 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-4 sm:mb-6">
                  <img
                    src={feature.icon}
                    alt={feature.text}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="m-0 text-base sm:text-lg md:text-xl font-semibold">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Line */}
        <div className="relative py-6 sm:py-10 my-12 sm:my-20">
          <img
            src={`${API_URL}/uploads/line.jpg`}
            className="w-full h-10 sm:h-14 object-cover"
            alt="زخرفة تراثية"
          />
        </div>

        {/* Testimonials Section */}
        <div className="w-full mx-auto pb-12 sm:pb-16 md:pb-24 mt-8 sm:mt-16">
          <div className="flex items-center justify-between mb-8 sm:mb-16">
            <div className="h-px bg-gray-200 flex-grow"></div>
            <h2 className="text-2xl sm:text-3xl font-bold mx-4 sm:mx-8 text-[#2B2B2B] font-tajawal">قالوا عن أثوابنا</h2>
            <div className="h-px bg-gray-200 flex-grow"></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48 sm:h-64">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-[#AA1313]"></div>
            </div>
          ) : (
            <div className="relative max-w-full mx-auto">
              <div className="relative h-[240px] sm:h-[280px] md:h-[320px] overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="absolute top-0 flex justify-center items-center left-0 w-full"
                    style={getSlideStyle(index)}
                  >
                    <div className="bg-white rounded-xl p-6 sm:p-8 md:p-10 shadow-xl mx-2 sm:mx-4 w-11/12 sm:w-4/5 md:w-3/5 border-2 border-[#f8e5d7]">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4 sm:mb-6 md:mb-8">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-[#f8e5d7] shadow-md bg-gray-100 flex items-center justify-center">
                            <span className="text-xl sm:text-2xl text-[#AA1313]">
                              {testimonial.name?.charAt(0) || "ع"}
                            </span>
                          </div>
                          <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 bg-[#AA1313] text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                            {testimonial.name || "عميل مميز"}
                          </div>
                        </div>
                        <div className="text-yellow-400 text-xl sm:text-2xl mb-3 sm:mb-4">
                          {Array(5).fill().map((_, i) => (
                            <span key={i}>
                              {i < (testimonial.rating || 5) ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                          {testimonial.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-[#f8e5d7] border border-[#e6c9b8] z-20 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-[#AA1313]" />
              </button>

              <button
                onClick={prevSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-white shadow-lg rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-[#f8e5d7] border border-[#e6c9b8] z-20 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-[#AA1313]" />
              </button>

              <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 gap-2 sm:gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-[#AA1313] w-6 sm:w-8"
                        : "bg-gray-300 w-2 sm:w-3 hover:bg-[#e6c9b8]"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-[#f8e5d7] to-[#f0d0bd] p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl my-8 sm:my-12 md:my-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="160" height="160" sm:w-200 sm:h-200 viewBox="0 0 24 24" fill="currentColor" className="text-[#AA1313]">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-6 md:mb-0 text-center md:text-right">
              <h3 className="text-xl sm:text-2xl font-bold text-[#2B2B2B] mb-2 sm:mb-4 font-tajawal">اشترك في نشرتنا الإخبارية</h3>
              <p className="text-gray-700 text-sm sm:text-base">احصل على آخر العروض والتخفيضات والأخبار مباشرة إلى بريدك الإلكتروني</p>
            </div>

            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="px-3 py-2 sm:px-4 sm:py-3 rounded-r-lg border-2 border-r-0 border-[#e6c9b8] focus:outline-none focus:border-[#AA1313] w-full md:w-56 sm:md:w-64 text-right text-sm sm:text-base"
              />
              <button className="bg-[#AA1313] hover:bg-[#8a0f0f] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-l-lg transition-colors duration-300 whitespace-nowrap text-sm sm:text-base">
                اشترك الآن
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Element */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 sm:mt-16">
        <div className="flex justify-center">
          <div className="w-16 sm:w-24 h-0.5 sm:h-1 bg-[#AA1313]"></div>
        </div>
        <div className="flex justify-center mt-1 sm:mt-2">
          <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-[#f8e5d7]"></div>
        </div>
      </div>
    </main>
  );
}

export default Home;
