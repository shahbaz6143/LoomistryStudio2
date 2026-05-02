import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { useCartStore } from '../store/useCartStore'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const addToCart = useCartStore((state) => state.addToCart)
  
  const product = products.find((p) => p.id === id)
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '')

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen">
        <h2 className="heading-lg text-stone-800">Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="mt-8 btn-primary">Back to Shop</button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize)
    // We could add a toast notification here
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-stone-500">
          <span className="cursor-pointer hover:text-clay-600 transition-colors" onClick={() => navigate('/')}>Home</span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:text-clay-600 transition-colors" onClick={() => navigate('/shop')}>Shop</span>
          <span className="mx-2">/</span>
          <span className="text-stone-800">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="rounded-3xl overflow-hidden bg-stone-100 aspect-square">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            {product.tag && (
              <span className="inline-block bg-clay-100 text-clay-700 text-xs font-bold px-3 py-1 rounded-full mb-4 w-max">
                {product.tag}
              </span>
            )}
            <h1 className="heading-xl text-stone-800 mb-4">{product.name}</h1>
            <p className="text-3xl text-clay-600 font-bold mb-6">${product.price}</p>
            <p className="text-stone-600 text-lg mb-10 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wider mb-4">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-xl border transition-all duration-300 font-medium ${
                      selectedSize === size
                        ? 'border-clay-600 bg-clay-600 text-white shadow-md'
                        : 'border-stone-200 text-stone-600 hover:border-clay-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button 
              onClick={handleAddToCart}
              className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-clay-600 hover:shadow-xl transition-all duration-300 transform active:scale-95"
            >
              Add to Cart
            </button>
            
            <div className="mt-8 pt-8 border-t border-stone-100 space-y-4">
              <div className="flex items-center text-stone-600">
                <svg className="w-5 h-5 mr-3 text-clay-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Hand-tufted with 100% premium wool
              </div>
              <div className="flex items-center text-stone-600">
                <svg className="w-5 h-5 mr-3 text-clay-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free shipping worldwide
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
