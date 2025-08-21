import { Link } from "wouter";
import type { Yacht } from "@shared/schema";
import { useLanguage } from "@/contexts/language-context";

interface YachtCardProps {
  yacht: Yacht;
}

export default function YachtCard({ yacht }: YachtCardProps) {
  const { t } = useLanguage();
  
  const getLocationDisplay = (location: string) => {
    return t(`location.${location}`);
  };

  const getYachtTypeBadge = (type: string) => {
    const badges: Record<string, { label: string; color: string }> = {
      motor: { label: t('yacht.motor').toUpperCase(), color: "bg-ocean-blue" },
      sailing: { label: t('yacht.sailing').toUpperCase(), color: "bg-ocean-cyan" },
      catamaran: { label: t('yacht.catamaran').toUpperCase(), color: "bg-orange-400" },
      gozzo: { label: t('yacht.gozzo').toUpperCase(), color: "bg-green-500" },
    };
    return badges[type] || { label: type.toUpperCase(), color: "bg-gray-500" };
  };

  const badge = getYachtTypeBadge(yacht.type);

  return (
    <div className="yacht-card bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 shapes-card-hover">
      <div className="relative">
        <img
          src={yacht.images[0]}
          alt={`${yacht.name} yacht`}
          className="w-full h-64 object-cover"
        />
        
        {/* Location Badge */}
        <div className="absolute top-4 left-4 bg-ocean-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
          <i className="fas fa-map-marker-alt mr-1"></i>
          {getLocationDisplay(yacht.location)}
        </div>
        
        {/* Type Badge */}
        <div className={`absolute top-4 right-4 ${badge.color + ' text-white'} px-3 py-1 rounded-full text-sm font-bold`}>
          {badge.label}
        </div>

        {/* Geometric Overlay */}
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-ocean-cyan opacity-20 geometric-square translate-x-8 translate-y-8"></div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-ocean-navy">{yacht.name}</h3>
            <p className="text-gray-600 capitalize">{t(`yacht.${yacht.type}`)}</p>
          </div>
          {/* Nessun prezzo visualizzato */}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-lg font-bold text-ocean-navy">{yacht.capacity}</div>
            <div className="text-xs text-gray-500">{t('yacht.guests')}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-ocean-navy">{yacht.length}m</div>
            <div className="text-xs text-gray-500">{t('yacht.length')}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-ocean-navy">{yacht.cabins || 0}</div>
            <div className="text-xs text-gray-500">{t('yacht.cabins')}</div>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/yacht/${yacht.id}`}
            className="flex-1 bg-ocean-blue text-white py-3 rounded-full font-semibold hover:bg-ocean-navy transition-colors text-center"
          >
            {t('services.learn_more')}
          </Link>
          <Link
            href={`/booking/${yacht.id}`}
            className="px-4 py-3 border-2 border-ocean-blue text-ocean-blue rounded-full hover:bg-ocean-blue hover:text-white transition-colors"
          >
            <i className="fas fa-calendar-alt"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
