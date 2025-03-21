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
        {/* Hero Section */}
        <div>
          <section
            className="hero h-[90vh] bg-cover bg-no-repeat text-center text-white flex flex-col justify-center items-center"
            style={{
              backgroundImage: "url('./src/images/636493786635882849.png')",
            }}
          >
            <div className=" mx-auto px-4">
              <h1 className="mt-5 text-4xl md:text-5xl font-bold animate-fade-down">
                أهلا بك في متجرنا
              </h1>
              <br />
              <h1 className="text-2xl md:text-3xl animate-fade-down">
                اكتشف جمال الزي التراثي الأردني مع منتجاتنا الفريدة
              </h1>
              <br />
              <a
                href="#clothing-section"
                className="inline-block mt-4 px-6 py-3 text-lg font-bold text-white bg-red-800 rounded-full shadow-lg transition-all hover:bg-red-700 animate-fade-down"
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

        {/* السلايدر */}
        <div className="custom-carousel-wrapper bg-[#f6ddd1] flex justify-center items-center py-5">
          <div className=" flex justify-center items-center carousel-margin mx-auto px-4">
            <div className="card text-center p-6 w-[80%] shadow-lg rounded-xl bg-white">
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
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-center mb-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {slide.title}
                      </h3>
                      <p className="text-lg text-gray-600 mt-2">
                        {slide.subtitle}
                      </p>
                    </div>
                    <img
                      src={slide.imgSrc}
                      className=" w-3/5 max-h-64 object-cover rounded-lg mx-auto"
                      alt={slide.title}
                    />
                    <div className="mt-4">
                      <a
                        href={slide.btnLink}
                        className="inline-block  bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg transition duration-300"
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
        <div className=" mt-10 mx-auto px-4">
          {/* Title Section */}
          <div className="flex justify-center items-center mb-20">
            <div className="w-3/5 bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-8 rounded-2xl shadow-lg text-center animate-bounce-in">
              <h2 className="text-2xl font-bold text-[#2B2B2B]">منتجاتنا</h2>
              <p className="text-base text-gray-600 mt-6">
                تصفح مجموعتنا المميزة من الملابس التراثية
              </p>
            </div>
          </div>

          {/* Grid Section */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
            {/* Men Section */}
            <div className="group ml-10 md:ml-20 relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg w-4/5 h-[650px]">
              <img
                src="./src/images/men1.jpeg"
                alt="رجال"
                className="w-full h-full object-cover rounded-lg"
              />
              <h5 className="absolute bottom-0 w-full bg-[rgba(240,221,207,0.6)] text-black py-3 text-center text-lg font-medium rounded-b-lg">
                رجال
              </h5>
            </div>
            <div className="flex flex-col justify-center items-center text-center">
              <div className="bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-8 rounded-xl shadow-lg w-95 transition-transform duration-300 hover:scale-105">
                <p className="text-lg font-bold text-gray-800 mb-6">
                  تشكيلة واسعة من الأزياء الرجالية تعكس الأصالة والفخامة
                </p>
                <a
                  href="/men"
                  className="inline-block px-6 py-3 bg-[#AA1313] text-white rounded hover:bg-[#800f0f] transition-colors duration-300 font-bold"
                >
                  تسوق الآن
                </a>
              </div>
            </div>

            {/* Women Section - Reversed order */}
            <div className="flex flex-col justify-center items-center text-center">
              <div className="bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-8 rounded-xl shadow-lg w-95 transition-transform duration-300 hover:scale-105">
                <p className="text-lg font-bold text-gray-800 mb-6">
                  اكتشفي أروع التصاميم النسائية المطرزة يدويًا بلمسة تراثية
                </p>
                <a
                  href="/women"
                  className="inline-block px-6 py-3 bg-[#AA1313] text-white rounded hover:bg-[#800f0f] transition-colors duration-300 font-bold"
                >
                  اكتشفي المزيد
                </a>
              </div>
            </div>
            <div className="group ml-10 md:ml-20 relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg w-4/5 h-[650px]">
              <img
                src="./src/images/woman.webp"
                alt="نساء"
                className="w-full h-full object-cover rounded-lg"
              />
              <h5 className="absolute bottom-0 w-full bg-[rgba(240,221,207,0.6)] text-black py-3 text-center text-lg font-medium rounded-b-lg">
                نساء
              </h5>
            </div>

            {/* Kids Section */}
            <div className="group ml-10 md:ml-20 relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg w-4/5 h-[650px]">
              <img
                src="./src/images/faisel.jpg"
                alt="أطفال"
                className="w-full h-full object-cover rounded-lg"
              />
              <h5 className="absolute bottom-0 w-full bg-[rgba(240,221,207,0.6)] text-black py-3 text-center text-lg font-medium rounded-b-lg">
                أطفال
              </h5>
            </div>
            <div className="flex flex-col justify-center items-center text-center">
              <div className="bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-8 rounded-xl shadow-lg w-95 transition-transform duration-300 hover:scale-105">
                <p className="text-lg font-bold text-gray-800 mb-6">
                  ملابس أطفال أنيقة تجمع بين الراحة والأناقة بلمسات شعبية
                </p>
                <a
                  href="/kids"
                  className="inline-block px-6 py-3 bg-[#AA1313] text-white rounded hover:bg-[#800f0f] transition-colors duration-300 font-bold"
                >
                  تسوق الآن
                </a>
              </div>
            </div>
          </div>

          {/* Accessories Section */}
          <div className="mt-20">
            <div className="flex justify-center items-center mb-10">
              <div className="w-3/5 bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-8 rounded-2xl shadow-lg text-center">
                <h2 className="text-2xl font-bold text-[#2B2B2B]">
                  قسم الإكسسوارات
                </h2>
                <p className="text-base text-gray-600 mt-6">
                  أضف لمسة تراثية أنيقة مع تشكيلتنا المتنوعة من الإكسسوارات
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {["كوفية وعقال", "حلي و قلائد"].map((title, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg w-4/5 mx-auto h-[650px]"
                >
                  <img
                    src={
                      index === 0
                        ? "./src/images/ex1.jpg"
                        : "./src/images/أسماء_ملابس_تراثية_أردنية.jpg"
                    }
                    alt={title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <h5 className="absolute bottom-0 w-full bg-[rgba(240,221,207,0.6)] text-black py-3 text-center text-lg font-medium rounded-b-lg">
                    {title}
                  </h5>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-5xl mx-auto my-20 bg-gradient-to-r from-[#faeee5] to-[#f6ddd1] p-10 rounded-xl text-center">
            <h2 className="text-[#AA1313] text-2xl font-bold mb-8">
              نوفر لكم من مزايا
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`w-44 p-4 rounded-3xl text-center ${
                    feature.highlighted
                      ? "bg-[#AA1313] text-white"
                      : "border-4 border-[#AA1313] text-[#AA1313]"
                  }`}
                >
                  <img
                    src={feature.icon}
                    alt={feature.text}
                    className="w-32 h-32 mx-auto p-3 my-3"
                  />
                  <p className="m-0">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Line */}
          <img
            src="./src/images/line.jpg"
            className="w-full h-10 mt-8"
            alt="زخرفة تراثية"
          />

          <div className=" w-[90%] mx-auto pb-20 mt-20">
            <h5 className="text-xl font-bold mb-8 mx-5 text-right">
              قالوا عن أثوابنا
            </h5>

            <div className="relative max-w-full mx-auto">
              <div className="relative h-[250px] overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="absolute top-0  flex justify-center items-center left-0 w-full "
                    style={getSlideStyle(index)}
                  >
                    <div className="bg-white rounded-xl p-6 shadow-md mx-4 w-[50%]">
                      <div className="flex flex-col items-center text-center">
                        <img
                          src="./src/images/profileuser.jpg"
                          alt="User"
                          className="w-16 h-16 rounded-full mb-4"
                        />
                        <div className="text-yellow-400 text-xl mb-2">
                          {Array(testimonial.stars).fill("★").join("")}
                        </div>
                        <p className="text-gray-700">{testimonial.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute  left-0 top-1/3 -translate-y-1/2 p-2 rounded-full  hover:bg-gray-100 transform -translate-x-12"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-20 h-20 text-gray-400" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/3 -translate-y-1/2 p-2 hover:bg-gray-100  rounded-full transform translate-x-12"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-20 h-20 text-gray-400" />
              </button>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "bg-gray-800 w-4" : "bg-gray-300"
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