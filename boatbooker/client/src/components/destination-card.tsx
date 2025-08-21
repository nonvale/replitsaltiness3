import type { Destination } from "@shared/schema";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const handleCardClick = () => {
    // Navigate to fleet page with location filter
    window.location.href = `/fleet?location=${destination.id}`;
  };

  return (
    <div 
      className="destination-card group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative bg-ocean-light rounded-3xl overflow-hidden h-80 transform transition-all duration-300 group-hover:scale-105 shapes-card-hover">
        <img
          src={destination.image}
          alt={`${destination.name} coastline`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-navy/80 via-transparent to-transparent"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center mb-2">
            <i className="fas fa-map-marker-alt mr-2"></i>
            <span className="text-sm font-semibold opacity-90">
              {destination.id === "leuca" ? "Punta del Salento" : 
               destination.id === "gallipoli" ? "Mar Ionio" : "Costa Adriatica"}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
          <p className="text-sm opacity-90 mb-4">{destination.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">
              {destination.yachtCount} yacht disponibili
            </span>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fas fa-arrow-right text-sm"></i>
            </div>
          </div>
        </div>
        
        {/* Geometric Element */}
        <div className={`absolute top-4 right-4 w-12 h-12 opacity-30 ${
          destination.id === "monopoli" ? "bg-ocean-blue geometric-circle" :
          destination.id === "polignano" ? "bg-ocean-cyan geometric-square" :
          destination.id === "leuca" ? "bg-sand geometric-circle" :
          "bg-ocean-blue geometric-square"
        }`}></div>
      </div>
    </div>
  );
}
