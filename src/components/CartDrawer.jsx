import { X, Trash2, Plus, Minus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'

export default function CartDrawer() {
  const { 
    isCartOpen, 
    closeCart, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal 
  } = useCartStore()
  
  const navigate = useNavigate()

  if (!isCartOpen) return null

  const handleCheckout = () => {
    closeCart()
    navigate('/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/40 z-50 transition-opacity backdrop-blur-sm"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <h2 className="text-xl font-serif font-semibold text-stone-800">Your Cart</h2>
          <button 
            onClick={closeCart}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-stone-500 space-y-4">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">🛍️</span>
              </div>
              <p>Your cart is empty.</p>
              <button 
                onClick={() => { closeCart(); navigate('/shop'); }}
                className="text-clay-600 font-medium hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4">
                  <div className="w-24 h-24 bg-stone-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-stone-800 text-sm leading-snug">{item.name}</h3>
                        <p className="text-stone-500 text-xs mt-1">Size: {item.size}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-stone-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-stone-200 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="px-2 py-1 text-stone-500 hover:bg-stone-50"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="px-2 py-1 text-stone-500 hover:bg-stone-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold text-stone-800">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-600 font-medium">Subtotal</span>
              <span className="text-xl font-bold text-stone-800">${getCartTotal()}</span>
            </div>
            <p className="text-stone-500 text-xs mb-6 text-center">Shipping and taxes calculated at checkout.</p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-clay-600 text-white py-4 rounded-xl font-bold hover:bg-stone-900 transition-colors duration-300"
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  )
}
