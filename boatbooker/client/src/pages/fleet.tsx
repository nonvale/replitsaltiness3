import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Yacht } from "@shared/schema";
import { useLanguage } from "@/contexts/language-context";
import GeometricShapes from "@/components/geometric-shapes";
import YachtCard from "@/components/yacht-card";
import LocationFilter from "@/components/location-filter";
// Helmet import removed as per changes

export default function Fleet() {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedCapacity, setSelectedCapacity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const { data: yachts = [] } = useQuery<Yacht[]>({
    queryKey: ["/api/yachts"],
  });

  // Filter yachts based on criteria
  const filteredYachts = yachts.filter(yacht => {
    const locationMatch = selectedLocation === "all" || yacht.location === selectedLocation;
    let capacityMatch = true;
    if (selectedCapacity !== "all") {
      if (selectedCapacity === "1-6") capacityMatch = yacht.capacity >= 1 && yacht.capacity <= 6;
      else if (selectedCapacity === "7-10") capacityMatch = yacht.capacity >= 7 && yacht.capacity <= 10;
      else if (selectedCapacity === "11+") capacityMatch = yacht.capacity >= 11;
    }
    const typeMatch = selectedType === "all" || yacht.type === selectedType;
    return locationMatch && capacityMatch && typeMatch;
  });

  return (
    <>
      {/* Helmet usage removed as per changes */}

      <div className="relative">
        <GeometricShapes />

        {/* Hero Section */}
  <section className="py-20 bg-gradient-ocean-light relative overflow-hidden z-10 hero-section pt-20">
          <div className="absolute inset-0 shapes-geometric-bg"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
            <div className="relative inline-block mb-8">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-ocean-blue geometric-square"></div>
              <h1 className="text-5xl lg:text-7xl font-black text-ocean-navy">
                {t('fleet.title')}
                <span className="text-ocean-blue"> {t('fleet.title_accent')}</span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('fleet.subtitle')}
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white border-b relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="flex flex-wrap gap-4 items-center justify-center mb-4">
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
              >
                <option value="all">{t('filters.all_locations')}</option>
                <option value="monopoli">{t('location.monopoli')}</option>
                <option value="polignano">{t('location.polignano')}</option>
                <option value="leuca">{t('location.leuca')}</option>
                <option value="gallipoli">{t('location.gallipoli')}</option>
              </select>
              <select
                value={selectedCapacity}
                onChange={e => setSelectedCapacity(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
              >
                <option value="all">{t('filters.capacity')}</option>
                <option value="1-6">1-6 {t('contact.guests').toLowerCase()}</option>
                <option value="7-10">7-10 {t('contact.guests').toLowerCase()}</option>
                <option value="11+">11+ {t('contact.guests').toLowerCase()}</option>
              </select>
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
              >
                <option value="all">Tipo Yacht</option>
                <option value="motor">{t('yacht.motor')}</option>
                <option value="sailing">{t('yacht.sailing')}</option>
                <option value="catamaran">{t('yacht.catamaran')}</option>
                <option value="gozzo">{t('yacht.gozzo')}</option>
              </select>
            </div>
            <div className="mt-4 text-center">
              <span className="text-gray-600">
                {filteredYachts.length} {t('filters.results')}
              </span>
            </div>
          </div>
        </section>

        {/* Fleet Grid */}
        <section className="py-20 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            {filteredYachts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredYachts.map((yacht) => (
                  <YachtCard key={yacht.id} yacht={yacht} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  <span className="text-ocean-navy font-bold z-[100]">{t('filters.no_results')}</span>
                </h3>
                <p className="text-gray-600 mb-8">
                  {t('filters.modify_filters')}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white/70 backdrop-blur-md rounded-3xl py-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="text-ocean-navy font-bold z-[100]">{t('fleet.not_found_title')}</span>
            </h2>
            <p className="text-xl mb-8">
              <span className="text-ocean-navy z-[100]">{t('fleet.not_found_subtitle')}</span>
            </p>
            <a
              href="/contacts"
              className="inline-block bg-white text-ocean-blue px-8 py-3 rounded-full font-semibold hover:bg-ocean-light transition-colors"
            >
              {t('fleet.request_quote')}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}