import { useQuery } from "@tanstack/react-query";
import type { Destination } from "@shared/schema";
import { useLanguage } from "@/contexts/language-context";
import GeometricShapes from "@/components/geometric-shapes";
import { Helmet } from "react-helmet-async";

import DestinationCard from "@/components/destination-card";

export default function Destinations() {
  const { t } = useLanguage();
  const { data: destinations = [] } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  return (
    <>
      <Helmet>
        <title>{t('seo.destinations_title')}</title>
        <meta name="description" content={t('seo.destinations_description')} />
      </Helmet>

      <div className="relative">
        <GeometricShapes />

        {/* Hero Section */}
  <section className="py-20 bg-gradient-ocean-light relative overflow-hidden z-10 pt-20">
          <div className="absolute inset-0 shapes-geometric-bg"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
            <div className="relative inline-block mb-8">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-ocean-blue geometric-square"></div>
              <h1 className="text-5xl lg:text-7xl font-black text-ocean-navy">
                {t('destinations.title')}
                <span className="text-ocean-blue"> {t('destinations.title_accent')}</span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('destinations.subtitle')}
            </p>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-16 bg-white relative z-10 page-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
              {destinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>

            {/* Additional Content */}
            <div className="mt-20 text-center">
              <div className="bg-gradient-to-r from-ocean-light to-ocean-cyan/20 rounded-3xl p-12">
                <h2 className="text-3xl font-bold text-ocean-navy mb-6">
                  {t('destinations.page_title')}
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-3xl mx-auto">
                  {t('destinations.page_subtitle')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-ocean-blue rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-compass text-white text-2xl"></i>
                    </div>
                    <h3 className="font-bold text-ocean-navy mb-2">{t('destinations.custom_itineraries')}</h3>
                    <p className="text-gray-600 text-sm">{t('destinations.custom_itineraries_desc')}</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-ocean-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-anchor text-white text-2xl"></i>
                    </div>
                    <h3 className="font-bold text-ocean-navy mb-2">{t('destinations.exclusive_ports')}</h3>
                    <p className="text-gray-600 text-sm">{t('destinations.exclusive_ports_desc')}</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-binoculars text-white text-2xl"></i>
                    </div>
                    <h3 className="font-bold text-ocean-navy mb-2">{t('destinations.local_guides')}</h3>
                    <p className="text-gray-600 text-sm">{t('destinations.local_guides_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}