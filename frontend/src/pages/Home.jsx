

// import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import AutoSlider from "../components/AutoSlider";

// function Home() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   // البيانات تاعت السلايدر
//   const slides = [
//     {
//       title: "ورشاتنا",
//       subtitle: "اكتشف خبرات فريدة وتعلم مهارات جديدة في ورشاتنا المميزة!",
//       imgSrc: "./src/images/warshatna.png",
//       btnText: "سجل الآن",
//       btnLink: "workshop.html",
//     },
//     {
//       title: "آخر العروض",
//       subtitle: "اكتشف أفضل العروض والتخفيضات لدينا الآن!",
//       imgSrc: "./src/images/ourOffers.png",
//       btnText: "عرض العروض",
//       btnLink: "#",
//     },
//     {
//       title: "من نحن",
//       subtitle: "تعرف على رسالتنا وقيمنا وهدفنا في خدمة المجتمع!",
//       imgSrc: "./src/images/ourTeam.png",
//       btnText: "تعرف علينا",
//       btnLink: "about.html",
//     },
//   ];

//   // features section
//   const features = [
//     {
//       icon: "http://localhost:5000/uploads/saving-money.png",
//       text: "اسعار تنافسية",
//       highlighted: true,
//     },
//     {
//       icon: "http://localhost:5000/uploads/credit-card.png",
//       text: "طرق دفع متعددة",
//       highlighted: false,
//     },
//     {
//       icon: "http://localhost:5000/uploads/customer-service.png",
//       text: "خدمة عملاء",
//       highlighted: true,
//     },
//     {
//       icon: "http://localhost:5000/uploads/fast-delivery.png",
//       text: "توصيل سريع",
//       highlighted: false,
//     },
//   ];

//   // تعليقات الزبائن
//   const testimonials = [
//     {
//       text: "ما شاء الله، ممتاز.",
//       stars: 5,
//     },
//     {
//       text: "متجر ممتاز في جميع الأشياء الشعبية الجميلة، تعامله راقي وصاحبه قمة الأخلاق، الله يبارك له في حلاله.",
//       stars: 5,
//     },
//     {
//       text: "جرات... وكاسات إضافية بصراحة جودتها ممتازة والقواعد طريقتها حلوة. تستحق الدعم والتشويق.",
//       stars: 5,
//     },
//   ];

//   const nextSlide = () => {
//     setActiveIndex((prevIndex) =>
//       prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setActiveIndex((prevIndex) =>
//       prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
//     );
//   };

//   const getSlideStyle = (index) => {
//     let transform = `translateX(${(index - activeIndex) * 100}%)`;
//     let zIndex = index === activeIndex ? 1 : 0;
//     let opacity = index === activeIndex ? 1 : 0;

//     return {
//       transform,
//       zIndex,
//       opacity,
//       transition: "all 0.5s ease-in-out",
//     };
//   };

//   return (
//     <>
//       <main className="bg-[#FFF7F2]">
//         {/* Hero Section - تحسين حجم الخط والمسافات */}
//         <div>
//           <section
//             className="hero h-[76vh] bg-cover bg-center bg-no-repeat text-center text-white flex flex-col justify-center items-center"
//             style={{
//               backgroundImage: "url(http://localhost:5000/uploads/hero.jpg)",
//               backgroundPosition: "center",
//             }}
//           >

//             <h1 className="mt-5 text-5xl md:text-6xl font-bold animate-fade-down mb-4">
//               أهلا بك في متجرنا
//             </h1>
//             <h2 className="text-2xl md:text-3xl animate-fade-down mb-8">
//               اكتشف جمال الزي التراثي الأردني مع منتجاتنا الفريدة
//             </h2>
//             <a
//               href="#clothing-section"
//               className="inline-block mt-4 px-8 py-4 text-lg font-bold text-white bg-red-800 rounded-full shadow-lg transition-all hover:bg-red-700 hover:scale-105 animate-fade-down"
//             >
//               تسوق الآن
//             </a>

