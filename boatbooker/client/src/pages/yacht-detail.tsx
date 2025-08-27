import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Yacht } from "@shared/schema";
import { useLanguage } from "@/contexts/language-context";
import GeometricShapes from "@/components/geometric-shapes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function YachtDetail() {
  const { t } = useLanguage();
  const { yachtId } = useParams();

  const { data: yacht } = useQuery<Yacht>({
    queryKey: [`/api/yachts/${yachtId}`],
    enabled: !!yachtId,
  });

  if (!yacht) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-ocean-navy mb-4 z-[100]">
            {t('filters.no_results')}
          </h2>
          <Button onClick={() => window.history.back()}>
            {t('nav.fleet')}
          </Button>
        </div>
      </div>
    );
  }

  const { language } = useLanguage();
  // Visualizzazione statica: mostra sempre i dati originali in italiano, testo fisso in inglese
  return (
    <>
      <div className="relative">
        <GeometricShapes />

        {/* Hero Section with Yacht Images */}
        <section className="py-20 bg-gradient-ocean-light relative overflow-hidden z-10 hero-section">
          <div className="absolute inset-0 shapes-geometric-bg"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">
                  {t(`yacht.${yacht.type.toLowerCase().replace(' ', '_')}`)}
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-black text-ocean-navy mb-6">
                  {yacht.name}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  {language === 'en'
                    ? 'Contact us for details and features in English.'
                    : yacht.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ocean-blue">
                      {yacht.capacity}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('yacht.guests')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ocean-blue">
                      {yacht.length}m
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('yacht.length')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ocean-blue">
                      {yacht.cabins}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t('yacht.cabins')}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-3xl font-bold text-ocean-navy">
                    €{yacht.pricePerDay.toLocaleString()}
                    <span className="text-lg text-gray-600 ml-2">
                      {t('yacht.per_day')}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    size="lg"
                    onClick={() => window.location.href = `/booking/${yacht.id}`}
                  >
                    {t('yacht.book')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => window.open('/contacts', '_blank')}
                  >
                    {t('nav.contacts')}
                  </Button>
                </div>
              </div>

              <div>
                <img
                  src={yacht.images[0]}
                  alt={yacht.name}
                  className="w-full h-96 object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-ocean-navy mb-6">
                {t('booking.features_included')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {language === 'en'
                ? (
                  <div className="text-center text-gray-500">Features available on request.</div>
                ) : (
                  yacht.features.map((feature, index) => (
                    <Card key={index}>
                      <CardContent className="p-6 text-center">
                        <CardTitle className="text-lg mb-2">{feature}</CardTitle>
                      </CardContent>
                    </Card>
                  ))
                )}
            </div>
          </div>
        </section>

        {/* Image Gallery */}
        {yacht.images.length > 1 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-ocean-navy mb-6">
                  {t('nav.gallery')}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {yacht.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${yacht.name} ${index + 2}`}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}