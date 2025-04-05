import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  // البيانات تاعت السلايدر
  const slides = [
    {
      title: "ورشاتنا",
      subtitle: "اكتشف خبرات فريدة وتعلم مهارات جديدة في ورشاتنا المميزة!",
      imgSrc: "./src/images/warshatna.png",
      btnText: "سجل الآن",
      btnLink: "workshop.html",
    },
    {
      title: "آخر العروض",
      subtitle: "اكتشف أفضل العروض والتخفيضات لدينا الآن!",
      imgSrc: "./src/images/ourOffers.png",
      btnText: "عرض العروض",
      btnLink: "#",
    },
    {
      title: "من نحن",
      subtitle: "تعرف على رسالتنا وقيمنا وهدفنا في خدمة المجتمع!",
      imgSrc: "./src/images/ourTeam.png",
      btnText: "تعرف علينا",
      btnLink: "about.html",
    },
  ];

  // features section
  const features = [
    {
      icon: "./src/images/saving-money.png",
      text: "اسعار تنافسية",
      highlighted: true,
    },
    {
      icon: "./src/images/credit-card.png",
      text: "طرق دفع متعددة",
      highlighted: false,
    },
    {
      icon: "./src/images/customer-service.png",
      text: "خدمة عملاء",
      highlighted: true,
    },
    {
      icon: "./src/images/fast-delivery.png",
      text: "توصيل سريع",
      highlighted: false,
    },
  ];

  // تعليقات الزبائن
  const testimonials = [
    {
      text: "ما شاء الله، ممتاز.",
      stars: 5,
    },
    {
      text: "متجر ممتاز في جميع الأشياء الشعبية الجميلة، تعامله راقي وصاحبه قمة الأخلاق، الله يبارك له في حلاله.",
      stars: 5,
    },
    {
      text: "جرات... وكاسات إضافية بصراحة جودتها ممتازة والقواعد طريقتها حلوة. تستحق الدعم والتشويق.",
      stars: 5,
    },
  ];

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

  const getSlideStyle = (index) => {
    let transform = `translateX(${(index - activeIndex) * 100}%)`;
    let zIndex = index === activeIndex ? 1 : 0;
    let opacity = index === activeIndex ? 1 : 0;

    return {
      transform,
      zIndex,
      opacity,
      transition: "all 0.5s ease-in-out",
    };
  };

  return (
    <>
      <main className="bg-[#FFF7F2]">
        {/* Hero Section - تحسين حجم الخط والمسافات */}
        <div>
          <section
            className="hero h-[90vh] bg-cover bg-center bg-no-repeat text-center text-white flex flex-col justify-center items-center"
            style={{
              backgroundImage: "url('./src/images/636493786635882849.png')",
              backgroundPosition: "center",
            }}
          >
            <div className="mx-auto px-4 max-w-4xl backdrop-blur-sm bg-black/30 p-8 rounded-lg">
              <h1 className="mt-5 text-5xl md:text-6xl font-bold animate-fade-down mb-4">
                أهلا بك في متجرنا
              </h1>
              <h2 className="text-2xl md:text-3xl animate-fade-down mb-8">
                اكتشف جمال الزي التراثي الأردني مع منتجاتنا الفريدة
              </h2>
              <a
                href="#clothing-section"
                className="inline-block mt-4 px-8 py-4 text-lg font-bold text-white bg-red-800 rounded-full shadow-lg transition-all hover:bg-red-700 hover:scale-105 animate-fade-down"
              >
                تسوق الآن
              </a>
            </div>
          </section>
          {/* الزخرفة */}
          <img
            src="./src/images/line.jpg"
            className="w-full"
            alt="زخرفة تراثية"
          />
        </div>

        {/* السلايدر - تحسين التباعد والمظهر */}
        <div className="custom-carousel-wrapper bg-[#f6ddd1] flex justify-center items-center py-12">
          <div className="flex justify-center items-center mx-auto px-4 w-full max-w-6xl">
            <div className="card text-center p-8 w-full shadow-xl rounded-2xl bg-white">
              <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay
                showArrows
                showStatus={false}
                interval={3000}
                transitionTime={800}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="flex flex-col items-center py-4">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold text-gray-900 mb-3">
                        {slide.title}
                      </h3>
                      <p className="text-xl text-gray-600">
                        {slide.subtitle}
                      </p>
                    </div>
                    <img
                      src={slide.imgSrc}
                      className="w-3/5 max-h-80 object-cover rounded-lg mx-auto shadow-md"
                      alt={slide.title}
                    />
                    <div className="mt-8">
                      <a
                        href={slide.btnLink}
                        className="inline-block bg-red-800 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 hover:shadow-lg"
                      >
                        {slide.btnText}
                      </a>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>

        {/* السيكشنات كلها */}
        <div className="mt-20 mx-auto px-4 max-w-7xl">
          {/* Title Section - تحسين الحجم والتأثيرات */}
          <div className="flex justify-center items-center mb-24">
            <div className="w-4/5 md:w-3/5 bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-10 rounded-2xl shadow-xl text-center">
              <h2 className="text-3xl font-bold text-[#2B2B2B]">منتجاتنا</h2>
              <p className="text-lg text-gray-600 mt-6">
                تصفح مجموعتنا المميزة من الملابس التراثية
              </p>
            </div>
          </div>

          {/* Grid Section - تحسين المسافات والحواف */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-24">
            {/* Men Section */}
            <div className="group mx-auto relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl w-11/12 h-[650px]">
              <img
                src="./src/images/men1.jpeg"
                alt="رجال"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h5 className="absolute bottom-0 w-full bg-[rgba(240,221,207,0.8)] backdrop-blur-sm text-black py-4 text-center text-xl font-semibold rounded-b-2xl">
                رجال
              </h5>
            </div>
            <div className="flex flex-col justify-center items-center text-center">
              <div className="bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-10 rounded-xl shadow-lg w-11/12 transition-transform duration-300 hover:scale-105">
                <p className="text-xl font-bold text-gray-800 mb-8">
                  تشكيلة واسعة من الأزياء الرجالية تعكس الأصالة والفخامة
                </p>
                <a
                  href="/men"
                  className="inline-block px-8 py-4 bg-[#AA1313] text-white rounded-lg hover:bg-[#800f0f] transition-colors duration-300 font-bold shadow-md hover:shadow-lg"
                >
                  تسوق الآن
                </a>
              </div>
            </div>

            {/* Women Section - Reversed order */}
            <div className="flex flex-col justify-center items-center text-center">
              <div className="bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-10 rounded-xl shadow-lg w-11/12 transition-transform duration-300 hover:scale-105">
                <p className="text-xl font-bold text-gray-800 mb-8">
                  اكتشفي أروع التصاميم النسائية المطرزة يدويًا بلمسة تراثية
                </p>
                <a
                  href="/women"
                  className="inline-block px-8 py-4 bg-[#AA1313] text-white rounded-lg hover:bg-[#800f0f] transition-colors duration-300 font-bold shadow-md hover:shadow-lg"
                >
                  اكتشفي المزيد
                </a>
              </div>
            </div>
            <div className="group mx-auto relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl w-11/12 h-[650px]">
              <img
                src="./src/images/woman.webp"
                alt="نساء"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h5 className="absolute bottom-0 w-full bg-[rgba(240,221,207,0.8)] backdrop-blur-sm text-black py-4 text-center text-xl font-semibold rounded-b-2xl">
                نساء
              </h5>
            </div>

            {/* Kids Section */}
            <div className="group mx-auto relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl w-11/12 h-[650px]">
              <img
                src="./src/images/faisel.jpg"
                alt="أطفال"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h5 className="absolute bottom-0 w-full bg-[rgba(240,221,207,0.8)] backdrop-blur-sm text-black py-4 text-center text-xl font-semibold rounded-b-2xl">
                أطفال
              </h5>
            </div>
            <div className="flex flex-col justify-center items-center text-center">
              <div className="bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-10 rounded-xl shadow-lg w-11/12 transition-transform duration-300 hover:scale-105">
                <p className="text-xl font-bold text-gray-800 mb-8">
                  ملابس أطفال أنيقة تجمع بين الراحة والأناقة بلمسات شعبية
                </p>
                <a
                  href="/kids"
                  className="inline-block px-8 py-4 bg-[#AA1313] text-white rounded-lg hover:bg-[#800f0f] transition-colors duration-300 font-bold shadow-md hover:shadow-lg"
                >
                  تسوق الآن
                </a>
              </div>
            </div>
          </div>

          {/* Accessories Section - تحسين الحواف والتباعد */}
          <div className="mt-28">
            <div className="flex justify-center items-center mb-16">
              <div className="w-4/5 md:w-3/5 bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-10 rounded-2xl shadow-xl text-center">
                <h2 className="text-3xl font-bold text-[#2B2B2B]">
                  قسم الإكسسوارات
                </h2>
                <p className="text-lg text-gray-600 mt-6">
                  أضف لمسة تراثية أنيقة مع تشكيلتنا المتنوعة من الإكسسوارات
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {["كوفية وعقال", "حلي و قلائد"].map((title, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl w-11/12 mx-auto h-[650px]"
                >
                  <img
                    src={
                      index === 0
                        ? "./src/images/ex1.jpg"
                        : "./src/images/أسماء_ملابس_تراثية_أردنية.jpg"
                    }
                    alt={title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <h5 className="absolute bottom-0 w-full bg-[rgba(240,221,207,0.8)] backdrop-blur-sm text-black py-4 text-center text-xl font-semibold rounded-b-2xl">
                    {title}
                  </h5>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section - تحسين مربعات المزايا */}
          <div className="max-w-5xl mx-auto my-28 bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-12 rounded-2xl shadow-xl text-center">
            <h2 className="text-[#AA1313] text-3xl font-bold mb-12">
              نوفر لكم من مزايا
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`w-48 p-6 rounded-3xl text-center transition-transform duration-300 hover:scale-105 shadow-lg ${
                    feature.highlighted
                      ? "bg-[#AA1313] text-white"
                      : "border-4 border-[#AA1313] text-[#AA1313] bg-white"
                  }`}
                >
                  <img
                    src={feature.icon}
                    alt={feature.text}
                    className="w-32 h-32 mx-auto p-3 my-3"
                  />
                  <p className="m-0 text-lg font-semibold">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Line */}
          <img
            src="./src/images/line.jpg"
            className="w-full h-10 mt-12"
            alt="زخرفة تراثية"
          />

          {/* تحسين قسم تعليقات العملاء */}
          <div className="w-full mx-auto pb-24 mt-24">
            <h5 className="text-2xl font-bold mb-12 mx-5 text-right">
              قالوا عن أثوابنا
            </h5>

            <div className="relative max-w-full mx-auto">
              <div className="relative h-[280px] overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="absolute top-0 flex justify-center items-center left-0 w-full"
                    style={getSlideStyle(index)}
                  >
                    <div className="bg-white rounded-xl p-8 shadow-xl mx-4 w-3/5 border-2 border-[#faeee5]">
                      <div className="flex flex-col items-center text-center">
                        <img
                          src="./src/images/profileuser.jpg"
                          alt="User"
                          className="w-20 h-20 rounded-full mb-6 border-4 border-[#faeee5] shadow-md"
                        />
                        <div className="text-yellow-400 text-2xl mb-4">
                          {Array(testimonial.stars).fill("★").join("")}
                        </div>
                        <p className="text-gray-700 text-lg">{testimonial.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows - تحسين أزرار التنقل */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/3 -translate-y-1/2 p-4 rounded-full bg-white/70 hover:bg-white shadow-md transform -translate-x-12 transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-16 h-16 text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/3 -translate-y-1/2 p-4 bg-white/70 hover:bg-white shadow-md rounded-full transform translate-x-12 transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-16 h-16 text-gray-600" />
              </button>

              {/* Navigation Dots - تحسين نقاط التنقل */}
              <div className="flex justify-center mt-8 gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "bg-[#AA1313] w-6" : "bg-gray-300 w-3"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;