//           </section>
//           {/* الزخرفة */}
//           <img
//             src="http://localhost:5000/uploads/line.jpg"
//             className="w-full"
//             alt="زخرفة تراثية"
//           />
//         </div>
//         <AutoSlider />

//         {/* السيكشنات كلها */}
//         <div className="mt-16 mx-auto px-4 max-w-7xl">
//           {/* Title Section - تحسين الحجم والتأثيرات */}
//           <div className="flex justify-center items-center mb-20">
//             <div className="w-4/5 md:w-3/5 bg-gradient-to-r from-[#f8e5d7] to-[#f0d0bd] p-10 rounded-2xl shadow-xl text-center border-2 border-[#e6c9b8]">
//               <h2 className="text-4xl font-bold text-[#2B2B2B] font-tajawal">منتجاتنا</h2>
//               <p className="text-lg text-gray-700 mt-6 font-naskh">
//                 استكشف مجموعتنا الحصرية من الملابس التراثية الأصيلة التي تعكس جمال تراثنا
//               </p>
//               <div className="mt-4">
//                 {/* <img src="/api/placeholder/100/20" alt="زخرفة" className="h-4 w-32 mx-auto opacity-70" /> */}
//               </div>
//             </div>
//           </div>

//           {/* Main Categories Banner - إضافة جديدة */}
//           <div className="relative rounded-3xl overflow-hidden h-96 mb-24 shadow-2xl">
//             <img
//               src="/api/placeholder/1200/400"
//               alt="تراثنا الأصيل"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
//               <div className="text-white p-12 max-w-lg">
//                 <h3 className="text-4xl font-bold mb-4 font-tajawal">الأناقة التراثية</h3>
//                 <p className="mb-6 text-lg">تشكيلة فريدة من الأزياء التراثية المصممة بحرفية عالية لتجمع بين الأصالة والمعاصرة</p>
//                 <button className="px-8 py-3 bg-[#AA1313] hover:bg-[#8a0f0f] transition-colors duration-300 rounded-lg font-bold shadow-lg">
//                   استكشف المجموعة
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Grid Section - تحسين المسافات والحواف */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
//             {/* Men Section */}
//             <div className="group mx-auto relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl w-11/12 h-[600px]">
//               <img
//                 src="http://localhost:5000/uploads/men.jpeg"
//                 alt="رجال"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
//               <div className="absolute bottom-0 w-full p-8 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-12">
//                 <h5 className="text-white text-3xl font-bold mb-4 font-tajawal">ملابس رجالية</h5>
//                 <p className="text-white/90 mb-6 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">تشكيلة واسعة من الأزياء الرجالية تعكس الأصالة والفخامة بلمسات تراثية فريدة</p>
//                 <a
//                   href="/men"
//                   className="inline-block px-6 py-3 bg-[#AA1313] text-white rounded-lg hover:bg-[#800f0f] transition-all duration-300 font-bold shadow-md hover:shadow-lg"
//                 >
//                   تسوق الآن
//                 </a>
//               </div>
//             </div>

//             {/* Women Section */}
//             <div className="group mx-auto relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl w-11/12 h-[600px]">
//               <img
//                 src="http://localhost:5000/uploads/woman.jpg"
//                 alt="نساء"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
//               <div className="absolute bottom-0 w-full p-8 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-12">
//                 <h5 className="text-white text-3xl font-bold mb-4 font-tajawal">ملابس نسائية</h5>
//                 <p className="text-white/90 mb-6 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">اكتشفي أروع التصاميم النسائية المطرزة يدويًا بلمسة تراثية تعكس جمال الماضي بروح معاصرة</p>
//                 <a
//                   href="/women"
//                   className="inline-block px-6 py-3 bg-[#AA1313] text-white rounded-lg hover:bg-[#800f0f] transition-all duration-300 font-bold shadow-md hover:shadow-lg"
//                 >
//                   اكتشفي المزيد
//                 </a>
//               </div>
//             </div>

