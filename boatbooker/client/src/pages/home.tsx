import { useState } from "react";
import HeroSection from "@/components/hero-section";
import FleetGrid from "@/components/fleet-grid";
import LocationSelector from "@/components/location-selector";
import DestinationCard from "@/components/destination-card";
import ReviewCard from "@/components/review-card";
import GeometricShapes from "@/components/geometric-shapes";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/language-context";
import type { Yacht, Review, Destination } from "@shared/schema";
import { Helmet } from "react-helmet-async";


export default function Home() {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState("all");

  const { data: yachts = [] } = useQuery<Yacht[]>({
    queryKey: ["/api/yachts"],
  });

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  const { data: destinations = [] } = useQuery<Destination[]>({
    queryKey: ["/api/destinations"],
  });

  const filteredYachts = selectedLocation === "all"
    ? yachts
    : yachts.filter(yacht => yacht.location === selectedLocation);

  const featuredYachts = filteredYachts.slice(0, 6);
  const featuredReviews = reviews.slice(0, 6);

  return (
    <>
      <Helmet>
        <title>{t('seo.home_title')}</title>
        <meta name="description" content={t('seo.home_description')} />
      </Helmet>
  <div className="relative">
        <GeometricShapes />
        <div className="relative z-10">
          <HeroSection />
        </div>
      </div>
      {/* Fleet Section */}
      <section id="flotta" className="py-20 bg-ocean-light relative overflow-hidden z-10">
        <div className="absolute inset-0 shapes-geometric-bg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-ocean-blue geometric-square"></div>
              <h2 className="text-4xl lg:text-6xl font-black text-ocean-navy">
                {t('fleet.title')}
                <span className="text-ocean-blue"> {t('fleet.title_accent')}</span>
              </h2>
            </div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              {t('fleet.subtitle')}
            </p>
          </div>
          <LocationSelector selectedLocation={selectedLocation} onLocationChange={setSelectedLocation} showYachtCount={true} />
          <FleetGrid yachts={featuredYachts} showFilters={false} />
        </div>
      </section>
      {/* Destinations Section */}
      <section id="destinazioni" className="py-20 bg-white relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-ocean-cyan geometric-square"></div>
              <h2 className="text-4xl lg:text-6xl font-black text-ocean-navy">
                DESTINAZIONI
                <span className="text-ocean-blue"> ESCLUSIVE</span>
              </h2>
            </div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Esplora le perle nascoste della costa pugliese, dalle grotte di Polignano alle acque cristalline di Santa Maria di Leuca
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="servizi" className="py-20 bg-gradient-ocean-light relative overflow-hidden z-10">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-ocean-blue opacity-5 geometric-circle transform -translate-y-32"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-ocean-cyan opacity-10 geometric-square translate-y-24"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-ocean-blue geometric-square"></div>
              <h2 className="text-4xl lg:text-6xl font-black text-ocean-navy">
                SERVIZI
                <span className="text-ocean-blue"> PREMIUM</span>
              </h2>
            </div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Ogni dettaglio è curato per offrirti un'esperienza di navigazione senza compromessi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "charter_personalized", icon: "fas fa-star" },
              { id: "catering", icon: "fas fa-utensils" },
              { id: "water_activities", icon: "fas fa-swimmer" },
              { id: "transfer", icon: "fas fa-shuttle-van" },
              { id: "special_events", icon: "fas fa-glass-cheers" },
              { id: "assistance", icon: "fas fa-headset" }
            ].map((service, index) => (
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
      {/* Reviews Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-sand geometric-square"></div>
              <h2 className="text-4xl lg:text-6xl font-black text-ocean-navy">
                COSA DICONO
                <span className="text-ocean-blue"> I CLIENTI</span>
              </h2>
            </div>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Le recensioni autentiche di chi ha vissuto l'esperienza Saltiness
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredReviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <div className="bg-white border-2 border-ocean-light rounded-3xl p-8 inline-block">
              <div className="flex items-center justify-center mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-8 h-8 mr-3" />
                <span className="text-2xl font-bold text-ocean-navy">5.0</span>
                <div className="flex text-yellow-400 ml-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">Basato su 17 recensioni Google</p>
              <a href="https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJeUmB0qI1RhMRY0KXlePyfjg"
                 className="text-ocean-blue font-semibold hover:text-ocean-navy">
                Vedi tutte le recensioni <i className="fas fa-external-link-alt ml-1"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contatti" className="py-20 bg-gradient-ocean text-white relative overflow-hidden z-10">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 geometric-circle transform -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean-cyan opacity-10 geometric-square translate-x-48 translate-y-48"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-sand opacity-20 geometric-square transform -translate-x-16 -translate-y-16"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-sand geometric-square"></div>
              <h2 className="text-4xl lg:text-6xl font-black text-ocean-navy">
                PRENOTA LA TUA
                <span className="text-ocean-navy"> ESPERIENZA</span>
              </h2>
            </div>
            <p className="mt-6 text-xl opacity-90 max-w-3xl mx-auto">
              Siamo pronti a creare la tua avventura perfetta in mare. Contattaci per informazioni e prenotazioni.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                {[
                  { icon: "fas fa-phone", label: "Telefono", value: "+39 389 519 4113", href: "tel:+393895194113", color: "text-ocean-blue-dark" },
                  { icon: "fab fa-whatsapp", label: "WhatsApp", value: "Chatta con noi", href: "https://wa.me/393895194113", color: "text-green-300", bg: "bg-green-500" },
                  { icon: "fas fa-envelope", label: "Email", value: "boat.tour23@gmail.com", href: "mailto:boat.tour23@gmail.com", color: "text-ocean-blue-dark" },
                  { icon: "fas fa-map-marker-alt", label: "Indirizzo", value: "Via Aurelio Sereno 4\n70043 Monopoli (BA)", href: "#", color: "text-white/90" }
                ].map((contact, index) => (
                  <div key={index} className="flex items-center group">
                    <div className={`w-16 h-16 ${contact.bg || 'bg-white/10'} rounded-2xl flex items-center justify-center mr-6 group-hover:bg-white/20 transition-colors`}>
                      <i className={`${contact.icon} text-2xl`}></i>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{contact.label}</div>
                      {contact.href !== "#" ? (
                        <a href={contact.href} className={`${contact.color} hover:text-white text-xl font-bold`}>
                          {contact.value}
                        </a>
                      ) : (
                        <p className={`${contact.color} text-lg whitespace-pre-line`}>
                          {contact.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 space-y-4">
                <a href="https://wa.me/393895194113" className="w-full bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-400 transition-colors flex items-center justify-center">
                  <i className="fab fa-whatsapp mr-3 text-xl"></i>
                  Prenota via WhatsApp
                </a>
                <a href="tel:+393895194113" className="w-full border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-ocean-navy transition-colors flex items-center justify-center">
                  <i className="fas fa-phone mr-3"></i>
                  Chiama Ora
                </a>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
              <h3 className="text-2xl font-bold mb-6">Richiesta Rapida</h3>
              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                alert("Grazie per la tua richiesta! Ti contatteremo presto.");
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Nome</label>
                    <input type="text" className="w-full px-4 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/70 focus:border-white focus:outline-none" placeholder="Il tuo nome" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Telefone</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/70 focus:border-white focus:outline-none" placeholder="+39 xxx xxx xxxx" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/70 focus:border-white focus:outline-none" placeholder="email@esempio.com" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Data</label>
                    <input type="date" className="w-full px-4 py-3 rounded-full bg-white/20 border border-white/30 text-white focus:border-white focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Ospiti</label>
                    <select className="w-full px-4 py-3 rounded-full bg-ocean-cyan/20 border border-ocean-blue text-ocean-navy focus:border-ocean-blue focus:outline-none">
                      <option value="1-4">1-4 persone</option>
                      <option value="5-8">5-8 persone</option>
                      <option value="9-12">9-12 persone</option>
                      <option value="12+">12+ persone</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Destinazione Preferita</label>
                  <select className="w-full px-4 py-3 rounded-full bg-ocean-cyan/20 border border-ocean-blue text-ocean-navy focus:border-ocean-blue focus:outline-none">
                    <option value="monopoli">Monopoli</option>
                    <option value="polignano">Polignano a Mare</option>
                    <option value="leuca">Santa Maria di Leuca</option>
                    <option value="gallipoli">Gallipoli</option>
                    <option value="custom">Tour personalizzato</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Messaggio (Opzionale)</label>
                  <textarea rows={3} className="w-full px-4 py-3 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:border-white focus:outline-none resize-none" placeholder="Raccontaci cosa hai in mente..."></textarea>
                </div>
                <button type="submit" className="w-full bg-ocean-cyan text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-ocean-navy transition-colors">
                  Invia Richiesta
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}