import { useState } from "react";

export default function WhatsAppButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const whatsappUrl = "https://wa.me/393895194113?text=Ciao%2C%20vorrei%20pi%C3%B9%20informazioni%20sui%20vostri%20yacht%20e%20servizi%21";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className={`
          bg-green-500 text-white rounded-full shadow-lg hover:bg-green-400 
          transition-all duration-300 transform hover:scale-110 flex items-center
          ${isExpanded ? 'px-6 py-4' : 'p-4'}
        `}>
          <i className="fab fa-whatsapp text-2xl"></i>
          
          <span className={`
            font-semibold whitespace-nowrap overflow-hidden transition-all duration-300
            ${isExpanded ? 'ml-3 max-w-xs opacity-100' : 'ml-0 max-w-0 opacity-0'}
          `}>
            Chatta con noi!
          </span>
        </div>
      </a>

      {/* Floating animation rings */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping"></div>
        <div className="absolute inset-2 rounded-full bg-green-500 opacity-30 animate-ping animation-delay-150"></div>
      </div>
    </div>
  );
}
