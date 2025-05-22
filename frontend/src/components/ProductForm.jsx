// import React, { useState, useEffect } from 'react';

// function ProductForm({ onSubmit, initialData = {}, onCancel }) {
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: 0,
//     stock: 0,
//     category: 'men',
//     size: [],
//     color: [],
//     ...(initialData || {}),
//   });

//   const [files, setFiles] = useState([]);
//   const [fileNames, setFileNames] = useState([]);
  
//   // استدعاء البيانات الأولية عند تغييرها
//   useEffect(() => {
//     if (initialData && initialData !== null && Object.keys(initialData).length > 0) {
//       setProduct(prev => ({ ...prev, ...initialData }));
      
//       // إذا كان هناك صور موجودة مسبقاً، استخرج أسماء الملفات من الروابط
//       if (initialData.images && initialData.images.length > 0) {
//         const existingFileNames = initialData.images.map(url => {
//           const parts = url.split('/');
//           return parts[parts.length - 1];
//         });
//         setFileNames(existingFileNames);
//       }
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   // تحديث المصفوفات (المقاسات والألوان)
//   const handleSizeAdd = (size) => {
//     if (!product.size.includes(size)) {
//       setProduct({ ...product, size: [...product.size, size] });
//     }
//   };

//   const handleColorAdd = (color) => {
//     if (!product.color.includes(color)) {
//       setProduct({ ...product, color: [...product.color, color] });
//     }
//   };

//   // إزالة عنصر من المصفوفات
//   const handleRemoveItem = (array, item) => {
//     const updatedArray = product[array].filter(i => i !== item);
//     setProduct({ ...product, [array]: updatedArray });
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setFiles(selectedFiles);
//     setFileNames(selectedFiles.map(file => file.name));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // إنشاء كائن FormData جديد
//     const formData = new FormData();
    
//     // إضافة البيانات الأساسية
//     formData.append('name', product.name);
//     formData.append('description', product.description);
//     formData.append('price', product.price);
//     formData.append('stock', product.stock);
//     formData.append('category', product.category);
    
//     // إضافة المقاسات والألوان كمصفوفات منفصلة لكل عنصر
//     product.size.forEach((size, index) => {
//       formData.append(`size[${index}]`, size);
//     });
    
//     product.color.forEach((color, index) => {
//       formData.append(`color[${index}]`, color);
//     });
    
//     // إضافة الصور كملفات منفصلة
//     files.forEach((file) => {
//       formData.append('images', file);
//     });
    
//     // إضافة الصور الموجودة مسبقاً إذا كانت موجودة
//     if (initialData && initialData.images && initialData.images.length > 0) {
//       formData.append('existingImages', JSON.stringify(initialData.images));
//     }
    
//     // إرسال البيانات
//     onSubmit(formData);
//   };

//   // القائمة المقترحة من المقاسات الشائعة
//   const suggestedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44', '46'];
  
//   // القائمة المقترحة من الألوان الشائعة
//   const suggestedColors = ['أحمر', 'أزرق', 'أخضر', 'أصفر', 'أسود', 'أبيض', 'برتقالي', 'بنفسجي', 'ذهبي', 'فضي'];

//   return (
//     <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//         {/* القسم الأيسر */}
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <label className="block text-[#2B2B2B] font-medium">اسم المنتج</label>
//             <input
//               name="name"
//               placeholder="أدخل اسم المنتج"
//               value={product.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent"
//               required
//             />
//           </div>
          
//           <div className="space-y-2">
//             <label className="block text-[#2B2B2B] font-medium">وصف المنتج</label>
//             <textarea
//               name="description"
//               placeholder="أدخل وصفاً تفصيلياً للمنتج"
//               value={product.description}
//               onChange={handleChange}
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent h-40 resize-none"
//               required
//             />
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="block text-[#2B2B2B] font-medium">السعر (دينار أردني)</label>
//               <input
//                 name="price"
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 placeholder="0.00"
//                 value={product.price}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent"
//                 required
//               />
//             </div>
            
//             <div className="space-y-2">
//               <label className="block text-[#2B2B2B] font-medium">المخزون</label>
//               <input
//                 name="stock"
//                 type="number"
//                 min="0"
//                 placeholder="أدخل كمية المخزون"
//                 value={product.stock}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent"
//                 required
//               />
//             </div>
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="block text-[#2B2B2B] font-medium">الفئة</label>
//               <select
//                 name="category"
//                 value={product.category}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-white"
//               >
//                 <option value="men">رجالي</option>
//                 <option value="women">نسائي</option>
//                 <option value="kids">أطفال</option>
//               </select>
//             </div>
//           </div>
//         </div>
        
