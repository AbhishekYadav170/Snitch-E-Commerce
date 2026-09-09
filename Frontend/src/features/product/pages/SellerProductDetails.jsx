// import React, { useEffect, useState } from 'react';
// import { useProduct } from '../service/product.api'; // Assuming the product fetching comes from here or useProduct hook
// // wait, the original file had `import { useProduct } from '../hooks/useProduct';` I will use that.
// import { useParams } from 'react-router';

// // Design System Utility Classes (Gilded Noir)
// const theme = {
//   bg: 'bg-[#131313]',
//   surfaceLow: 'bg-[#1c1b1b]',
//   surface: 'bg-[#201f1f]',
//   surfaceHigh: 'bg-[#2a2a2a]',
//   surfaceHighest: 'bg-[#353534]',
//   textPrimary: 'text-[#e5e2e1]',
//   textSecondary: 'text-[#d4c5ab]',
//   textAccent: 'text-[#ffe4af]',
//   btnPrimary: 'bg-gradient-to-r from-[#fabd00] to-[#ffe4af] text-[#261a00] font-semibold tracking-wide rounded-md',
//   btnGhost: 'border border-[#4f4632] border-opacity-30 text-[#ffe4af] uppercase tracking-wider text-xs font-semibold rounded-md',
//   input: 'bg-[#0e0e0e] text-[#e5e2e1] focus:outline-none focus:ring-0 focus:border-l-2 focus:border-l-[#ffe4af]',
//   glass: 'bg-[#353534]/60 backdrop-blur-2xl shadow-[0_4px_40px_rgba(250,189,0,0.05)]',
// };

// // Sample Variant Schema
// // { images: [{url}], stock: 0, atributes: { Size: "M", Color: "Gold" }, price: {amount: 1000, currency: "INR"} }

// const SellerProductDetails = () => {
//   const [product, setProduct] = useState(null);
//   const [variants, setVariants] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [attributes, setAttributes] = useState([{ key: '', value: '' }]);
//   const { productId } = useParams();

//   const handleAddAttribute = () => setAttributes([...attributes, { key: '', value: '' }]);
  
//   const handleAttributeChange = (index, field, val) => {
//     const newAttrs = [...attributes];
//     newAttrs[index][field] = val;
//     setAttributes(newAttrs);
//   };
  
//   const handleRemoveAttribute = (index) => {
//     const newAttrs = attributes.filter((_, i) => i !== index);
//     if (newAttrs.length === 0) return;
//     setAttributes(newAttrs);
//   };
  
//   // Replace with actual hook if needed, using the existing import from original file
//   // const { handleGetProductById } = useProduct(); 

//   // For Demo purpose, we mock data if API fails or is not ready
//   useEffect(() => {
//     // async function fetchProductDetails() {
//     //   try {
//     //     const data = await handleGetProductById(productId);
//     //     setProduct(data?.product || data);
//     //   } catch (error) {
//     //     console.error("Failed to fetch product details", error);
//     //   }
//     // }
//     // fetchProductDetails();
    
//     // Mock Product Data for designing
//     setProduct({
//       _id: productId || "69e4925",
//       title: "Ethereal Chronograph",
//       description: "A timeless masterpiece of precision and elegance. Designed for the discerning curator who values the intersection of horology and art.",
//       price: { amount: 12000, currency: "INR" },
//       images: [{ url: "https://ik.imagekit.io/wzul6hgil/snitch/Screenshot_2026-04-18_144551_CmBBuMUy4.png" }],
//       variants: []
//     });

//     setVariants([
//       {
//         _id: "v1",
//         images: [{ url: "https://ik.imagekit.io/wzul6hgil/snitch/Screenshot_2026-04-18_144551_CmBBuMUy4.png" }],
//         stock: 5,
//         atributes: { Color: "Midnight Gold" },
//         price: { amount: 12500, currency: "INR" }
//       },
//       {
//         _id: "v2",
//         images: [{ url: "https://ik.imagekit.io/wzul6hgil/snitch/Screenshot_2026-04-18_144551_CmBBuMUy4.png" }],
//         stock: 12,
//         atributes: { Color: "Silver Mist", Size: "M" },
//         price: { amount: 11000, currency: "INR" }
//       }
//     ]);
//   }, [productId]);

//   const handleStockUpdate = (variantId, newStock) => {
//     setVariants((prev) => 
//       prev.map(v => v._id === variantId ? { ...v, stock: newStock } : v)
//     );
//     // TODO: Dispatch update API call to backend
//   };

//   const handleCreateVariant = (e) => {
//     e.preventDefault();
//     // Gather form data, validate, upload image, then save to DB...
//     setIsModalOpen(false);
//   };

//   if (!product) return <div className={`${theme.bg} min-h-screen text-[#ffe4af] flex items-center justify-center`}>Curating the exhibition...</div>;

//   return (
//     <div className={`${theme.bg} min-h-screen font-sans ${theme.textPrimary} pb-20`}>
//       {/* Decorative Gradient Glow at Top */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#ffc107] opacity-[0.02] blur-[100px] pointer-events-none"></div>

//       <div className="max-w-6xl mx-auto px-6 pt-16 relative z-10">
        
//         {/* HERO SECTION - Product Top Level */}
//         <section className="flex flex-col md:flex-row gap-16 mb-24 items-start">
//           <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-[0_10px_60px_-15px_rgba(255,193,7,0.06)] bg-[#0e0e0e] aspect-[4/5]">
//             {product.images?.length > 0 ? (
//               <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover mix-blend-luminosity opacity-90" />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-[#4f4632]">No Masterpiece Image</div>
//             )}
//           </div>
          
//           <div className="w-full md:w-1/2 pt-8">
//             <h4 className={`text-xs uppercase tracking-[0.2em] mb-4 ${theme.textAccent} font-semibold`}>Inventory ID: {product._id.slice(-6)}</h4>
//             <h1 className="text-5xl lg:text-6xl font-medium tracking-tight mb-8 leading-tight">{product.title}</h1>
//             <p className={`text-lg ${theme.textSecondary} leading-relaxed mb-10 max-w-lg`}>
//               {product.description}
//             </p>
//             <div className="flex items-baseline gap-2 mb-12">
//               <span className={`text-sm ${theme.textSecondary} uppercase tracking-widest`}>Base Price /</span>
//               <span className="text-3xl font-light text-white">
//                 {product.price?.currency} {product.price?.amount?.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </section>

//         {/* VARIANTS SECTION */}
//         <section>
//           <div className="flex justify-between items-end mb-12 border-b border-[#201f1f] pb-6">
//             <h2 className="text-3xl font-medium tracking-tight">Product Variants</h2>
//             <button 
//               onClick={() => setIsModalOpen(true)}
//               className={`${theme.btnGhost} px-6 py-3 transition-colors hover:bg-[#ffe4af]/5`}
//             >
//               + Create Variant
//             </button>
//           </div>

//           <div className="flex flex-col gap-6">
//             {variants.length === 0 ? (
//               <div className={`${theme.surfaceLow} rounded-xl p-12 text-center text-[#d4c5ab]`}>
//                 No variants exist for this masterpiece yet.
//               </div>
//             ) : (
//               variants.map((variant) => (
//                 <div key={variant._id} className={`${theme.surfaceLow} rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-[0_0_40px_rgba(250,189,0,0.02)]`}>
                  
//                   {/* Variant Thumbnail */}
//                   <div className="w-24 h-24 rounded-lg bg-[#0e0e0e] flex-shrink-0 overflow-hidden">
//                     {variant.images?.[0]?.url && (
//                       <img src={variant.images[0].url} alt="Variant" className="w-full h-full object-cover" />
//                     )}
//                   </div>

//                   {/* Attributes */}
//                   <div className="flex-grow grid grid-cols-2 md:flex md:gap-16 gap-6 w-full">
//                     <div>
//                       <h4 className="text-xs uppercase tracking-widest text-[#5a4307] mb-2 font-bold">Attributes</h4>
//                       {Object.entries(variant.atributes || {}).map(([key, val]) => (
//                         <div key={key} className="text-sm">
//                           <span className={`${theme.textSecondary} mr-2`}>{key}:</span>
//                           <span className={theme.textPrimary}>{val}</span>
//                         </div>
//                       ))}
//                     </div>

//                     <div>
//                       <h4 className="text-xs uppercase tracking-widest text-[#5a4307] mb-2 font-bold">Pricing</h4>
//                       <div className="text-lg">
//                          {variant.price?.currency} {variant.price?.amount?.toLocaleString()}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Stock Management */}
//                   <div className={`p-4 rounded-xl ${theme.surfaceHigh} flex items-center gap-6 md:min-w-[250px] justify-between`}>
//                      <div>
//                         <h4 className="text-xs uppercase tracking-widest text-[#5a4307] mb-1 font-bold">Stock</h4>
//                         <div className={`text-2xl font-light ${variant.stock === 0 ? 'text-[#ffb4ab]' : theme.textPrimary}`}>
//                           {variant.stock}
//                         </div>
//                      </div>
//                      <div className="flex items-center gap-2">
//                         <button 
//                           onClick={() => handleStockUpdate(variant._id, Math.max(0, variant.stock - 1))}
//                           className="w-10 h-10 rounded bg-[#201f1f] hover:bg-[#353534] text-[#d4c5ab] flex items-center justify-center text-xl transition-colors"
//                         >−</button>
//                         <button 
//                           onClick={() => handleStockUpdate(variant._id, variant.stock + 1)}
//                           className="w-10 h-10 rounded bg-[#201f1f] hover:bg-[#353534] text-[#ffe4af] flex items-center justify-center text-xl transition-colors"
//                         >+</button>
//                      </div>
//                   </div>

//                 </div>
//               ))
//             )}
//           </div>
//         </section>

//       </div>

//       {/* CREATE NEW VARIANT MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
//           <div className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto ${theme.surfaceLow} rounded-2xl p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.8)] border border-[#ffffff]/5`}>
//              <button 
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-6 right-6 text-[#d4c5ab] hover:text-white"
//                 type="button"
//              >✕</button>

//              <h2 className="text-3xl font-medium mb-8">Craft New Variant</h2>

//              <form onSubmit={handleCreateVariant} className="flex flex-col gap-6">
                
//                 {/* Dynamic Attributes */}
//                 <div className="flex flex-col gap-3">
//                   <div className="flex justify-between items-center">
//                     <label className={`text-xs uppercase tracking-widest ${theme.textSecondary}`}>Attributes <span className="text-[#ffb4ab]">*</span></label>
//                     <button type="button" onClick={handleAddAttribute} className="text-xs text-[#ffe4af] hover:underline">+ Add Attribute</button>
//                   </div>
//                   {attributes.map((attr, idx) => (
//                     <div key={idx} className="flex gap-4 items-center">
//                       <input 
//                         type="text" 
//                         placeholder="e.g. Size, Color" 
//                         className={`${theme.input} w-1/2 p-3 rounded-lg text-sm`} 
//                         value={attr.key}
//                         onChange={(e) => handleAttributeChange(idx, 'key', e.target.value)}
//                         required={idx === 0}
//                       />
//                       <input 
//                         type="text" 
//                         placeholder="e.g. M, Gold" 
//                         className={`${theme.input} w-1/2 p-3 rounded-lg text-sm`} 
//                         value={attr.value}
//                         onChange={(e) => handleAttributeChange(idx, 'value', e.target.value)}
//                         required={idx === 0}
//                       />
//                       {attributes.length > 1 && (
//                         <button type="button" onClick={() => handleRemoveAttribute(idx)} className="text-[#d4c5ab] hover:text-[#ffb4ab]">✕</button>
//                       )}
//                     </div>
//                   ))}
//                   <p className="text-[10px] text-[#d4c5ab]/60 uppercase tracking-wider">At least one attribute is required.</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="flex flex-col gap-2">
//                     <label className={`text-xs uppercase tracking-widest ${theme.textSecondary}`}>Stock Count</label>
//                     <input type="number" defaultValue={0} min={0} className={`${theme.input} w-full p-4 rounded-lg`} />
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <label className={`text-xs uppercase tracking-widest ${theme.textSecondary}`}>Specific Price (Optional)</label>
//                     <input type="number" placeholder="Leave empty for base price" className={`${theme.input} w-full p-4 rounded-lg`} />
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <label className={`text-xs uppercase tracking-widest ${theme.textSecondary}`}>Variant Images (Optional, Max 7)</label>
//                   <input 
//                     type="file" 
//                     multiple 
//                     accept="image/*"
//                     onChange={(e) => {
//                       if (e.target.files.length > 7) {
//                         alert('Maximum 7 images allowed per variant.');
//                         e.target.value = '';
//                       }
//                     }}
//                     className={`block w-full text-sm text-[#d4c5ab] file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FFE4AF] file:text-[#261A00] hover:file:bg-[#FABD00] ${theme.input} p-2 rounded-lg`}
//                   />
//                 </div>

//                 <button type="submit" className={`${theme.btnPrimary} w-full py-4 mt-6`}>
//                   Assemble Variant
//                 </button>
//              </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default SellerProductDetails;





// import React, { useEffect, useState } from 'react';
// import { useProduct } from "../hooks/useProduct";

// const { handleGetProductById } = useProduct();
// import { useParams } from 'react-router';

// // Design System Utility Classes (Gilded Noir)
// const theme = {
//   bg: 'bg-[#131313]',
//   surfaceLow: 'bg-[#1c1b1b]',
//   surface: 'bg-[#201f1f]',
//   surfaceHigh: 'bg-[#2a2a2a]',
//   surfaceHighest: 'bg-[#353534]',
//   textPrimary: 'text-[#e5e2e1]',
//   textSecondary: 'text-[#d4c5ab]',
//   textAccent: 'text-[#ffe4af]',
//   btnPrimary: 'bg-gradient-to-r from-[#fabd00] to-[#ffe4af] text-[#261a00] font-semibold tracking-wide rounded-md',
//   btnGhost: 'border border-[#4f4632] border-opacity-30 text-[#ffe4af] uppercase tracking-wider text-xs font-semibold rounded-md',
//   input: 'bg-[#0e0e0e] text-[#e5e2e1] focus:outline-none focus:ring-0 focus:border-l-2 focus:border-l-[#ffe4af]',
//   glass: 'bg-[#353534]/60 backdrop-blur-2xl shadow-[0_4px_40px_rgba(250,189,0,0.05)]',
// };

// // Sample Variant Schema
// // { images: [{url}], stock: 0, atributes: { Size: "M", Color: "Gold" }, price: {amount: 1000, currency: "INR"} }

// const SellerProductDetails = () => {
//   const [product, setProduct] = useState(null);
//   const [variants, setVariants] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [attributes, setAttributes] = useState([{ key: '', value: '' }]);
//   const { productId } = useParams();

//   const handleAddAttribute = () => setAttributes([...attributes, { key: '', value: '' }]);
  
//   const handleAttributeChange = (index, field, val) => {
//     const newAttrs = [...attributes];
//     newAttrs[index][field] = val;
//     setAttributes(newAttrs);
//   };
  
//   const handleRemoveAttribute = (index) => {
//     const newAttrs = attributes.filter((_, i) => i !== index);
//     if (newAttrs.length === 0) return;
//     setAttributes(newAttrs);
//   };
  
//   // Replace with actual hook if needed, using the existing import from original file
//   // const { handleGetProductById } = useProduct(); 

//   // For Demo purpose, we mock data if API fails or is not ready
//   useEffect(() => {
//     // async function fetchProductDetails() {
//     //   try {
//     //     const data = await handleGetProductById(productId);
//     //     setProduct(data?.product || data);
//     //   } catch (error) {
//     //     console.error("Failed to fetch product details", error);
//     //   }
//     // }
//     // fetchProductDetails();
    
//     // Mock Product Data for designing
//     setProduct({
//       _id: productId || "69e4925",
//       title: "Ethereal Chronograph",
//       description: "A timeless masterpiece of precision and elegance. Designed for the discerning curator who values the intersection of horology and art.",
//       price: { amount: 12000, currency: "INR" },
//       images: [{ url: "https://ik.imagekit.io/wzul6hgil/snitch/Screenshot_2026-04-18_144551_CmBBuMUy4.png" }],
//       variants: []
//     });

//     setVariants([
//       {
//         _id: "v1",
//         images: [{ url: "https://ik.imagekit.io/wzul6hgil/snitch/Screenshot_2026-04-18_144551_CmBBuMUy4.png" }],
//         stock: 5,
//         atributes: { Color: "Midnight Gold" },
//         price: { amount: 12500, currency: "INR" }
//       },
//       {
//         _id: "v2",
//         images: [{ url: "https://ik.imagekit.io/wzul6hgil/snitch/Screenshot_2026-04-18_144551_CmBBuMUy4.png" }],
//         stock: 12,
//         atributes: { Color: "Silver Mist", Size: "M" },
//         price: { amount: 11000, currency: "INR" }
//       }
//     ]);
//   }, [productId]);

//   const handleStockUpdate = (variantId, newStock) => {
//     setVariants((prev) => 
//       prev.map(v => v._id === variantId ? { ...v, stock: newStock } : v)
//     );
//     // TODO: Dispatch update API call to backend
//   };

//   const handleCreateVariant = (e) => {
//     e.preventDefault();
//     // Gather form data, validate, upload image, then save to DB...
//     setIsModalOpen(false);
//   };

//   if (!product) return <div className={`${theme.bg} min-h-screen text-[#ffe4af] flex items-center justify-center`}>Curating the exhibition...</div>;

//   return (
//     <div className={`${theme.bg} min-h-screen font-sans ${theme.textPrimary} pb-20`}>
//       {/* Decorative Gradient Glow at Top */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#ffc107] opacity-[0.02] blur-[100px] pointer-events-none"></div>

//       <div className="max-w-6xl mx-auto px-6 pt-16 relative z-10">
        
//         {/* HERO SECTION - Product Top Level */}
//         <section className="flex flex-col md:flex-row gap-16 mb-24 items-start">
//           <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-[0_10px_60px_-15px_rgba(255,193,7,0.06)] bg-[#0e0e0e] aspect-[4/5]">
//             {product.images?.length > 0 ? (
//               <img src={product.images[0].url} alt={product.title} className="w-full h-full object-cover mix-blend-luminosity opacity-90" />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center text-[#4f4632]">No Masterpiece Image</div>
//             )}
//           </div>
          
//           <div className="w-full md:w-1/2 pt-8">
//             <h4 className={`text-xs uppercase tracking-[0.2em] mb-4 ${theme.textAccent} font-semibold`}>Inventory ID: {product._id.slice(-6)}</h4>
//             <h1 className="text-5xl lg:text-6xl font-medium tracking-tight mb-8 leading-tight">{product.title}</h1>
//             <p className={`text-lg ${theme.textSecondary} leading-relaxed mb-10 max-w-lg`}>
//               {product.description}
//             </p>
//             <div className="flex items-baseline gap-2 mb-12">
//               <span className={`text-sm ${theme.textSecondary} uppercase tracking-widest`}>Base Price /</span>
//               <span className="text-3xl font-light text-white">
//                 {product.price?.currency} {product.price?.amount?.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </section>

//         {/* VARIANTS SECTION */}
//         <section>
//           <div className="flex justify-between items-end mb-12 border-b border-[#201f1f] pb-6">
//             <h2 className="text-3xl font-medium tracking-tight">Product Variants</h2>
//             <button 
//               onClick={() => setIsModalOpen(true)}
//               className={`${theme.btnGhost} px-6 py-3 transition-colors hover:bg-[#ffe4af]/5`}
//             >
//               + Create Variant
//             </button>
//           </div>

//           <div className="flex flex-col gap-6">
//             {variants.length === 0 ? (
//               <div className={`${theme.surfaceLow} rounded-xl p-12 text-center text-[#d4c5ab]`}>
//                 No variants exist for this masterpiece yet.
//               </div>
//             ) : (
//               variants.map((variant) => (
//                 <div key={variant._id} className={`${theme.surfaceLow} rounded-xl p-6 flex flex-col md:flex-row items-center gap-8 shadow-[0_0_40px_rgba(250,189,0,0.02)]`}>
                  
//                   {/* Variant Thumbnail */}
//                   <div className="w-24 h-24 rounded-lg bg-[#0e0e0e] flex-shrink-0 overflow-hidden">
//                     {variant.images?.[0]?.url && (
//                       <img src={variant.images[0].url} alt="Variant" className="w-full h-full object-cover" />
//                     )}
//                   </div>

//                   {/* Attributes */}
//                   <div className="flex-grow grid grid-cols-2 md:flex md:gap-16 gap-6 w-full">
//                     <div>
//                       <h4 className="text-xs uppercase tracking-widest text-[#5a4307] mb-2 font-bold">Attributes</h4>
//                       {Object.entries(variant.atributes || {}).map(([key, val]) => (
//                         <div key={key} className="text-sm">
//                           <span className={`${theme.textSecondary} mr-2`}>{key}:</span>
//                           <span className={theme.textPrimary}>{val}</span>
//                         </div>
//                       ))}
//                     </div>

//                     <div>
//                       <h4 className="text-xs uppercase tracking-widest text-[#5a4307] mb-2 font-bold">Pricing</h4>
//                       <div className="text-lg">
//                          {variant.price?.currency} {variant.price?.amount?.toLocaleString()}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Stock Management */}
//                   <div className={`p-4 rounded-xl ${theme.surfaceHigh} flex items-center gap-6 md:min-w-[250px] justify-between`}>
//                      <div>
//                         <h4 className="text-xs uppercase tracking-widest text-[#5a4307] mb-1 font-bold">Stock</h4>
//                         <div className={`text-2xl font-light ${variant.stock === 0 ? 'text-[#ffb4ab]' : theme.textPrimary}`}>
//                           {variant.stock}
//                         </div>
//                      </div>
//                      <div className="flex items-center gap-2">
//                         <button 
//                           onClick={() => handleStockUpdate(variant._id, Math.max(0, variant.stock - 1))}
//                           className="w-10 h-10 rounded bg-[#201f1f] hover:bg-[#353534] text-[#d4c5ab] flex items-center justify-center text-xl transition-colors"
//                         >−</button>
//                         <button 
//                           onClick={() => handleStockUpdate(variant._id, variant.stock + 1)}
//                           className="w-10 h-10 rounded bg-[#201f1f] hover:bg-[#353534] text-[#ffe4af] flex items-center justify-center text-xl transition-colors"
//                         >+</button>
//                      </div>
//                   </div>

//                 </div>
//               ))
//             )}
//           </div>
//         </section>

//       </div>

//       {/* CREATE NEW VARIANT MODAL */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           <div className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
//           <div className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto ${theme.surfaceLow} rounded-2xl p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.8)] border border-[#ffffff]/5`}>
//              <button 
//                 onClick={() => setIsModalOpen(false)}
//                 className="absolute top-6 right-6 text-[#d4c5ab] hover:text-white"
//                 type="button"
//              >✕</button>

//              <h2 className="text-3xl font-medium mb-8">Craft New Variant</h2>

//              <form onSubmit={handleCreateVariant} className="flex flex-col gap-6">
                
//                 {/* Dynamic Attributes */}
//                 <div className="flex flex-col gap-3">
//                   <div className="flex justify-between items-center">
//                     <label className={`text-xs uppercase tracking-widest ${theme.textSecondary}`}>Attributes <span className="text-[#ffb4ab]">*</span></label>
//                     <button type="button" onClick={handleAddAttribute} className="text-xs text-[#ffe4af] hover:underline">+ Add Attribute</button>
//                   </div>
//                   {attributes.map((attr, idx) => (
//                     <div key={idx} className="flex gap-4 items-center">
//                       <input 
//                         type="text" 
//                         placeholder="e.g. Size, Color" 
//                         className={`${theme.input} w-1/2 p-3 rounded-lg text-sm`} 
//                         value={attr.key}
//                         onChange={(e) => handleAttributeChange(idx, 'key', e.target.value)}
//                         required={idx === 0}
//                       />
//                       <input 
//                         type="text" 
//                         placeholder="e.g. M, Gold" 
//                         className={`${theme.input} w-1/2 p-3 rounded-lg text-sm`} 
//                         value={attr.value}
//                         onChange={(e) => handleAttributeChange(idx, 'value', e.target.value)}
//                         required={idx === 0}
//                       />
//                       {attributes.length > 1 && (
//                         <button type="button" onClick={() => handleRemoveAttribute(idx)} className="text-[#d4c5ab] hover:text-[#ffb4ab]">✕</button>
//                       )}
//                     </div>
//                   ))}
//                   <p className="text-[10px] text-[#d4c5ab]/60 uppercase tracking-wider">At least one attribute is required.</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="flex flex-col gap-2">
//                     <label className={`text-xs uppercase tracking-widest ${theme.textSecondary}`}>Stock Count</label>
//                     <input type="number" defaultValue={0} min={0} className={`${theme.input} w-full p-4 rounded-lg`} />
//                   </div>
//                   <div className="flex flex-col gap-2">
//                     <label className={`text-xs uppercase tracking-widest ${theme.textSecondary}`}>Specific Price (Optional)</label>
//                     <input type="number" placeholder="Leave empty for base price" className={`${theme.input} w-full p-4 rounded-lg`} />
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <label className={`text-xs uppercase tracking-widest ${theme.textSecondary}`}>Variant Images (Optional, Max 7)</label>
//                   <input 
//                     type="file" 
//                     multiple 
//                     accept="image/*"
//                     onChange={(e) => {
//                       if (e.target.files.length > 7) {
//                         alert('Maximum 7 images allowed per variant.');
//                         e.target.value = '';
//                       }
//                     }}
//                     className={`block w-full text-sm text-[#d4c5ab] file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FFE4AF] file:text-[#261A00] hover:file:bg-[#FABD00] ${theme.input} p-2 rounded-lg`}
//                   />
//                 </div>

//                 <button type="submit" className={`${theme.btnPrimary} w-full py-4 mt-6`}>
//                   Assemble Variant
//                 </button>
//              </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// };

// export default SellerProductDetails;






import React, { useEffect, useState } from 'react'
import { useProduct } from '../hooks/useProduct';
import { useParams } from 'react-router';

// Helper icons
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

const SellerProductDetails = () => {
  const [ product, setProduct ] = useState(null);
  const [ localVariants, setLocalVariants ] = useState([]);
  const [ isAddingVariant, setIsAddingVariant ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  // UI state for inputs to maintain focus
  const [ attributeInputs, setAttributeInputs ] = useState([ { key: '', value: '' } ]);

  // New variant state
  const [ newVariant, setNewVariant ] = useState({
    images: [],
    stock: 0,
    attributes: {}, // Strictly an object
    price: { amount: '', currency: 'INR' }
  });

  const { productId } = useParams();
  const { handleGetProductById, handleAddProductVariant } = useProduct();

  async function fetchProductDetails() {
    setLoading(true);
    try {
      const data = await handleGetProductById(productId);
      const prod = data?.product || data;
      setProduct(prod);
      // Initialize variants locally
      if (prod?.variants) {
        setLocalVariants(prod.variants);
      }
    } catch (error) {
      console.error("Failed to fetch product details", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [ productId ]);

  // Handlers for modifying existing variant stock natively
  const handleStockChange = (index, newStock) => {
    const updatedVariants = [ ...localVariants ];
    updatedVariants[ index ] = { ...updatedVariants[ index ], stock: Number(newStock) };
    setLocalVariants(updatedVariants);
  };

  // Handlers for New Variant Form
  const handleAddNewVariant = async () => {
    // Validate required at least one attribute to be filled
    const hasValidAttribute = attributeInputs.some(attr => attr.key.trim() && attr.value.trim());
    if (!hasValidAttribute) {
      alert("At least one valid attribute is required.");
      return;
    }

    // Maps preview URL so the variant list can display the image locally
    const cleanImages = newVariant.images.map(img => ({ url: img.previewUrl, file: img.file }));

    // Attributes is already an object in newVariant, just use it safely
    const cleanAttributes = { ...newVariant.attributes };

    const variantToSave = {
      images: cleanImages,
      stock: Number(newVariant.stock),
      attributes: cleanAttributes,
      price: newVariant.price.amount
        ? Number(newVariant.price.amount)
        : undefined // price is optional
    };

    setLocalVariants([ ...localVariants, variantToSave ]);
    setIsAddingVariant(false);

    await handleAddProductVariant(productId, variantToSave)

    // Reset form
    // Note: should ideally revoke old object URLs as well to prevent memory leaks if it were a long-lived SPA
    setAttributeInputs([ { key: '', value: '' } ]);
    setNewVariant({
      images: [],
      stock: 0,
      attributes: {},
      price: { amount: '', currency: 'INR' }
    });
  };

  const handleAddAttribute = () => {
    setAttributeInputs(prev => [ ...prev, { key: '', value: '' } ]);
  };

  const handleAttributeChange = (index, field, value) => {
    const updatedInputs = [ ...attributeInputs ];
    updatedInputs[ index ][ field ] = value;
    setAttributeInputs(updatedInputs);

    // Synchronize to object format
    const newAttrsObj = {};
    updatedInputs.forEach(attr => {
      if (attr.key.trim() !== '') {
        newAttrsObj[ attr.key.trim() ] = attr.value;
      }
    });
    setNewVariant(prev => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleRemoveAttribute = (index) => {
    const updatedInputs = attributeInputs.filter((_, i) => i !== index);
    setAttributeInputs(updatedInputs);

    // Synchronize to object format
    const newAttrsObj = {};
    updatedInputs.forEach(attr => {
      if (attr.key.trim() !== '') {
        newAttrsObj[ attr.key.trim() ] = attr.value;
      }
    });
    setNewVariant(prev => ({ ...prev, attributes: newAttrsObj }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const availableSlots = 7 - newVariant.images.length;
    const filesToAdd = files.slice(0, availableSlots);

    if (files.length > availableSlots) {
      alert(`You can only upload up to 7 images. ${filesToAdd.length} added.`);
    }

    const newImageObjects = filesToAdd.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file)
    }));

    setNewVariant(prev => ({
      ...prev,
      images: [ ...prev.images, ...newImageObjects ]
    }));

    // Clear the input so identical files can be selected again if needed
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    const imageToRemove = newVariant.images[ index ];
    if (imageToRemove?.previewUrl) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }
    const updatedImages = newVariant.images.filter((_, i) => i !== index);
    setNewVariant(prev => ({ ...prev, images: updatedImages }));
  };

  if (loading) {
    return <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center text-[#1b1c1a] font-serif">Loading gallery...</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center text-[#1b1c1a] font-serif">Product Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] font-sans pb-24">
      {/* Top Banner / Header */}
      <header className="sticky top-0 z-10 bg-[#fbf9f6]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-xl tracking-wide uppercase">{product.title?.substring(0, 20)}{product.title?.length > 20 ? '...' : ''}</h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-8">

        {/* Base Product Info */}
        <section className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="w-full md:w-1/2">
            {/* Gallery placeholder */}
            <div className="w-full aspect-[4/5] bg-[#f5f3f0] overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img src={product.images[ 0 ].url} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#7f7668]">No Image</div>
              )}
            </div>
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {product.images.slice(1).map((img, i) => (
                  <img key={i} src={img.url} alt={`Thumb ${i}`} className="w-16 h-20 object-cover bg-[#f5f3f0] shrink-0" />
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4 uppercase">{product.title}</h2>
            <p className="text-[#6e6258] text-lg mb-6 leading-relaxed max-w-md">{product.description}</p>
            <div className="text-2xl tracking-wide font-light mb-8">
              {product.price?.amount} {product.price?.currency}
            </div>
          </div>
        </section>

        {/* Variants & Inventory */}
        <section className="bg-[#f5f3f0] p-6 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <h3 className="font-serif text-3xl uppercase">Variants & Inventory</h3>
            {!isAddingVariant && (
              <button
                onClick={() => setIsAddingVariant(true)}
                className="bg-[#745a27] text-[#ffffff] px-6 py-3 uppercase tracking-wider text-sm hover:bg-[#5a4312] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PlusIcon /> Add New Variant
              </button>
            )}
          </div>

          {/* Add New Variant Form */}
          {isAddingVariant && (
            <div className="bg-[#ffffff] p-6 md:p-8 mb-12 shadow-[0_20px_40px_rgba(27,28,26,0.04)]">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-serif text-xl uppercase">Create Variant</h4>
                <button
                  onClick={() => setIsAddingVariant(false)}
                  className="text-[#7f7668] hover:text-[#1b1c1a] text-sm uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Left Col: Attributes & Basics */}
                <div className="space-y-6">

                  {/* Dynamic Attributes */}
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-3">Attributes (e.g. Size, Color) *</label>
                    <div className="space-y-3">
                      {attributeInputs.map((attr, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Key (e.g., Size)"
                            value={attr.key}
                            onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                            className="w-1/2 bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
                          />
                          <input
                            type="text"
                            placeholder="Value (e.g., M)"
                            value={attr.value}
                            onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                            className="w-1/2 bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
                          />
                          {attributeInputs.length > 1 && (
                            <button onClick={() => handleRemoveAttribute(index)} className="text-[#ba1a1a] p-2 hover:bg-[#ffdad6] transition-colors cursor-pointer">
                              <TrashIcon />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleAddAttribute}
                      className="mt-3 text-[#745a27] text-sm uppercase tracking-wider flex items-center gap-1 hover:text-[#5a4312] cursor-pointer"
                    >
                      <PlusIcon /> Add Attribute
                    </button>
                  </div>

                  {/* Stock & Price */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-2">Initial Stock</label>
                      <input
                        type="number"
                        value={newVariant.stock}
                        onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
                        className="w-full bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27]"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-2">Price Amount (Optional)</label>
                      <input
                        type="number"
                        value={newVariant.price.amount}
                        onChange={(e) => setNewVariant({ ...newVariant, price: { ...newVariant.price, amount: e.target.value } })}
                        placeholder="Default if empty"
                        className="w-full bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Right Col: Images */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="block text-sm uppercase tracking-wider text-[#6e6258]">Image Upload (Max 7, Optional)</label>
                    <span className="text-xs text-[#7f7668]">{newVariant.images.length}/7</span>
                  </div>

                  {newVariant.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {newVariant.images.map((img, index) => (
                        <div key={index} className="relative aspect-[4/5] bg-[#f5f3f0]">
                          <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-white/80 p-1 text-[#ba1a1a] hover:bg-white transition-colors cursor-pointer"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {newVariant.images.length < 7 && (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="block w-full text-sm text-[#6e6258]
                          file:mr-4 file:py-2 file:px-4
                          file:border-0 file:bg-[#f5f3f0] file:text-[#1b1c1a]
                          hover:file:bg-[#e4e2df] file:cursor-pointer file:uppercase file:text-xs file:tracking-wider file:font-serif
                          cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={handleAddNewVariant}
                  className="bg-gradient-to-r from-[#745a27] to-[#c9a96e] text-[#ffffff] px-8 py-3 uppercase tracking-wider text-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Save Variant
                </button>
              </div>
            </div>
          )}

          {/* Variants List */}
          {localVariants.length === 0 ? (
            <div className="py-12 text-center text-[#6e6258]">
              <p>No variants have been created yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {localVariants.map((variant, idx) => (
                <div key={idx} className="bg-[#ffffff] flex flex-col pt-4 shadow-[0_20px_40px_rgba(27,28,26,0.02)]">
                  <div className="px-6 flex gap-4 h-24 mb-4">
                    {/* Variant Thumb */}
                    <div className="w-16 h-20 bg-[#f5f3f0] shrink-0">
                      {variant.images && variant.images.length > 0 ? (
                        <img src={variant.images[ 0 ].url} alt="Variant" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#7f7668]">N/A</div>
                      )}
                    </div>
                    {/* Attributes */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {Object.entries(variant.attributes || {}).map(([ key, val ]) => (
                          <span key={key} className="bg-[#f5f3f0] px-2 py-1 text-xs uppercase tracking-wider text-[#4d463a]">
                            <span className="text-[#a8a094]">{key}:</span> {val}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm font-light">
                        {variant.price?.amount ? `${variant.price.amount} ${variant.price.currency}` : 'Base Price'}
                      </div>
                    </div>
                  </div>

                  {/* Stock Management Row */}
                  <div className="mt-auto border-t border-[#f5f3f0] bg-[#fbf9f6] flex items-center px-6 py-3 justify-between">
                    <label className="text-sm text-[#6e6258] uppercase tracking-wider">Current Stock</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={variant.stock || 0}
                        onChange={(e) => handleStockChange(idx, e.target.value)}
                        className="w-20 bg-transparent border-b border-[#d0c5b5] py-1 text-right focus:outline-none focus:border-[#745a27] font-serif text-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

      </main>
    </div>
  )
}

export default SellerProductDetails