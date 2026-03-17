import { useEffect, useRef, useState } from 'react'

const rugs = [
  {
    id: 'rug-101',
    name: 'Ivory Minimal Abstract Wool Rug',
    imageUrl: 'https://images.unsplash.com/photo-1616627456790-6cde8c3d2b88?auto=format&fit=crop&w=800&q=80',
    price: '$320',
    tag: 'Bestseller',
  },
  {
    id: 'rug-102',
    name: 'Midnight Blue Geometric Wool Rug',
    imageUrl: 'https://images.unsplash.com/photo-1616627561839-074385245ff6?auto=format&fit=crop&w=800&q=80',
    price: '$360',
    tag: 'New',
  },
  {
    id: 'rug-103',
    name: 'Terracotta Boho Hand Tufted Runner',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    price: '$210',
    tag: 'Popular',
  },
  {
    id: 'rug-104',
    name: 'Monochrome Modern Minimal Rug',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
    price: '$295',
    tag: null,
  },
]

function RugCard({ rug, delay }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={rug.imageUrl}
            alt={rug.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              hovered ? 'scale-110' : 'scale-100'
            }`}
            loading="lazy"
          />
          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-stone-900/40 flex items-end p-5 transition-opacity duration-400 ${
              hovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <a
              href="#contact"
              className="w-full text-center bg-white text-stone-800 py-2.5 rounded-xl font-semibold text-sm hover:bg-clay-600 hover:text-white transition-colors duration-300"
            >
              Enquire Now
            </a>
          </div>
          {/* Tag badge */}
          {rug.tag && (
            <span className="absolute top-3 left-3 bg-clay-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {rug.tag}
            </span>
          )}
        </div>

        {/* Card info */}
        <div className="p-5">
          <h3 className="font-serif font-semibold text-stone-800 text-base leading-snug mb-2 group-hover:text-clay-600 transition-colors duration-300">
            {rug.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-clay-600 font-bold text-xl">{rug.price}</span>
            <span className="text-stone-400 text-xs">100% Wool</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RugCollection() {
  const titleRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="collection" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-px bg-clay-400" />
            <span className="text-clay-500 text-xs font-semibold tracking-[0.25em] uppercase">Handmade Collection</span>
            <span className="w-10 h-px bg-clay-400" />
          </div>
          <h2 className="heading-lg text-stone-800">
            Our Rug <span className="text-clay-600 italic">Collection</span>
          </h2>
          <p className="text-stone-500 mt-4 text-lg max-w-xl mx-auto">
            Each piece is individually handcrafted — bringing soul and texture to your living spaces.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {rugs.map((rug, i) => (
            <RugCard key={rug.id} rug={rug} delay={i * 150} />
          ))}
        </div>

        {/* Custom rug CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-clay-50 rounded-2xl px-10 py-8 border border-clay-200">
            <p className="text-stone-600 mb-4 text-lg">
              Looking for a custom size or design?
            </p>
            <a href="#contact" className="btn-primary">
              Request a Custom Rug
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
