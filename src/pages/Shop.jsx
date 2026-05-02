import { Link } from 'react-router-dom'
import { products } from '../data/products'

export default function Shop() {
  return (
    <div className="pt-32 pb-24 bg-clay-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="heading-xl text-stone-800 text-center mb-4">Shop the Collection</h1>
        <p className="text-stone-600 text-center text-lg max-w-2xl mx-auto mb-16">
          Explore our full range of handcrafted tufted rugs. Designed to elevate any space.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((rug) => (
            <Link key={rug.id} to={`/product/${rug.id}`} className="group block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={rug.imageUrl}
                    alt={rug.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {rug.tag && (
                    <span className="absolute top-4 left-4 bg-clay-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
                      {rug.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-semibold text-stone-800 text-lg leading-snug mb-2 group-hover:text-clay-600 transition-colors">
                    {rug.name}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-stone-800 font-bold text-xl">${rug.price}</span>
                    <span className="text-stone-400 text-sm">View Details →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
