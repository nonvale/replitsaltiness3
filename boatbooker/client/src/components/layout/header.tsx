import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/language-context";
import LanguageToggle from "@/components/language-toggle";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { href: "/", label: t('nav.home') },
    { href: "/fleet", label: t('nav.fleet') },
    { href: "/destinations", label: t('nav.destinations') },
    { href: "/services", label: t('nav.services') },
    { href: "/contacts", label: t('nav.contacts') },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // ...existing code...
  // Header desktop come versione precedente, mobile invariato
  return (
  <header className="w-full bg-white/80 backdrop-blur-md shadow-md z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <div className="flex-1 flex items-center justify-center lg:justify-start">
          <a href="/" className="font-black text-2xl lg:text-4xl text-ocean-navy tracking-tight">PUGLIA BOAT TOUR</a>
        </div>
        <div className="flex items-center">
          <button className="lg:hidden block p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Apri menu">
            <i className="fas fa-bars text-2xl text-ocean-navy"></i>
          </button>
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-ocean-navy font-semibold hover:text-ocean-blue transition">Home</a>
            <a href="/fleet" className="text-ocean-navy font-semibold hover:text-ocean-blue transition">Flotta</a>
            <a href="/destinations" className="text-ocean-navy font-semibold hover:text-ocean-blue transition">Destinazioni</a>
            <a href="/services" className="text-ocean-navy font-semibold hover:text-ocean-blue transition">Servizi</a>
            <a href="/contacts" className="text-ocean-navy font-semibold hover:text-ocean-blue transition">Contatti</a>
            <a href="/booking" className="ml-2 bg-ocean-blue text-white px-5 py-2 rounded-full font-bold hover:bg-ocean-navy transition">Prenota ora</a>
            <div className="ml-4"><LanguageToggle /></div>
          </nav>
        </div>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md z-[1001]">
          <nav className="flex flex-col py-4 space-y-2">
            <a href="/" className="text-ocean-navy font-semibold hover:text-ocean-blue transition px-4 py-2">Home</a>
            <a href="/fleet" className="text-ocean-navy font-semibold hover:text-ocean-blue transition px-4 py-2">Flotta</a>
            <a href="/destinations" className="text-ocean-navy font-semibold hover:text-ocean-blue transition px-4 py-2">Destinazioni</a>
            <a href="/services" className="text-ocean-navy font-semibold hover:text-ocean-blue transition px-4 py-2">Servizi</a>
            <a href="/contacts" className="text-ocean-navy font-semibold hover:text-ocean-blue transition px-4 py-2">Contatti</a>
            <a href="/booking" className="bg-ocean-blue text-white px-4 py-2 rounded-full font-bold hover:bg-ocean-navy transition mx-4 mt-2">Prenota ora</a>
            <div className="flex justify-center mt-4"><LanguageToggle /></div>
          </nav>
        </div>
      )}
    </header>
  );
}