//             {/* Kids Section */}
//             <div className="group mx-auto relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl w-11/12 h-[600px]">
//               <img
//                 src="http://localhost:5000/uploads/kids.jpeg"
//                 alt="أطفال"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
//               <div className="absolute bottom-0 w-full p-8 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-12">
//                 <h5 className="text-white text-3xl font-bold mb-4 font-tajawal">ملابس أطفال</h5>
//                 <p className="text-white/90 mb-6 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">ملابس أطفال أنيقة تجمع بين الراحة والأناقة بلمسات شعبية تناسب الصغار</p>
//                 <a
//                   href="/kids"
//                   className="inline-block px-6 py-3 bg-[#AA1313] text-white rounded-lg hover:bg-[#800f0f] transition-all duration-300 font-bold shadow-md hover:shadow-lg"
//                 >
//                   تسوق الآن
//                 </a>
//               </div>
//             </div>

//             {/* New Section: Most Popular */}
//             <div className="group mx-auto relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 hover:shadow-2xl w-11/12 h-[600px]">
//               <img
//                 src="/api/placeholder/600/900"
//                 alt="الأكثر مبيعًا"
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
//               <div className="absolute bottom-0 w-full p-8 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-12">
//                 <h5 className="text-white text-3xl font-bold mb-4 font-tajawal">الأكثر مبيعًا</h5>
//                 <p className="text-white/90 mb-6 max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">تسوق أفضل المنتجات مبيعًا واكتشف سبب اختيار الكثيرين لها</p>
//                 <a
//                   href="/best-sellers"
//                   className="inline-block px-6 py-3 bg-[#AA1313] text-white rounded-lg hover:bg-[#800f0f] transition-all duration-300 font-bold shadow-md hover:shadow-lg"
//                 >
//                   استكشف المجموعة
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Decorative Element */}
//           <div className="flex justify-center my-24">
//             <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#e6c9b8] to-transparent"></div>
//           </div>

