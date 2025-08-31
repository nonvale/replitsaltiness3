import { useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Yacht } from "@shared/schema";
import { useLanguage } from "@/contexts/language-context";
import GeometricShapes from "@/components/geometric-shapes";
import BookingForm from "@/components/booking-form";
import { Helmet } from "react-helmet-async";

export default function Booking() {
  const { t } = useLanguage();
  const { yachtId } = useParams();

  const { data: yacht, isLoading, error } = useQuery<Yacht>({
    queryKey: ["/api/yachts", yachtId],
    enabled: !!yachtId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ocean-blue"></div>
      </div>
    );
  }

  if (error || !yacht) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ocean-navy mb-4">{t('booking.yacht_not_found_title')}</h1>
          <p className="text-gray-600">{t('booking.yacht_not_found_description')}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <Helmet>
          <title>{t('booking.title')} {t('booking.title_accent')} - Puglia Boat Tour</title>
          <meta name="description" content={t('booking.subtitle')} />
        </Helmet>

        <div className="relative">
          <GeometricShapes />

          {/* Hero Section */}
          <section className="py-20 bg-gradient-ocean-light relative overflow-hidden z-10 hero-section pt-20">
            <div className="absolute inset-0 shapes-geometric-bg"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
              <div className="relative inline-block mb-8">
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-ocean-blue geometric-square"></div>
                <h1 className="text-5xl lg:text-7xl font-black text-ocean-navy">
                  {t('booking.title')}
                  <span className="text-ocean-blue"> {t('booking.title_accent')}</span>
                </h1>
              </div>

              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                {t('booking.subtitle')}
              </p>
            </div>
          </section>

          {/* Booking Form Section */}
          <section className="py-20 bg-white relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Yacht Details */}
                <div className="space-y-6">
                  <div className="relative rounded-3xl overflow-hidden">
                    <img
                      src={yacht.images[0]}
                      alt={yacht.name}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-ocean-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      {yacht.location.charAt(0).toUpperCase() + yacht.location.slice(1)}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-ocean-navy mb-2">{yacht.name}</h2>
                    <p className="text-gray-600 mb-4">{yacht.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ocean-navy">{yacht.capacity}</div>
                        <div className="text-sm text-gray-500">{t('booking.guests')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ocean-navy">{yacht.length}m</div>
                        <div className="text-sm text-gray-500">{t('booking.length')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ocean-navy">{yacht.cabins || 0}</div>
                        <div className="text-sm text-gray-500">{t('booking.cabins')}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-ocean-navy">{t('booking.features_included')}</h4>
                      <div className="flex flex-wrap gap-2">
                        {yacht.features.map((feature, index) => (
                          <span key={index} className="bg-ocean-light text-ocean-navy px-3 py-1 rounded-full text-sm">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* prezzo rimosso su richiesta */}
                  </div>
                </div>

                {/* Booking Form */}
                <div className="relative z-10">
                  <BookingForm yacht={yacht} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}