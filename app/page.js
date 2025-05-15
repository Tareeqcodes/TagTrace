import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import How from '@/components/How';
import Pricing from '@/components/Pricing';
import Tesmonials from '@/components/Tesmonials';
import Action from '@/components/Action';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function page() {
  return (
    <>
     <Header />
     <HeroSection />
     <Features />
     <How />
     <Pricing />
     <Tesmonials />
     <Action />
     <FAQ />
     <Footer />
    </>
  )
}
