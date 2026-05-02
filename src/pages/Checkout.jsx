import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'
import { loadStripe } from '@stripe/stripe-js'

// You will replace this with your actual publishable key from Stripe Dashboard
const stripePromise = loadStripe('pk_test_placeholder_key_replace_me')

export default function Checkout() {
  const { cartItems, getCartTotal } = useCartStore()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('http://localhost:3000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize checkout')
      }

      // Redirect to Stripe Checkout URL provided by our backend
      window.location.href = data.url

    } catch (err) {
      console.error("Checkout error:", err)
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen flex flex-col items-center">
        <h2 className="heading-lg text-stone-800 mb-6">Your Cart is Empty</h2>
        <button onClick={() => navigate('/shop')} className="btn-primary">Return to Shop</button>
      </div>
    )
  }



  return (
    <div className="pt-32 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="heading-xl text-stone-800 mb-10 text-center">Checkout</h1>
        
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Checkout Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
            <h2 className="text-xl font-serif font-semibold text-stone-800 mb-6">Contact & Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email address</label>
                <input 
                  required type="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-clay-500 transition-shadow" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">First name</label>
                  <input 
                    required type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-clay-500 transition-shadow" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Last name</label>
                  <input 
                    required type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-clay-500 transition-shadow" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Address</label>
                <input 
                  required type="text" name="address" value={formData.address} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-clay-500 transition-shadow" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">City</label>
                  <input 
                    required type="text" name="city" value={formData.city} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-clay-500 transition-shadow" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Postal code</label>
                  <input 
                    required type="text" name="postalCode" value={formData.postalCode} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-clay-500 transition-shadow" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Phone</label>
                <input 
                  required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-clay-500 transition-shadow" 
                />
              </div>

              <div className="pt-6 border-t border-stone-100">
                {error && (
                  <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
                    {error}
                  </div>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 ${
                    isSubmitting ? 'bg-stone-400 cursor-not-allowed' : 'bg-stone-900 hover:bg-clay-600 shadow-lg'
                  }`}
                >
                  {isSubmitting ? 'Connecting to Secure Payment...' : 'Proceed to Payment'}
                </button>
              </div>

            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl shadow-sm border border-stone-100 sticky top-32">
            <h2 className="text-xl font-serif font-semibold text-stone-800 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 bg-stone-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-stone-800 text-sm">{item.name}</h3>
                    <p className="text-stone-500 text-xs">{item.size}</p>
                  </div>
                  <span className="font-semibold text-stone-800">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-6 space-y-3">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>${getCartTotal()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-stone-100 mt-4">
                <span className="text-lg font-bold text-stone-800">Total</span>
                <span className="text-2xl font-bold text-clay-600">${getCartTotal()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
