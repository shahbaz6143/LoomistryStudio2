import { useRef, useEffect, useState } from 'react'

export default function ContactSection() {
  const titleRef = useRef(null)
  const formRef = useRef(null)
  const infoRef = useRef(null)

  const [form, setForm] = useState({ user_name: '', user_email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('revealed')
      }),
      { threshold: 0.1 }
    )
    ;[titleRef.current, formRef.current, infoRef.current].forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_KEY', // Replace with actual key
          ...form,
          from_name: 'LoomistryStudio Contact Form',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ user_name: '', user_email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-padding bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="reveal text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-px bg-clay-400" />
            <span className="text-clay-500 text-xs font-semibold tracking-[0.25em] uppercase">Get in Touch</span>
            <span className="w-10 h-px bg-clay-400" />
          </div>
          <h2 className="heading-lg text-stone-800">
            Let's <span className="text-clay-600 italic">Connecthghdskjkgd</span>
          </h2>
          <p className="text-stone-500 mt-4 text-lg max-w-xl mx-auto">
            Have questions or looking for a custom rug? Send us a message and our team will get back to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact info sidebar */}
          <div ref={infoRef} className="reveal-left lg:col-span-2 space-y-8">
            {/* Direct email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-clay-100 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-clay-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-stone-700 text-sm mb-1">Email Us</p>
                <a href="mailto:loomistrystudio@gmail.com" className="text-clay-600 hover:underline text-sm">
                  loomistrystudio@gmail.com
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-stone-700 text-sm mb-1">WhatsApp</p>
                <a
                  href="https://wa.me/917428917452"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline text-sm"
                >
                  +91 7428917452
                </a>
              </div>
            </div>

            {/* Etsy */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.435 0C5.12 0 0 5.12 0 11.435c0 6.315 5.12 11.434 11.435 11.434 6.315 0 11.434-5.119 11.434-11.434C22.87 5.12 17.75 0 11.435 0zm5.01 7.218h-3.065v2.718h2.98v1.23H13.38v4.666h-1.6V6.2h4.666v1.018z"/>
                </svg>
              </div>
              <div>
                <p className="font-semibold text-stone-700 text-sm mb-1">Etsy Store</p>
                <a
                  href="https://www.etsy.com/shop/theloomistrystudio/?etsrc=sdt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-500 hover:underline text-sm"
                >
                  theloomistrystudio
                </a>
              </div>
            </div>

            {/* Shipping note */}
            <div className="bg-clay-50 rounded-2xl p-5 border border-clay-200">
              <p className="text-clay-700 font-semibold text-sm mb-1">🌍 Worldwide Shipping</p>
              <p className="text-stone-500 text-sm leading-relaxed">
                We ship our handcrafted rugs globally. Custom sizes and designs available on request.
              </p>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="reveal-right lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-stone-100"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-stone-700 mb-2">
                    Your Name
                  </label>
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    required
                    value={form.user_name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-clay-300 focus:border-clay-400 transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium text-stone-700 mb-2">
                    Your Email
                  </label>
                  <input
                    id="user_email"
                    name="user_email"
                    type="email"
                    required
                    value={form.user_email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-clay-300 focus:border-clay-400 transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your rug requirement or inquiry..."
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-clay-300 focus:border-clay-400 transition-all duration-200 resize-none"
                  />
                </div>

                {/* Status messages */}
                {status === 'success' && (
                  <div className="flex items-center gap-3 bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 text-sm">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message sent! We'll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-3 bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 text-sm">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
