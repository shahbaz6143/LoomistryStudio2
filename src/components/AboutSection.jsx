import { useEffect, useRef } from 'react'

const pillars = [
  'Handmade by skilled artisans',
  '100% premium wool materials',
  'Custom rug sizes available',
  'Designed for modern interiors',
  'Worldwide shipping',
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function AboutSection() {
  const leftRef = useReveal()
  const rightRef = useReveal()

  return (
    <section id="about" className="section-padding bg-clay-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-px bg-clay-400" />
          <span className="text-clay-500 text-xs font-semibold tracking-[0.25em] uppercase">Our Story</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div ref={leftRef} className="reveal-left">
            <h2 className="heading-lg text-stone-800 mb-6">
              About{' '}
              <span className="text-clay-600 italic font-serif">LoomistryStudio</span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              LoomistryStudio is a handmade rug brand from India specializing in premium
              hand-tufted wool rugs. Our rugs are crafted by skilled artisans using traditional
              craftsmanship combined with modern design aesthetics. We aim to bring warmth,
              texture, and timeless beauty to homes around the world.
            </p>

            {/* Pillars */}
            <ul className="space-y-3">
              {pillars.map((p, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-700">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-clay-100 flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-clay-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="font-medium">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a href="#collection" className="btn-primary">
                View Our Collection
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right: image */}
          <div ref={rightRef} className="reveal-right">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-clay-300/60 z-0" />
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img
                  src="https://res.cloudinary.com/dkiyfvxpm/image/upload/v1773406505/featured6_mbyzm3.jpg"
                  alt="Skilled artisan crafting a handmade rug at LoomistryStudio"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-clay-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-clay-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-stone-800 font-bold text-lg leading-none">100%</p>
                  <p className="text-stone-500 text-sm mt-0.5">Premium Wool</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