//         {/* القسم الأيمن */}
//         <div className="space-y-4">
//           <div className="space-y-2">
//             <label className="block text-[#2B2B2B] font-medium">المقاسات المتوفرة</label>
//             <div className="flex flex-wrap gap-2">
//               {product.size.map((size, index) => (
//                 <div 
//                   key={index} 
//                   className="bg-[#FFF7F2] px-3 py-1 rounded-full flex items-center gap-1 text-sm border border-[#FFDED2]"
//                 >
//                   {size}
//                   <button 
//                     type="button" 
//                     onClick={() => handleRemoveItem('size', size)}
//                     className="ml-1 text-[#AA1313] hover:text-[#8a0f0f] text-xs font-bold"
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-2">
//               <label className="block text-sm text-gray-500">إضافة مقاسات:</label>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {suggestedSizes.map(size => (
//                   <button
//                     key={size}
//                     type="button"
//                     className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
//                     onClick={() => handleSizeAdd(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <label className="block text-[#2B2B2B] font-medium">الألوان المتوفرة</label>
//             <div className="flex flex-wrap gap-2">
//               {product.color.map((color, index) => (
//                 <div 
//                   key={index} 
//                   className="bg-[#FFF7F2] px-3 py-1 rounded-full flex items-center gap-1 text-sm border border-[#FFDED2]"
//                 >
//                   {color}
//                   <button 
//                     type="button" 
//                     onClick={() => handleRemoveItem('color', color)}
//                     className="ml-1 text-[#AA1313] hover:text-[#8a0f0f] text-xs font-bold"
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-2">
//               <label className="block text-sm text-gray-500">إضافة ألوان:</label>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {suggestedColors.map(color => (
//                   <button
//                     key={color}
//                     type="button"
//                     className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
//                     onClick={() => handleColorAdd(color)}
//                   >
//                     {color}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <label className="block text-[#2B2B2B] font-medium">صور المنتج</label>
//             <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-[#FFF7F2] transition-colors cursor-pointer relative">
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               />
//               <div className="flex flex-col items-center justify-center">
//                 <span className="text-3xl mb-2">📸</span>
//                 <p className="text-gray-600 mb-1">اسحب الصور هنا أو انقر للاختيار</p>
//                 <p className="text-xs text-gray-500">يمكنك اختيار أكثر من صورة</p>
//               </div>
//             </div>
            
//             {fileNames.length > 0 && (
//               <div className="mt-2">
//                 <p className="text-sm text-gray-600 mb-1">الصور المختارة ({fileNames.length}):</p>
//                 <ul className="text-xs text-gray-500 space-y-1">
//                   {fileNames.map((name, index) => (
//                     <li key={index} className="truncate">{name}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
            
//             {initialData && initialData.images && initialData.images.length > 0 && files.length === 0 && (
//               <div className="mt-2">
//                 <p className="text-sm text-gray-600 mb-1">الصور الحالية ({initialData.images.length}):</p>
//                 <div className="grid grid-cols-3 gap-2 mt-1">
//                   {initialData.images.map((url, index) => (
//                     <div key={index} className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
//                       <img 
//                         src={`http://localhost:5000${url}`} 
//                         alt={`صورة ${index + 1}`} 
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* أزرار الإجراءات */}
//       <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex gap-3">
//         <button 
//           type="submit" 
//           className="px-6 py-2 bg-[#AA1313] hover:bg-[#8a0f0f] text-white rounded-lg transition-colors shadow-sm cursor-pointer"
//         >
//           {product._id ? 'تحديث المنتج' : 'إضافة المنتج'}
//         </button>
//         {onCancel && (
//           <button
//             type="button"
//             className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
//             onClick={onCancel}
//           >
//             إلغاء
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }

// export default ProductForm;

import React, { useState, useEffect } from 'react';

