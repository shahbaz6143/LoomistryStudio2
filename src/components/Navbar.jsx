import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '../store/useCartStore'

const navLinks = [
  { id: 'shop', label: 'Shop', href: '/shop' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  const openCart = useCartStore(state => state.openCart)
  const cartItemsCount = useCartStore(state => state.cartItems.reduce((acc, item) => acc + item.quantity, 0))
  
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled || !isHomePage
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-clay-200 group-hover:border-clay-400 transition-colors duration-300">
            <img
              src="https://res.cloudinary.com/dkiyfvxpm/image/upload/v1773740967/Monogram_icnfv7.png"
              alt="LoomistryStudio"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className={`font-serif font-bold text-lg tracking-wide transition-colors duration-300 ${
              scrolled || !isHomePage ? 'text-stone-800' : 'text-white'
            }`}
          >
            LoomistryStudio
          </span>
        </Link>

        {/* Desktop links & Cart */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.href}
                  className={`text-sm font-medium tracking-wider uppercase relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-clay-500 after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300 ${
                    scrolled || !isHomePage
                      ? 'text-stone-600 hover:text-clay-600'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={openCart}
            className={`relative p-2 transition-colors ${
              scrolled || !isHomePage ? 'text-stone-800 hover:text-clay-600' : 'text-white hover:text-stone-200'
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute 0 top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-clay-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={openCart}
            className={`relative p-2 transition-colors ${
              scrolled || !isHomePage ? 'text-stone-800' : 'text-white'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute 0 top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-clay-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </button>
          
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex flex-col gap-1.5 p-2 transition-colors ${
              scrolled || !isHomePage ? 'text-stone-800' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 bg-current origin-center ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 bg-current ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 bg-current origin-center ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-white/98 backdrop-blur-md`}
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-stone-700 font-medium py-2 border-b border-stone-100 hover:text-clay-600 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
