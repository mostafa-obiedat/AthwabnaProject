// import React from "react";
// import Slider from "react-slick";
// import { Link } from "react-router-dom";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const slides = [
//   {
//     title: "آخر العروض",
//     image: "http://localhost:5000/uploads/ourOffers.png",
//     link: "/offers",
//   },
//   {
//     title: "ورشاتنا",
//     image: "http://localhost:5000/uploads/warshatna.png",
//     link: "/workshops",
//   },
//   {
//     title: "من نحن",
//     image: "http://localhost:5000/uploads/about_us_with_logo.png",
//     link: "/about",
//   },
// ];

// // أسهم مخصصة
// const NextArrow = ({ onClick }) => (
//   <div
//     className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-100"
//     onClick={onClick}
//   >
//     <FaArrowRight />
//   </div>
// );

// const PrevArrow = ({ onClick }) => (
//   <div
//     className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow hover:bg-gray-100"
//     onClick={onClick}
//   >
//     <FaArrowLeft />
//   </div>
// );

// const AutoSlider = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   };

//   return (
//     <div className="w-[90%] max-w-4xl mx-auto mt-10 relative px-4">
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <div key={index} className="px-2">
//             <Link
//               to={slide.link}
//               className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
//             >
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className="w-full h-[300px] object-cover"
//               />
//               <div className="p-4 text-center text-xl font-semibold">
//                 {slide.title}
//               </div>
//             </Link>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default AutoSlider;
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaChevronLeft, FaPlay, FaPause } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "ورشاتنا",
    subtitle: "اكتشف خبرات فريدة وتعلم مهارات جديدة في ورشاتنا المميزة!",
    image: "http://localhost:5000/uploads/warshatna.png",
    link: "/workshop",
    buttonText: "سجل الآن",
    color: "bg-red-800" // تم تغيير اللون حسب طلبك
  },
  {
    title: "آخر العروض",
    subtitle: "اكتشف أفضل العروض والتخفيضات لدينا الآن!",
    image: "http://localhost:5000/uploads/ourOffers.png",
    link: "/offers",
    buttonText: "عرض العروض",
    color: "bg-red-800" // تم تغيير اللون حسب طلبك
  },
  {
    title: "من نحن",
    subtitle: "تعرف على رسالتنا وقيمنا وهدفنا في خدمة المجتمع!",
    image: "http://localhost:5000/uploads/about_us_with_logo.png",
    link: "/about",
    buttonText: "تعرف علينا",
    color: "bg-red-800" // تم تغيير اللون حسب طلبك
  },
];

const AutoSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const containerRef = useRef(null);

  const resetProgress = () => {
    if (progressRef.current) {
      clearInterval(progressRef.current);
    }
    setProgress(0);
  };

  useEffect(() => {
    // Auto slider logic
    if (isPaused) return;
    
    resetProgress();
    
    // Update progress bar every 50ms
    const interval = 5000; // 5 seconds per slide
    const step = 50; // update every 50ms
    const increment = (step / interval) * 100;
    
    progressRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + increment;
      });
    }, step);
    
    // Change slide when progress reaches 100%
    const timer = setTimeout(() => {
      if (!isPaused) {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
      }
    }, interval);
    
    return () => {
      clearTimeout(timer);
      clearInterval(progressRef.current);
    };
  }, [current, isPaused]);

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    resetProgress();
  };
  
  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
    resetProgress();
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    resetProgress();
  };
  
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Animation variants
  const slideVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        type: "spring",
        damping: 30,
        stiffness: 200,
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const textItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.6,
        type: "spring",
        stiffness: 200,
      }
    },
    hover: { 
      scale: 1.05,
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // الألوان المخصصة
  const bgColor = "#393939"; // لون الخلفية الداكن
  const lightBgColor = "#ffeee3"; // لون الخلفية الفاتح (أغمق قليلاً من #FFF7F2)

  return (
    <div style={{ backgroundColor: lightBgColor }} className="py-16 px-4">
      <div 
        ref={containerRef} 
        className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl shadow-2xl"
        style={{
          backgroundColor: bgColor,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
      >
        {/* Background overlay - ثابت الآن مع اللون المحدد */}
        <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
        
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-10">
          <motion.div 
            className="h-full bg-red-800" // تم تغيير اللون
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Carousel content */}
        <div className="relative overflow-hidden" style={{ height: "550px" }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute w-full h-full"
            >
              <div className="flex flex-col md:flex-row items-center h-full px-8 py-12">
                {/* Image section with glass morphism effect */}
                <div className="w-full md:w-3/5 h-full relative">
                  <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm rounded-2xl transform rotate-3 scale-95 z-0"></div>
                  <div className="relative h-full rounded-2xl overflow-hidden transform -rotate-1 transition-all duration-500 hover:rotate-0 z-10">
                    <img
                      src={slides[current].image}
                      alt={slides[current].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-red-800 opacity-20"></div>
                  </div>
                </div>

                {/* Text section */}
                <motion.div 
                  className="w-full md:w-2/5 text-right flex flex-col justify-center h-full px-6 md:px-12"
                  variants={textContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    className="inline-block mb-2 px-4 py-1 rounded-full bg-black bg-opacity-10 text-sm font-medium text-white"
                    variants={textItemVariants}
                  >
                    {`الشريحة ${current + 1} من ${slides.length}`}
                  </motion.div>
                  
                  <motion.h3 
                    variants={textItemVariants}
                    className="text-4xl font-bold text-white mb-4"
                  >
                    {slides[current].title}
                  </motion.h3>
                  
                  <motion.p 
                    variants={textItemVariants}
                    className="text-lg text-gray-300 mb-8 leading-relaxed"
                  >
                    {slides[current].subtitle}
                  </motion.p>
                  
                  <motion.div variants={textItemVariants}>
                    <motion.div 
                      variants={buttonVariants}
                      whileHover="hover"
                    >
                      <Link
                        to={slides[current].link}
                        className="inline-block text-white px-8 py-3 rounded-full transition-all duration-300 bg-red-800"
                      >
                        {slides[current].buttonText}
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
            <button
              onClick={prevSlide}
              className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
              aria-label="السابق"
            >
              <FaChevronLeft className="text-gray-800" />
            </button>
            
            <button
              onClick={togglePause}
              className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300"
              aria-label={isPaused ? "تشغيل" : "إيقاف مؤقت"}
            >
              {isPaused ? <FaPlay className="text-gray-800" /> : <FaPause className="text-gray-800" />}
            </button>
            
            <button
              onClick={nextSlide}
              className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-300 hover:scale-110"
              aria-label="التالي"
            >
              <FaChevronRight className="text-gray-800" />
            </button>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-6 right-8 flex flex-col gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group flex items-center gap-2"
                aria-label={`الانتقال إلى الشريحة ${index + 1}`}
              >
                <span 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current 
                      ? "bg-red-800 w-2 h-8" 
                      : "bg-white bg-opacity-50 group-hover:bg-opacity-80"
                  }`}
                />
                {index === current && (
                  <span className="text-xs font-medium text-white bg-black bg-opacity-30 px-2 py-1 rounded-full backdrop-filter backdrop-blur-sm">
                    {index + 1}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoSlider;