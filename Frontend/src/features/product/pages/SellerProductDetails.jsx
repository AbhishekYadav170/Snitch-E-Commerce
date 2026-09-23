

import React, { useEffect, useState } from 'react'
import { useProduct } from '../hooks/useProduct';
import { useParams, useNavigate } from 'react-router';

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
  const navigate = useNavigate();
  const { handleGetProductById, handleAddProductVariant, handleDeleteProduct, handleDeleteProductVariant } = useProduct();
  const [ isDeletingProduct, setIsDeletingProduct ] = useState(false);
  const [ deletingVariantId, setDeletingVariantId ] = useState(null);
  const [ deleteError, setDeleteError ] = useState(null);

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

  const handleDeleteThisProduct = async () => {
    const confirmed = window.confirm(`Delete "${product.title}" permanently? This cannot be undone.`);
    if (!confirmed) return;

    setDeleteError(null);
    setIsDeletingProduct(true);
    try {
      await handleDeleteProduct(product._id);
      navigate('/seller/dashboard');
    } catch (err) {
      console.error('Delete product failed:', err);
      const message = err?.response?.data?.message || err?.message || 'Could not delete this product. Please try again.';
      setDeleteError(message);
      alert(`Delete failed: ${message}`);
      setIsDeletingProduct(false);
    }
  };

  const handleDeleteThisVariant = async (variant) => {
    if (!variant._id) {
      // A locally-added variant that hasn't been persisted yet — just drop it client-side
      setLocalVariants(prev => prev.filter(v => v !== variant));
      return;
    }

    const confirmed = window.confirm('Remove this variant?');
    if (!confirmed) return;

    setDeleteError(null);
    setDeletingVariantId(variant._id);
    try {
      await handleDeleteProductVariant(product._id, variant._id);
      setLocalVariants(prev => prev.filter(v => v._id !== variant._id));
    } catch (err) {
      setDeleteError(err?.response?.data?.message || 'Could not remove this variant. Please try again.');
    } finally {
      setDeletingVariantId(null);
    }
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
        ? { amount: Number(newVariant.price.amount), currency: newVariant.price.currency || 'INR' }
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
    return <div className="min-h-screen bg-[#131313] flex items-center justify-center text-[#e5e2e1] font-serif">Loading gallery...</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-[#131313] flex items-center justify-center text-[#e5e2e1] font-serif">Product Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-sans pb-24">
      {/* Top Banner / Header */}
      <header className="sticky top-0 z-10 bg-[#131313]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-xl tracking-wide uppercase">{product.title?.substring(0, 20)}{product.title?.length > 20 ? '...' : ''}</h1>
        <button
          onClick={handleDeleteThisProduct}
          disabled={isDeletingProduct}
          className="flex items-center gap-2 text-[#ff9a94] text-xs uppercase tracking-wider hover:opacity-70 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <TrashIcon /> {isDeletingProduct ? 'Deleting...' : 'Delete Product'}
        </button>
      </header>

      {deleteError && (
        <div className="max-w-6xl mx-auto px-4 md:px-8 mt-6">
          <div className="text-[11px] uppercase tracking-[0.15em] font-medium px-5 py-4 border" style={{ backgroundColor: '#2e1616', borderColor: '#5c2b2b', color: '#ff9a94' }}>
            {deleteError}
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-8">

        {/* Base Product Info */}
        <section className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="w-full md:w-1/2">
            {/* Gallery placeholder */}
            <div className="w-full aspect-[4/5] bg-[#201f1f] overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img src={product.images[ 0 ].url} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#6b6459]">No Image</div>
              )}
            </div>
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {product.images.slice(1).map((img, i) => (
                  <img key={i} src={img.url} alt={`Thumb ${i}`} className="w-16 h-20 object-cover bg-[#201f1f] shrink-0" />
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-4 uppercase">{product.title}</h2>
            <p className="text-[#999077] text-lg mb-6 leading-relaxed max-w-md">{product.description}</p>
            <div className="text-2xl tracking-wide font-light mb-8">
              {product.price?.amount} {product.price?.currency}
            </div>
          </div>
        </section>

        {/* Variants & Inventory */}
        <section className="bg-[#1c1b1b] p-6 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <h3 className="font-serif text-3xl uppercase">Variants & Inventory</h3>
            {!isAddingVariant && (
              <button
                onClick={() => setIsAddingVariant(true)}
                className="bg-[#FFD700] text-[#131313] px-6 py-3 uppercase tracking-wider text-sm hover:bg-[#e9c400] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PlusIcon /> Add New Variant
              </button>
            )}
          </div>

          {/* Add New Variant Form */}
          {isAddingVariant && (
            <div className="bg-[#1c1b1b] p-6 md:p-8 mb-12 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-serif text-xl uppercase">Create Variant</h4>
                <button
                  onClick={() => setIsAddingVariant(false)}
                  className="text-[#6b6459] hover:text-[#e5e2e1] text-sm uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Left Col: Attributes & Basics */}
                <div className="space-y-6">

                  {/* Dynamic Attributes */}
                  <div>
                    <label className="block text-sm uppercase tracking-wider text-[#999077] mb-3">Attributes (e.g. Size, Color) *</label>
                    <div className="space-y-3">
                      {attributeInputs.map((attr, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Key (e.g., Size)"
                            value={attr.key}
                            onChange={(e) => handleAttributeChange(index, 'key', e.target.value)}
                            className="w-1/2 bg-transparent border-b border-[#4d4732] py-2 focus:outline-none focus:border-[#FFD700] placeholder:text-[#4d4732]"
                          />
                          <input
                            type="text"
                            placeholder="Value (e.g., M)"
                            value={attr.value}
                            onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                            className="w-1/2 bg-transparent border-b border-[#4d4732] py-2 focus:outline-none focus:border-[#FFD700] placeholder:text-[#4d4732]"
                          />
                          {attributeInputs.length > 1 && (
                            <button onClick={() => handleRemoveAttribute(index)} className="text-[#ff6b6b] p-2 hover:bg-[#331c1c] transition-colors cursor-pointer">
                              <TrashIcon />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleAddAttribute}
                      className="mt-3 text-[#FFD700] text-sm uppercase tracking-wider flex items-center gap-1 hover:text-[#e9c400] cursor-pointer"
                    >
                      <PlusIcon /> Add Attribute
                    </button>
                  </div>

                  {/* Stock & Price */}
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-sm uppercase tracking-wider text-[#999077] mb-2">Initial Stock</label>
                      <input
                        type="number"
                        value={newVariant.stock}
                        onChange={(e) => setNewVariant({ ...newVariant, stock: e.target.value })}
                        className="w-full bg-transparent border-b border-[#4d4732] py-2 focus:outline-none focus:border-[#FFD700]"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm uppercase tracking-wider text-[#999077] mb-2">Price Amount (Optional)</label>
                      <input
                        type="number"
                        value={newVariant.price.amount}
                        onChange={(e) => setNewVariant({ ...newVariant, price: { ...newVariant.price, amount: e.target.value } })}
                        placeholder="Default if empty"
                        className="w-full bg-transparent border-b border-[#4d4732] py-2 focus:outline-none focus:border-[#FFD700] placeholder:text-[#4d4732]"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Right Col: Images */}
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <label className="block text-sm uppercase tracking-wider text-[#999077]">Image Upload (Max 7, Optional)</label>
                    <span className="text-xs text-[#6b6459]">{newVariant.images.length}/7</span>
                  </div>

                  {newVariant.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {newVariant.images.map((img, index) => (
                        <div key={index} className="relative aspect-[4/5] bg-[#201f1f]">
                          <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-[#131313]/80 p-1 text-[#ff6b6b] hover:bg-[#131313] transition-colors cursor-pointer"
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
                        className="block w-full text-sm text-[#999077]
                          file:mr-4 file:py-2 file:px-4
                          file:border-0 file:bg-[#201f1f] file:text-[#e5e2e1]
                          hover:file:bg-[#2a2818] file:cursor-pointer file:uppercase file:text-xs file:tracking-wider file:font-serif
                          cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={handleAddNewVariant}
                  className="bg-gradient-to-r from-[#e9c400] to-[#FFD700] text-[#131313] px-8 py-3 uppercase tracking-wider text-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Save Variant
                </button>
              </div>
            </div>
          )}

          {/* Variants List */}
          {localVariants.length === 0 ? (
            <div className="py-12 text-center text-[#999077]">
              <p>No variants have been created yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {localVariants.map((variant, idx) => (
                <div key={idx} className="bg-[#1c1b1b] flex flex-col pt-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  <div className="px-6 flex gap-4 h-24 mb-4">
                    {/* Variant Thumb */}
                    <div className="w-16 h-20 bg-[#201f1f] shrink-0">
                      {variant.images && variant.images.length > 0 ? (
                        <img src={variant.images[ 0 ].url} alt="Variant" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#6b6459]">N/A</div>
                      )}
                    </div>
                    {/* Attributes */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {Object.entries(variant.attributes || {}).map(([ key, val ]) => (
                          <span key={key} className="bg-[#2a2818] px-2 py-1 text-xs uppercase tracking-wider text-[#d0c6ab]">
                            <span className="text-[#8a8071]">{key}:</span> {val}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm font-light">
                        {variant.price?.amount ? `${variant.price.amount} ${variant.price.currency}` : 'Base Price'}
                      </div>
                    </div>
                    {/* Delete this variant */}
                    <button
                      onClick={() => handleDeleteThisVariant(variant)}
                      disabled={deletingVariantId === variant._id}
                      aria-label="Delete variant"
                      title="Delete variant"
                      className="self-start text-[#ff6b6b] p-2 hover:bg-[#331c1c] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                    >
                      {deletingVariantId === variant._id ? (
                        <span className="text-[9px] uppercase tracking-wide">...</span>
                      ) : (
                        <TrashIcon />
                      )}
                    </button>
                  </div>

                  {/* Stock Management Row */}
                  <div className="mt-auto border-t border-[#33302a] bg-[#1c1b1b] flex items-center px-6 py-3 justify-between">
                    <label className="text-sm text-[#999077] uppercase tracking-wider">Current Stock</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={variant.stock || 0}
                        onChange={(e) => handleStockChange(idx, e.target.value)}
                        className="w-20 bg-transparent border-b border-[#4d4732] py-1 text-right focus:outline-none focus:border-[#FFD700] font-serif text-lg"
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