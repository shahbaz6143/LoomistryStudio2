import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/useCartStore'

export default function Success() {
  const navigate = useNavigate()
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    // Clear the cart when the user successfully completes a purchase
    clearCart()
  }, [clearCart])

  return (
    <div className="pt-40 pb-24 text-center min-h-screen flex flex-col items-center">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="heading-lg text-stone-800 mb-4">Payment Successful!</h2>
      <p className="text-stone-600 max-w-md mx-auto mb-8 text-lg">
        Thank you for shopping with LoomistryStudio. Your handcrafted rug will be carefully prepared and shipped soon.
      </p>
      <button onClick={() => navigate('/shop')} className="btn-primary">Continue Shopping</button>
    </div>
  )
}