//           {/* Accessories Section - تحسين الحواف والتباعد */}
//           <div className="mt-16">
//             <div className="flex justify-center items-center mb-16">
//               <div className="w-4/5 md:w-3/5 bg-gradient-to-r from-[#f8e5d7] to-[#f0d0bd] p-10 rounded-2xl shadow-xl text-center border-2 border-[#e6c9b8]">
//                 <h2 className="text-4xl font-bold text-[#2B2B2B] font-tajawal">الإكسسوارات التراثية</h2>
//                 <p className="text-lg text-gray-700 mt-6 font-naskh">
//                   أضف لمسة تراثية أنيقة مع تشكيلتنا المتنوعة من الإكسسوارات الأصيلة
//                 </p>
//                 <div className="mt-4">
//                   <img src="/api/placeholder/100/20" alt="زخرفة" className="h-4 w-32 mx-auto opacity-70" />
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {[
//                 { title: "كوفية وعقال", image: "/api/placeholder/400/500" },
//                 { title: "حلي و قلائد", image: "/api/placeholder/400/500" },
//                 { title: "إكسسوارات مميزة", image: "/api/placeholder/400/500" }
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:scale-102 hover:shadow-xl mx-auto h-[450px] w-full"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="absolute bottom-0 w-full p-6 text-center">
//                     <h5 className="bg-[rgba(240,221,207,0.9)] backdrop-blur-sm text-[#2B2B2B] py-4 rounded-xl text-xl font-semibold border border-[#e6c9b8] shadow-md transition-transform duration-300 group-hover:translate-y-2">
//                       {item.title}
//                     </h5>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Features Section - تحسين مربعات المزايا */}
//           <div className="max-w-6xl mx-auto my-28 bg-gradient-to-r from-[#f8e5d7] to-[#f0d0bd] p-12 rounded-2xl shadow-xl text-center border-2 border-[#e6c9b8]">
//             <h2 className="text-[#8a0f0f] text-3xl font-bold mb-12 font-tajawal">مميزات متجرنا</h2>

//             <div className="flex flex-wrap justify-center gap-6">
//               {[
//                 { text: "توصيل سريع", icon: "/api/placeholder/128/128", highlighted: true },
//                 { text: "جودة ممتازة", icon: "/api/placeholder/128/128", highlighted: false },
//                 { text: "تصاميم حصرية", icon: "/api/placeholder/128/128", highlighted: false },
//                 { text: "صناعة يدوية", icon: "/api/placeholder/128/128", highlighted: true }
//               ].map((feature, index) => (
//                 <div
//                   key={index}
//                   className={`w-56 p-8 rounded-3xl text-center transition-all duration-300 hover:scale-105 shadow-lg ${feature.highlighted
//                       ? "bg-[#AA1313] text-white"
//                       : "border-4 border-[#AA1313] text-[#AA1313] bg-white"
//                     }`}
//                 >
//                   <div className="bg-white rounded-full p-2 w-28 h-28 mx-auto mb-6 shadow-md">
//                     <img
//                       src={feature.icon}
//                       alt={feature.text}
//                       className="w-full h-full object-contain"
//                     />
//                   </div>
//                   <p className="m-0 text-xl font-semibold">{feature.text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Decorative Line - تحسين عنصر الزخرفة */}
//           <div className="relative py-10 my-20">
//             <img
//               src="/api/placeholder/1200/80"
//               className="w-full h-16 object-cover"
//               alt="زخرفة تراثية"
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
//           </div>

//           {/* تحسين قسم تعليقات العملاء */}
//           <div className="w-full mx-auto pb-24 mt-16">
//             <div className="flex items-center justify-between mb-16">
//               <div className="h-px bg-gray-200 flex-grow"></div>
//               <h2 className="text-3xl font-bold mx-8 text-[#2B2B2B] font-tajawal">قالوا عن أثوابنا</h2>
//               <div className="h-px bg-gray-200 flex-grow"></div>
//             </div>

//             <div className="relative max-w-full mx-auto">
//               <div className="relative h-[320px] overflow-hidden">
//                 {[
//                   { text: "تجربة رائعة! الثوب وصلني بالضبط كما هو موصوف، الخامة ممتازة والتطريز راقي جداً", stars: 5 },
//                   { text: "أعجبني التنوع في التصاميم والألوان، والخدمة سريعة والتوصيل كان في الموعد المحدد", stars: 5 },
//                   { text: "من أفضل المتاجر للملابس التراثية، الأسعار معقولة مقارنة بالجودة العالية", stars: 4 }
//                 ].map((testimonial, index) => (
//                   <div
//                     key={index}
//                     className="absolute top-0 flex justify-center items-center left-0 w-full transition-opacity duration-500"
//                     style={{
//                       opacity: index === 0 ? 1 : 0,
//                       zIndex: index === 0 ? 10 : 0
//                     }}
//                   >
//                     <div className="bg-white rounded-xl p-10 shadow-xl mx-4 w-3/5 border-2 border-[#f8e5d7]">
//                       <div className="flex flex-col items-center text-center">
//                         <div className="relative mb-8">
//                           <img
//                             src="/api/placeholder/80/80"
//                             alt="User"
//                             className="w-24 h-24 rounded-full border-4 border-[#f8e5d7] shadow-md object-cover"
//                           />
//                           <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#AA1313] text-white px-4 py-1 rounded-full text-sm font-bold">
//                             عميل مميز
//                           </div>
//                         </div>
//                         <div className="text-yellow-400 text-2xl mb-4">
//                           {Array(testimonial.stars).fill("★").join("")}
//                           {Array(5 - testimonial.stars).fill("☆").join("")}
//                         </div>
//                         <p className="text-gray-700 text-lg leading-relaxed">{testimonial.text}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Navigation Arrows - تحسين أزرار التنقل */}
//               <button
//                 className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-lg transform transition-all duration-300 hover:scale-110 hover:bg-[#f8e5d7] border border-[#e6c9b8] z-20"
//                 aria-label="Previous testimonial"
//               >
//                 <svg className="w-6 h-6 text-[#AA1313]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>

//               <button
//                 className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white shadow-lg rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-[#f8e5d7] border border-[#e6c9b8] z-20"
//                 aria-label="Next testimonial"
//               >
//                 <svg className="w-6 h-6 text-[#AA1313]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>

//               {/* Navigation Dots - تحسين نقاط التنقل */}
//               <div className="flex justify-center mt-8 gap-3">
//                 {[0, 1, 2].map((index) => (
//                   <button
//                     key={index}
//                     className={`h-3 rounded-full transition-all duration-300 ${index === 0 ? "bg-[#AA1313] w-8" : "bg-gray-300 w-3 hover:bg-[#e6c9b8]"
//                       }`}
//                     aria-label={`Go to slide ${index + 1}`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* New Section: Newsletter Subscription */}
//           <div className="bg-gradient-to-r from-[#f8e5d7] to-[#f0d0bd] p-12 rounded-2xl shadow-xl my-16 relative overflow-hidden">
//             <div className="absolute top-0 right-0 opacity-10">
//               <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor" className="text-[#AA1313]">
//                 <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
//               </svg>
//             </div>

//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="mb-8 md:mb-0 text-center md:text-right">
//                 <h3 className="text-2xl font-bold text-[#2B2B2B] mb-4 font-tajawal">اشترك في نشرتنا الإخبارية</h3>
//                 <p className="text-gray-700">احصل على آخر العروض والتخفيضات والأخبار مباشرة إلى بريدك الإلكتروني</p>
//               </div>

//               <div className="flex w-full md:w-auto">
//                 <input
//                   type="email"
//                   placeholder="أدخل بريدك الإلكتروني"
//                   className="px-4 py-3 rounded-r-lg border-2 border-r-0 border-[#e6c9b8] focus:outline-none focus:border-[#AA1313] w-full md:w-64 text-right"
//                 />
//                 <button className="bg-[#AA1313] hover:bg-[#8a0f0f] text-white px-6 py-3 rounded-l-lg transition-colors duration-300 whitespace-nowrap">
//                   اشترك الآن
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default Home;



import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AutoSlider from "../components/AutoSlider";

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
      icon: "http://localhost:5000/uploads/saving-money.png",
      text: "اسعار تنافسية",
      highlighted: true,
    },
    {
      icon: "http://localhost:5000/uploads/credit-card.png",
      text: "طرق دفع متعددة",
      highlighted: false,
    },
    {
      icon: "http://localhost:5000/uploads/customer-service.png",
      text: "خدمة عملاء",
      highlighted: true,
    },
    {
      icon: "http://localhost:5000/uploads/fast-delivery.png",
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
            className="hero h-[76vh] bg-cover bg-center bg-no-repeat text-center text-white flex flex-col justify-center items-center"
            style={{
              backgroundImage: "url(http://localhost:5000/uploads/hero.jpg)",
              backgroundPosition: "center",
            }}
          >
            
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
            
          </section>
          {/* الزخرفة */}
          <img
            src="http://localhost:5000/uploads/line.jpg"
            className="w-full"
            alt="زخرفة تراثية"
          />
        </div>
        <AutoSlider />
        {/* السلايدر - تحسين التباعد والمظهر */}
        {/* <div className="custom-carousel-wrapper bg-[#f6ddd1] flex justify-center items-center py-12">
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
        </div> */}

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
                src="http://localhost:5000/uploads/men.jpeg"
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
                src="http://localhost:5000/uploads/woman.jpg"
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
                src="http://localhost:5000/uploads/kids.jpeg"
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
                        ? "http://localhost:5000/uploads/ex1.jpg"
                        : "http://localhost:5000/uploads/ex2.jpg"
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
            src="http://localhost:5000/uploads/line.jpg"
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
                          src="http://localhost:5000/uploads/profileuser.jpg"
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