import { useState } from "react";
import LocationFilter from "./location-filter";
import { useLanguage } from "@/contexts/language-context";

export default function HeroSection() {
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const { t } = useLanguage();

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-ocean-light geometric-circle opacity-50 float-animation"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-ocean-cyan opacity-20 geometric-square"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-sand geometric-circle"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="relative z-10">
            <div className="relative">
              {/* Geometric accent */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-ocean-blue geometric-square"></div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-ocean-navy leading-tight">
                {t('hero.title')}
                <span className="text-ocean-blue"> {t('hero.title_accent')}</span>
                <br />{t('hero.title_end')}
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl">{t('hero.subtitle')}</p>
              {/* RIMOSSA SCRITTA SCEGLI LA TUA DESTINAZIONE */}
            </div>

            {/* Location Filter */}
            <LocationFilter
              selectedLocation={selectedLocation}
              onLocationChange={setSelectedLocation}
            />

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/fleet"
                className="bg-ocean-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-ocean-navy transition-colors transform hover:scale-105 text-center"
              >
                {t('hero.discover_fleet')}
              </a>
              <a
                href="https://wa.me/393895194113"
                className="border-2 border-ocean-blue text-ocean-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-ocean-blue hover:text-white transition-colors text-center"
              >
                <i className="fab fa-whatsapp mr-2"></i>{t('hero.whatsapp')}
              </a>
            </div>
          </div>

          {/* Image Side with Shapes Overlay */}
          <div className="relative">
            {/* Main Hero Image (Non-fullscreen as per Shapes style) */}
            <div className="relative bg-ocean-light rounded-3xl overflow-hidden shadow-2xl shapes-card-hover">
              <img
                src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Luxury yacht sailing in Mediterranean waters"
                className="w-full h-96 object-cover"
              />
              
              {/* Overlapping Logo Element (Shapes Signature) */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border-4 border-ocean-blue shapes-overlap">
                <div className="text-center">
                  <div className="text-2xl font-black text-ocean-navy">PUGLIA</div>
                  <div className="text-sm text-ocean-blue font-semibold">BOAT TOUR</div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-sand p-4 rounded-full shadow-lg wave-animation">
              <i className="fas fa-anchor text-ocean-blue text-2xl"></i>
            </div>
            
            <div className="absolute top-1/2 -right-8 bg-ocean-cyan text-white p-3 rounded-full shadow-lg geometric-square float-animation">
              <i className="fas fa-ship text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Pattern */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12">
          <path d="M0,96L48,85.3C96,75,192,53,288,58.7C384,64,480,96,576,112C672,128,768,128,864,117.3C960,107,1056,85,1152,85.3L1200,85.3L1200,120L1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="hsl(199, 89%, 95%)" />
        </svg>
      </div>
    </section>
  );
}
