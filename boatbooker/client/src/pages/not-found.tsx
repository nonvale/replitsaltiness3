import { Link } from "wouter";
import GeometricShapes from "@/components/geometric-shapes";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('seo.not_found_title')}</title>
        <meta name="description" content={t('seo.not_found_description')} />
      </Helmet>

      <div className="relative">
        <GeometricShapes />

        <section className="min-h-screen flex items-center justify-center bg-gradient-ocean-light relative overflow-hidden z-10">
          <div className="absolute inset-0 shapes-geometric-bg"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
            <div className="relative inline-block mb-8">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-ocean-blue geometric-square"></div>
              <h1 className="text-6xl lg:text-8xl font-black text-ocean-navy mb-6">
                404
              </h1>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-ocean-navy mb-6">
              Pagina non trovata
            </h2>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              La pagina che stai cercando non esiste o è stata spostata.
              Torna alla homepage per continuare la tua navigazione.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => window.location.href = '/'}
              >
                {t('nav.home')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/fleet'}
              >
                {t('nav.fleet')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.href = '/contacts'}
              >
                {t('nav.contacts')}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}