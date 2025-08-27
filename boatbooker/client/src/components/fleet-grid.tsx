import { useState } from "react";
import YachtCard from "./yacht-card";
import type { Yacht } from "@shared/schema";
import { useLanguage } from "@/contexts/language-context";

interface FleetGridProps {
  yachts: Yacht[];
  showFilters?: boolean;
}

export default function FleetGrid({ yachts, showFilters = true }: FleetGridProps) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    location: "all",
    capacity: "all",
    type: "all",
  });

  const filteredYachts = yachts.filter((yacht) => {
    if (filters.location !== "all" && yacht.location !== filters.location) {
      return false;
    }
    
    if (filters.capacity !== "all") {
      const capacityRange = filters.capacity.split("-");
      if (capacityRange.length === 2) {
        const min = parseInt(capacityRange[0]);
        const max = parseInt(capacityRange[1]);
        if (yacht.capacity < min || yacht.capacity > max) {
          return false;
        }
      } else if (filters.capacity === "11+") {
        if (yacht.capacity < 11) {
          return false;
        }
      }
    }
    
    if (filters.type !== "all" && yacht.type !== filters.type) {
      return false;
    }
    
    return true;
  });

  return (
    <div>
      {/* Filter Bar */}
      {showFilters && (
        <div className="mb-12 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <i className="fas fa-filter text-ocean-blue"></i>
              <span className="font-semibold text-gray-700">{t('filters.filter_by')}</span>
            </div>
            
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
            >
              <option value="all">{t('filters.all_locations')}</option>
              <option value="monopoli">{t('location.monopoli')}</option>
              <option value="polignano">{t('location.polignano')}</option>
              <option value="leuca">{t('location.leuca')}</option>
              <option value="gallipoli">{t('location.gallipoli')}</option>
            </select>
            
            <select
              value={filters.capacity}
              onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
            >
              <option value="all">{t('filters.capacity')}</option>
              <option value="1-6">1-6 {t('contact.guests').toLowerCase()}</option>
              <option value="7-10">7-10 {t('contact.guests').toLowerCase()}</option>
              <option value="11+">11+ {t('contact.guests').toLowerCase()}</option>
            </select>
            
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
            >
              <option value="all">Tipo Yacht</option>
              <option value="motor">{t('yacht.motor')}</option>
              <option value="sailing">{t('yacht.sailing')}</option>
              <option value="catamaran">{t('yacht.catamaran')}</option>
              <option value="gozzo">{t('yacht.gozzo')}</option>
            </select>
          </div>
        </div>
      )}

      {/* Results Info */}
      <div className="mb-8">
        <p className="text-gray-600">
          {filteredYachts.length === 0 
            ? <span className="text-ocean-navy font-bold z-[100]">{t('filters.no_results')}</span>
            : `${filteredYachts.length} ${t('filters.results')}`
          }
        </p>
      </div>

      {/* Yacht Grid */}
      {filteredYachts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl text-gray-300 mb-4">
            <i className="fas fa-search"></i>
          </div>
          <h3 className="text-xl font-semibold text-ocean-navy mb-2 z-[100]">{t('filters.no_results')}</h3>
          <p className="text-gray-500">{t('filters.modify_filters')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredYachts.map((yacht) => (
            <YachtCard key={yacht.id} yacht={yacht} />
          ))}
        </div>
      )}
    </div>
  );
}
