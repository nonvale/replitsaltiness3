import GeometricShapes from "@/components/geometric-shapes";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Services() {
  const { t } = useLanguage();
  const services = [
    { id: "charter_personalized", icon: "fas fa-star" },
    { id: "catering", icon: "fas fa-utensils" },
    { id: "water_activities", icon: "fas fa-swimmer" },
    { id: "transfer", icon: "fas fa-shuttle-van" },
    { id: "special_events", icon: "fas fa-glass-cheers" },
    { id: "assistance", icon: "fas fa-headset" }
  ];

  return (
    <>
      <div className="min-h-screen bg-white">

        <GeometricShapes />

        {/* Hero Section */}
  <section className="py-20 bg-gradient-ocean-light relative overflow-hidden z-10 pt-20">
          <div className="absolute inset-0 shapes-geometric-bg"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
            <div className="relative inline-block mb-8">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-ocean-blue geometric-square"></div>
              <h1 className="text-5xl lg:text-7xl font-black text-ocean-navy">
                {t('services.title')}
                <span className="text-ocean-blue"> {t('services.title_accent')}</span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('services.page_subtitle')}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white relative z-10 page-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 shapes-card-hover">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-ocean-blue rounded-2xl flex items-center justify-center mb-4">
                      <i className={`${service.icon} text-white text-2xl`}></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-ocean-cyan opacity-30 geometric-circle"></div>
                  </div>
                  <h3 className="text-xl font-bold text-ocean-navy mb-4">{t(`services.${service.id.replace(/-/g, '_')}.title`)}</h3>
                  <p className="text-gray-600 mb-6">{t(`services.${service.id.replace(/-/g, '_')}.description`)}</p>
                  <ul className="space-y-2 mb-6">
                    {[0,1,2,3].map((featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <i className="fas fa-check text-ocean-blue mr-2"></i>
                        {t(`services.${service.id.replace(/-/g, '_')}.features.${featureIndex}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-ocean-blue text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t('contact.title')} {t('contact.title_accent')}
            </h2>
            <p className="text-xl mb-8 text-ocean-light">
              {t('contact.subtitle')}
            </p>
            <a
              href="/contacts"
              className="inline-block bg-white text-ocean-blue px-8 py-3 rounded-full font-semibold hover:bg-ocean-light transition-colors"
            >
              {t('nav.contacts')}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}