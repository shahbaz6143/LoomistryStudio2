import { useState, useEffect, useCallback } from 'react'

const slides = [
  {
    id: 'slide-1',
    title: 'Handcrafted Tufted Rugs\nfrom India',
    subtitle: 'Premium wool rugs designed for modern interiors.',
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'slide-2',
    title: 'Modern Design Meets\nTraditional Craftsmanshipvgvgfhgf', 
    subtitle: 'Each rug is handcrafted by skilled artisans using high-quality wool.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 400)
  }, [animating])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  useEffect(() => {
    const interval = setInterval(next, 5500)
    return () => clearInterval(interval)
  }, [next])

  return (
    <section id="hero" className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <div
          key={current}
          className="animate-fade-in-up"
        >
          {/* Badge */}
          <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/30 text-white/90 text-xs font-medium tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
            ✦ Handmade in India
          </span>

          {/* Title */}
          <h1 className="heading-xl text-white mb-5 drop-shadow-lg max-w-3xl mx-auto" style={{ whiteSpace: 'pre-line' }}>
            {slides[current].title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 font-light max-w-xl mx-auto mb-10 leading-relaxed">
            {slides[current].subtitle}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#collection" className="btn-primary shadow-lg">
              Explore Collection
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border-2 border-white/70 text-white px-8 py-3.5 rounded-full font-medium tracking-wide hover:bg-white hover:text-stone-800 transition-all duration-300 hover:-translate-y-0.5"
            >
              Custom Order
            </a>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`carousel-dot ${i === current ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Arrow buttons */}
      <button
        aria-label="Previous slide"
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll cue */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