function ProductForm({ onSubmit, initialData = {}, onCancel }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: 'men',
    size: [],
    color: [],
    ...(initialData || {}),
  });

  const [files, setFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  
  // استدعاء البيانات الأولية عند تغييرها
  useEffect(() => {
    if (initialData && initialData !== null && Object.keys(initialData).length > 0) {
      setProduct(prev => ({ ...prev, ...initialData }));
      
      // إذا كان هناك صور موجودة مسبقاً، استخرج أسماء الملفات من الروابط
      if (initialData.images && initialData.images.length > 0) {
        const existingFileNames = initialData.images.map(url => {
          const parts = url.split('/');
          return parts[parts.length - 1];
        });
        setFileNames(existingFileNames);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // تحديث المصفوفات (المقاسات والألوان)
  const handleSizeAdd = (size) => {
    if (!product.size.includes(size)) {
      setProduct({ ...product, size: [...product.size, size] });
    }
  };

  const handleColorAdd = (color) => {
    if (!product.color.includes(color)) {
      setProduct({ ...product, color: [...product.color, color] });
    }
  };

  // إزالة عنصر من المصفوفات
  const handleRemoveItem = (array, item) => {
    const updatedArray = product[array].filter(i => i !== item);
    setProduct({ ...product, [array]: updatedArray });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setFileNames(selectedFiles.map(file => file.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // إنشاء كائن FormData جديد
    const formData = new FormData();
    
    // إضافة البيانات الأساسية
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('category', product.category);
    
    // إضافة المقاسات والألوان كمصفوفات منفصلة لكل عنصر
    product.size.forEach((size, index) => {
      formData.append(`size[${index}]`, size);
    });
    
    product.color.forEach((color, index) => {
      formData.append(`color[${index}]`, color);
    });
    
    // إضافة الصور كملفات منفصلة
    files.forEach((file) => {
      formData.append('images', file);
    });
    
    // إضافة الصور الموجودة مسبقاً إذا كانت موجودة
    if (initialData && initialData.images && initialData.images.length > 0) {
      formData.append('existingImages', JSON.stringify(initialData.images));
    }
    
    // إرسال البيانات
    onSubmit(formData);
  };

  // القائمة المقترحة من المقاسات الشائعة
  const suggestedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '40', '42', '44', '46'];
  
  // القائمة المقترحة من الألوان الشائعة
  const suggestedColors = ['أحمر', 'أزرق', 'أخضر', 'أصفر', 'أسود', 'أبيض', 'برتقالي', 'بنفسجي', 'ذهبي', 'فضي'];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md w-full max-w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6">
        {/* القسم الأيسر */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-[#2B2B2B] font-medium">اسم المنتج</label>
            <input
              name="name"
              placeholder="أدخل اسم المنتج"
              value={product.name}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#2B2B2B] font-medium">وصف المنتج</label>
            <textarea
              name="description"
              placeholder="أدخل وصفاً تفصيلياً للمنتج"
              value={product.description}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent h-32 sm:h-40 resize-none"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[#2B2B2B] font-medium">السعر (دينار أردني)</label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={product.price}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-[#2B2B2B] font-medium">المخزون</label>
              <input
                name="stock"
                type="number"
                min="0"
                placeholder="أدخل كمية المخزون"
                value={product.stock}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[#2B2B2B] font-medium">الفئة</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#AA1313] focus:border-transparent bg-white"
              >
                <option value="men">رجالي</option>
                <option value="women">نسائي</option>
                <option value="kids">أطفال</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* القسم الأيمن */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-[#2B2B2B] font-medium">المقاسات المتوفرة</label>
            <div className="flex flex-wrap gap-2">
              {product.size.map((size, index) => (
                <div 
                  key={index} 
                  className="bg-[#FFF7F2] px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 text-xs sm:text-sm border border-[#FFDED2]"
                >
                  {size}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveItem('size', size)}
                    className="ml-1 text-[#AA1313] hover:text-[#8a0f0f] text-xs font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <label className="block text-xs sm:text-sm text-gray-500">إضافة مقاسات:</label>
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                {suggestedSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
                    onClick={() => handleSizeAdd(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#2B2B2B] font-medium">الألوان المتوفرة</label>
            <div className="flex flex-wrap gap-2">
              {product.color.map((color, index) => (
                <div 
                  key={index} 
                  className="bg-[#FFF7F2] px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 text-xs sm:text-sm border border-[#FFDED2]"
                >
                  {color}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveItem('color', color)}
                    className="ml-1 text-[#AA1313] hover:text-[#8a0f0f] text-xs font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <label className="block text-xs sm:text-sm text-gray-500">إضافة ألوان:</label>
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                {suggestedColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full"
                    onClick={() => handleColorAdd(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-[#2B2B2B] font-medium">صور المنتج</label>
            <div className="border border-dashed border-gray-300 rounded-lg p-3 sm:p-6 text-center hover:bg-[#FFF7F2] transition-colors cursor-pointer relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center py-2 sm:py-0">
                <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">📸</span>
                <p className="text-sm sm:text-base text-gray-600 mb-0 sm:mb-1">اسحب الصور هنا أو انقر للاختيار</p>
                <p className="text-xs text-gray-500 hidden sm:block">يمكنك اختيار أكثر من صورة</p>
              </div>
            </div>
            
            {fileNames.length > 0 && (
              <div className="mt-2">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">الصور المختارة ({fileNames.length}):</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  {fileNames.map((name, index) => (
                    <li key={index} className="truncate">{name}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {initialData && initialData.images && initialData.images.length > 0 && files.length === 0 && (
              <div className="mt-2">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">الصور الحالية ({initialData.images.length}):</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                  {initialData.images.map((url, index) => (
                    <div key={index} className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                      <img 
                        src={`http://localhost:5000${url}`} 
                        alt={`صورة ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* أزرار الإجراءات */}
      <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 rounded-b-lg flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button 
          type="submit" 
          className="px-4 sm:px-6 py-2 bg-[#AA1313] hover:bg-[#8a0f0f] text-white rounded-lg transition-colors shadow-sm cursor-pointer w-full sm:w-auto"
        >
          {product._id ? 'تحديث المنتج' : 'إضافة المنتج'}
        </button>
        {onCancel && (
          <button
            type="button"
            className="px-4 sm:px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer w-full sm:w-auto"
            onClick={onCancel}
          >
            إلغاء
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;