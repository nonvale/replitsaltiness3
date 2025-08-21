import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import GeometricShapes from "@/components/geometric-shapes";
import { CONTACT_INFO } from "@/lib/constants";


export default function Contacts() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    destination: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create WhatsApp message
    const message = `${language === 'it' ? 'Ciao! Vorrei prenotare un charter yacht con i seguenti dettagli' : 'Hello! I would like to book a yacht charter with the following details'}:

${language === 'it' ? 'Nome' : 'Name'}: ${formData.name}
${language === 'it' ? 'Email' : 'Email'}: ${formData.email}
${language === 'it' ? 'Telefono' : 'Phone'}: ${formData.phone}
${language === 'it' ? 'Data preferita' : 'Preferred date'}: ${formData.date}
${language === 'it' ? 'Numero ospiti' : 'Number of guests'}: ${formData.guests}
${language === 'it' ? 'Destinazione' : 'Destination'}: ${formData.destination}
${language === 'it' ? 'Messaggio' : 'Message'}: ${formData.message}`;

    // Open WhatsApp
    window.open(`${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <>
      <div className="relative">
        <GeometricShapes />

        {/* Hero Section */}
        <section className="py-20 bg-gradient-ocean-light relative overflow-hidden z-10 hero-section">
          <div className="absolute inset-0 shapes-geometric-bg"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
            <div className="relative inline-block mb-8">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-ocean-blue geometric-square"></div>
              <h1 className="text-5xl lg:text-7xl font-black text-ocean-navy">
                {t('contact.title')}
                <span className="text-ocean-blue"> {t('contact.title_accent')}</span>
              </h1>
            </div>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="grid lg:grid-cols-2 gap-16">

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-ocean-navy mb-8">
                  {t('contact.page_title')}
                </h2>

                {/* Contact Cards */}
                <div className="space-y-6 mb-12">

                  {/* Phone */}
                  <div className="contact-card bg-gradient-to-r from-ocean-light to-white rounded-2xl p-6 flex items-center space-x-4 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 bg-ocean-blue rounded-xl flex items-center justify-center">
                      <i className="fas fa-phone text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-ocean-navy">{t('contact.phone')}</h3>
                      <a href={`tel:${CONTACT_INFO.phone}`} className="text-gray-600 hover:text-ocean-blue">
                        {CONTACT_INFO.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="contact-card bg-gradient-to-r from-ocean-cyan/20 to-white rounded-2xl p-6 flex items-center space-x-4 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 bg-ocean-cyan rounded-xl flex items-center justify-center">
                      <i className="fas fa-envelope text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-ocean-navy">{t('contact.email')}</h3>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-600 hover:text-ocean-blue">
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="contact-card bg-gradient-to-r from-sand/20 to-white rounded-2xl p-6 flex items-center space-x-4 hover:shadow-lg transition-all">
                    <div className="w-14 h-14 bg-sand rounded-xl flex items-center justify-center">
                      <i className="fas fa-map-marker-alt text-white text-xl"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-ocean-navy">{t('contact.address')}</h3>
                      <p className="text-gray-600">
                        {CONTACT_INFO.address.street}<br />
                        {CONTACT_INFO.address.city}<br />
                        {CONTACT_INFO.address.country}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href={CONTACT_INFO.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <i className="fab fa-whatsapp text-xl"></i>
                    <span>{t('contact.chat_us')}</span>
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="bg-ocean-blue hover:bg-ocean-navy text-white py-4 px-6 rounded-full font-semibold transition-colors flex items-center justify-center space-x-2"
                  >
                    <i className="fas fa-phone text-lg"></i>
                    <span>{t('contact.call_now')}</span>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gradient-to-br from-ocean-light to-ocean-cyan/10 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-ocean-navy mb-6">
                  {t('contact.quick_request')}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('contact.name')}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('contact.phone_input')}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('contact.email_input')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('contact.date')}
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('contact.guests')}
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
                      >
                        <option value="">Seleziona...</option>
                        <option value="1-2">1-2 persone</option>
                        <option value="3-6">3-6 persone</option>
                        <option value="7-10">7-10 persone</option>
                        <option value="11+">11+ persone</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('contact.destination_input')}
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-ocean-blue focus:outline-none"
                    >
                      <option value="">Seleziona destinazione...</option>
                      <option value="monopoli">Monopoli</option>
                      <option value="polignano">Polignano a Mare</option>
                      <option value="leuca">Santa Maria di Leuca</option>
                      <option value="gallipoli">Gallipoli</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('contact.message')}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder={t('booking.message_placeholder')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-ocean-blue focus:outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-ocean-blue to-ocean-cyan text-white py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    {t('contact.send_request')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}