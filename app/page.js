
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import How from '@/components/How';
import Pricing from '@/components/Pricing';
import Tesmonials from '@/components/Tesmonials';
import FAQ from '@/components/FAQ';
import Navbar from '@/components/Navbar';


export default function page() {
  return (
    <>
    <Navbar />
     <HeroSection />
     <Features />
     <How />
     <Pricing />
     <Tesmonials />
     <FAQ />
    </>
  )
}
