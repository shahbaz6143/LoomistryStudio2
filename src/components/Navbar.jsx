import { useState, useEffect } from 'react'

const navLinks = [
  { id: 'about', label: 'About Us', href: '#about' },
  { id: 'collection', label: 'Our Rugs', href: '#collection' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-clay-200 group-hover:border-clay-400 transition-colors duration-300">
            <img
              src="https://res.cloudinary.com/dkiyfvxpm/image/upload/v1773740967/Monogram_icnfv7.png"
              alt="LoomistryStudio"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className={`font-serif font-bold text-lg tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-stone-800' : 'text-white'
            }`}
          >
            LoomistryStudio
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className={`text-sm font-medium tracking-wider uppercase relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-clay-500 after:transition-all after:duration-300 hover:after:w-full transition-colors duration-300 ${
                  scrolled
                    ? 'text-stone-600 hover:text-clay-600'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="btn-primary !py-2.5 !px-6 text-sm"
            >
              Get a Quote
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${
            scrolled ? 'text-stone-800' : 'text-white'
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
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-stone-700 font-medium py-2 border-b border-stone-100 hover:text-clay-600 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary text-sm mt-2">
              Get a Quote
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
