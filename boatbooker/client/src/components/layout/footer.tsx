export default function Footer() {
  return (
  <footer className="bg-ocean-navy/80 text-ocean-navy py-12 relative z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="text-3xl font-black mb-4 text-ocean-navy">SALTINESS</div>
            <p className="text-ocean-navy mb-6 max-w-md">
              Apulian Experience - Vivi la magia della Puglia attraverso esperienze nautiche 
              indimenticabili nelle acque cristalline del Mar Adriatico e Ionio.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/393895194113" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://www.instagram.com/saltiness_apulian_experience/" className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-400 transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/saltiness.apulianexperience" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-ocean-navy">Link Rapidi</h4>
            <ul className="space-y-2">
              <li><a href="/fleet" className="text-ocean-navy hover:text-ocean-blue transition-colors">La Nostra Flotta</a></li>
              <li><a href="#destinazioni" className="text-ocean-navy hover:text-ocean-blue transition-colors">Destinazioni</a></li>
              <li><a href="#servizi" className="text-ocean-navy hover:text-ocean-blue transition-colors">Servizi</a></li>
              <li><a href="#contatti" className="text-ocean-navy hover:text-ocean-blue transition-colors">Contatti</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-ocean-navy">Contatti</h4>
            <ul className="space-y-2 text-ocean-navy">
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <a href="tel:+393895194113" className="text-ocean-navy hover:text-ocean-blue transition-colors">+39 389 519 4113</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <a href="mailto:boat.tour23@gmail.com" className="text-ocean-navy hover:text-ocean-blue transition-colors">boat.tour23@gmail.com</a>
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mr-2 mt-1"></i>
                <span className="text-ocean-navy">Via Aurelio Sereno 4<br />70043 Monopoli (BA)</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-ocean-navy">
          <p>&copy; 2024 Saltiness - Apulian Experience. Tutti i diritti riservati.</p>
          <p className="mt-2">P.IVA: 08908110722</p>
        </div>
      </div>
    </footer>
  );
}
