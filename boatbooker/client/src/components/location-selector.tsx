import { LOCATIONS } from "@/lib/constants";
import { useLanguage } from "@/contexts/language-context";

interface LocationSelectorProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  showYachtCount?: boolean;
}

export default function LocationSelector({ selectedLocation, onLocationChange, showYachtCount = false }: LocationSelectorProps) {
  const { t } = useLanguage();
  
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
  <h3 className="text-2xl font-bold text-ocean-navy mb-4">{t('hero.choose_destination')}</h3>
        <p className="text-gray-600">{t('destinations.page_subtitle')}</p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        {LOCATIONS.map((location) => (
          <button
            key={location.id}
            onClick={() => onLocationChange(location.id)}
            className={`
              group relative px-8 py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 hover:shadow-lg
              ${selectedLocation === location.id
                ? "bg-gradient-to-r from-ocean-blue to-ocean-cyan text-white shadow-xl"
                : "bg-white text-ocean-blue border-2 border-ocean-blue hover:bg-ocean-blue hover:text-white"
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <i className="fas fa-map-marker-alt text-lg"></i>
              <div className="text-left">
                <div className="font-bold">
                  {location.id === "all" ? t('location.all') : t(`location.${location.id}`)}
                </div>
                {showYachtCount && location.id !== "all" && (
                  <div className="text-xs opacity-75">
                    {/* You can add yacht count here if needed */}
                  </div>
                )}
              </div>
            </div>
            
            {/* Geometric decoration */}
            <div className={`absolute top-0 right-0 w-6 h-6 rounded-bl-2xl transition-all
              ${selectedLocation === location.id 
                ? "bg-white/20" 
                : "bg-ocean-cyan/10 group-hover:bg-white/20"
              }`}></div>
          </button>
        ))}
      </div>
    </div>
  );
}