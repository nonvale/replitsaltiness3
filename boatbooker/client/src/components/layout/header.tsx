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

  return (
    <header className="relative z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-black text-ocean-navy">PUGLIA BOAT TOUR</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium transition-colors ${
                    location === item.href
                      ? "text-ocean-blue"
                      : "text-gray-700 hover:text-ocean-blue"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <a
              href="tel:+393895194113"
              className="text-ocean-blue hover:text-ocean-navy transition-colors hidden sm:block"
            >
              <i className="fas fa-phone"></i>
            </a>
            <a
              href="https://wa.me/393895194113"
              className="bg-ocean-blue text-white px-4 py-2 rounded-full font-semibold hover:bg-ocean-navy transition-colors"
            >
              {t('nav.book_now')}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-ocean-blue transition-colors"
            >
              <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`block px-3 py-2 font-medium ${
                  location === item.href
                    ? "text-ocean-blue"
                    : "text-gray-700 hover:text-ocean-blue"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
