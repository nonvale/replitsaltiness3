export const LOCATIONS = [
  {
    id: "all",
    name: "Tutte le Destinazioni",
    displayName: "Tutte",
  },
  {
    id: "monopoli",
    name: "Monopoli",
    displayName: "Monopoli",
    description: "Porto storico con acque cristalline",
    coordinates: { lat: 40.9536, lng: 17.3036 },
  },
  {
    id: "polignano",
    name: "Polignano a Mare", 
    displayName: "Polignano a Mare",
    description: "Grotte spettacolari e scogliere mozzafiato",
    coordinates: { lat: 40.9979, lng: 17.2188 },
  },
  {
    id: "leuca",
    name: "Santa Maria di Leuca",
    displayName: "Santa Maria di Leuca", 
    description: "Il faro dove si incontrano i due mari",
    coordinates: { lat: 39.7947, lng: 18.3581 },
  },
  {
    id: "gallipoli",
    name: "Gallipoli",
    displayName: "Gallipoli",
    description: "Città antica e spiagge dorate del Mar Ionio", 
    coordinates: { lat: 40.0559, lng: 17.9925 },
  },
];

export const YACHT_TYPES = [
  {
    id: "motor",
    name: "Motor Yacht",
    icon: "fas fa-ship",
  },
  {
    id: "sailing", 
    name: "Sailing Yacht",
    icon: "fas fa-sailboat",
  },
  {
    id: "catamaran",
    name: "Catamarano", 
    icon: "fas fa-ship",
  },
  {
    id: "gozzo",
    name: "Gozzo Tradizionale",
    icon: "fas fa-anchor",
  },
];

export const CAPACITY_RANGES = [
  {
    id: "all",
    name: "Tutte le Capacità",
    min: 0,
    max: Infinity,
  },
  {
    id: "1-6",
    name: "1-6 persone",
    min: 1,
    max: 6,
  },
  {
    id: "7-10", 
    name: "7-10 persone",
    min: 7,
    max: 10,
  },
  {
    id: "11+",
    name: "11+ persone", 
    min: 11,
    max: Infinity,
  },
];

export const PRICE_RANGES = [
  {
    id: "all",
    name: "Tutti i Prezzi",
    min: 0,
    max: Infinity,
  },
  {
    id: "1000-2000",
    name: "€1,000 - €2,000",
    min: 1000,
    max: 2000,
  },
  {
    id: "2000-4000",
    name: "€2,000 - €4,000", 
    min: 2000,
    max: 4000,
  },
  {
    id: "4000+",
    name: "€4,000+",
    min: 4000,
    max: Infinity,
  },
];

export const CONTACT_INFO = {
  phone: "+393895194113",
  email: "boat.tour23@gmail.com",
  whatsapp: "https://wa.me/393895194113",
  address: {
    street: "Via Aurelio Sereno 4",
    city: "70043 Monopoli (BA)",
    country: "Italia",
  },
  socialMedia: {
    instagram: "https://www.instagram.com/saltiness_apulian_experience/",
    facebook: "https://www.facebook.com/saltiness.apulianexperience",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJeUmB0qI1RhMRY0KXlePyfjg",
  },
  business: {
    name: "Saltiness - Apulian Experience",
    vatNumber: "08908110722",
  },
};

export const YACHT_FEATURES = [
  "Air Conditioning",
  "WiFi",
  "Sound System", 
  "Swimming Platform",
  "Water Toys",
  "Crew",
  "Flybridge",
  "Large Cockpit",
  "Modern Interior",
  "Navigation Equipment",
  "Refrigerator",
  "Sun Awning",
  "Traditional Design",
  "Comfortable Seating",
  "Local Style",
  "High Performance",
  "Premium Finish",
  "Sport Design",
  "Elegant Design",
  "Stability",
  "Large Deck",
  "Shallow Draft",
  "Family Friendly",
  "Full Sail Equipment",
  "Luxury Interior",
];

export const SERVICES = [
  {
    icon: "fas fa-ship",
    title: "Charter Personalizzato",
    description: "Itinerari su misura per le tue esigenze, dalla cena romantica al tramonto alle avventure in famiglia lungo la costa pugliese.",
    features: ["Itinerari personalizzati", "Skipper professionale", "Flessibilità orari"],
  },
  {
    icon: "fas fa-utensils", 
    title: "Servizio Catering",
    description: "Degusta i sapori autentici della Puglia a bordo con il nostro servizio catering di alta qualità e prodotti locali.",
    features: ["Prodotti locali", "Menu personalizzati", "Servizio a bordo"],
  },
  {
    icon: "fas fa-swimmer",
    title: "Attività Acquatiche", 
    description: "Snorkeling, paddleboard, immersioni guidate e pesca sportiva per vivere il mare in tutte le sue forme.",
    features: ["Attrezzatura inclusa", "Guide esperte", "Per tutti i livelli"],
  },
  {
    icon: "fas fa-route",
    title: "Transfer e Shuttle",
    description: "Servizio transfer da e per aeroporti, hotel e stazioni. Ti portiamo comodamente al punto di imbarco.",
    features: ["Pickup ovunque", "Veicoli confortevoli", "Puntualità garantita"],
  },
  {
    icon: "fas fa-glass-cheers",
    title: "Eventi Speciali",
    description: "Compleanni, anniversari, addii al celibato/nubilato. Organizziamo il tuo evento perfetto in mare.",
    features: ["Decorazioni incluse", "Fotografia/Video", "Servizio completo"],
  },
  {
    icon: "fas fa-headset", 
    title: "Assistenza 24/7",
    description: "Il nostro team è sempre disponibile per qualsiasi necessità durante la tua esperienza in mare.",
    features: ["Supporto continuo", "WhatsApp dedicato", "Emergenze coperte"],
  },
];
