import Navbar from './components/Navbar'
import HeroCarousel from './components/HeroCarousel'
import AboutSection from './components/AboutSection'
import RugCollection from './components/RugCollection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroCarousel />
        <AboutSection />
        <RugCollection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
