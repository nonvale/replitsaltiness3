import { type Yacht, type InsertYacht, type Booking, type InsertBooking, type Review, type InsertReview, type Destination } from "@shared/schema";

// UUID v4 generator compatibile con tutti gli ambienti Node.js
function randomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export interface IStorage {
  // Yacht operations
  getYachts(): Promise<Yacht[]>;
  getYachtsByLocation(location: string): Promise<Yacht[]>;
  getYacht(id: string): Promise<Yacht | undefined>;
  createYacht(yacht: InsertYacht): Promise<Yacht>;
  
  // Booking operations
  getBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
  
  // Review operations
  getReviews(): Promise<Review[]>;
  getReviewsByYacht(yachtId: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Destination operations
  getDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
}

export class MemStorage implements IStorage {
  private yachts: Map<string, Yacht>;
  private bookings: Map<string, Booking>;
  private reviews: Map<string, Review>;
  private destinations: Map<string, Destination>;

  constructor() {
    this.yachts = new Map();
    this.bookings = new Map();
    this.reviews = new Map();
    this.destinations = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Immagini locali per le destinazioni
    const destinations: Destination[] = [
      {
        id: "monopoli",
        name: "Monopoli",
        description: "Porto storico e acque cristalline della costa adriatica",
        image: "/attached_assets/monopoli.jpg",
        coordinates: { lat: 40.9536, lng: 17.3036 },
        yachtCount: 4
      },
      {
        id: "polignano",
        name: "Polignano a Mare",
        description: "Grotte marine spettacolari e scogliere a picco sul mare",
        image: "/attached_assets/polignano.jpg",
        coordinates: { lat: 40.9979, lng: 17.2188 },
        yachtCount: 3
      },
      {
        id: "leuca",
        name: "Santa Maria di Leuca",
        description: "Il faro storico dove si incontrano l'Adriatico e lo Ionio",
        image: "/attached_assets/leuca.jpg",
        coordinates: { lat: 39.7947, lng: 18.3581 },
        yachtCount: 3
      },
      {
        id: "gallipoli",
        name: "Gallipoli",
        description: "Città antica circondata dalle acque cristalline del Mar Ionio",
        image: "/attached_assets/gallipoli.jpg",
        coordinates: { lat: 40.0559, lng: 17.9925 },
        yachtCount: 1
      }
    ];

    destinations.forEach(dest => this.destinations.set(dest.id, dest));

  // Mappa immagini per nome barca
  const yachtImages: Record<string, string[]> = {
        "Abacus 62": [
          "/attached_assets/abacus.jpg",
          "/attached_assets/abacus2.jpg",
          "/attached_assets/abacus3.jpg",
          "/attached_assets/abacus4.jpg",
          "/attached_assets/abacus5.jpg"
        ],
        "Gozzo Mimi 9.5": [
          "/attached_assets/IMG-20250607-WA0027.jpg",
          "/attached_assets/IMG-20250607-WA0028.jpg",
          "/attached_assets/IMG-20250607-WA0029.jpg",
          "/attached_assets/IMG-20250607-WA0030.jpg",
          "/attached_assets/IMG-20250607-WA0031.jpg",
          "/attached_assets/IMG-20250607-WA0032.jpg"
        ],
        "Gozzo Seesee": [
          "/attached_assets/IMG-20250607-WA0027.jpg",
          "/attached_assets/IMG-20250607-WA0028.jpg",
          "/attached_assets/IMG-20250607-WA0029.jpg",
          "/attached_assets/IMG-20250607-WA0030.jpg",
          "/attached_assets/IMG-20250607-WA0031.jpg",
          "/attached_assets/IMG-20250607-WA0032.jpg"
        ],
        "SunSeeker 68S": [
          "/attached_assets/sunseeker1.jpg",
          "/attached_assets/sunseeker2.jpg",
          "/attached_assets/sunseeker3.jpg",
          "/attached_assets/sunseeker4.jpg",
          "/attached_assets/sunseeker5.jpg",
          "/attached_assets/sunseeker6.jpg",
          "/attached_assets/sunseeker7.jpg",
          "/attached_assets/sunseeker8.jpg",
          "/attached_assets/sunseeker9.jpg",
          "/attached_assets/sunseeker10.jpg"
        ],
        "SunSeeker 53 Portofino": [
          "/attached_assets/sunseeker531.jpg",
          "/attached_assets/sunseeker532.jpg",
          "/attached_assets/sunseeker533.jpg",
          "/attached_assets/sunseeker534.jpg",
          "/attached_assets/sunseeker535.jpg",
          "/attached_assets/sunseeker536.jpg",
          "/attached_assets/sunseeker5312.jpg",
          "/attached_assets/sunseeker5313.jpg"
        ],
        "Pershing 46": [
          "/attached_assets/pershing1.jpg",
          "/attached_assets/pershing2.jpg",
          "/attached_assets/pershing3.jpg",
          "/attached_assets/pershing4.jpg"
        ],
        "Sarnico 43": [
          "/attached_assets/sarnico1.jpg",
          "/attached_assets/sarnico2.jpg",
          "/attached_assets/sarnico3.jpg",
          "/attached_assets/sarnico4.jpg"
        ],
        "Oceanis 351": [
          "/attached_assets/freetime.jpg"
        ]
      };


    // Helper per generare uno slug id statico dal nome barca
    function slugify(name: string) {
      return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }

    const yachts: Yacht[] = [
      {
        id: slugify("SunSeeker 68S"),
        name: "SunSeeker 68S",
        type: "motor",
        location: "monopoli",
        capacity: 12,
        length: "21.00",
        cabins: 4,
        pricePerDay: "",
        images: yachtImages["SunSeeker 68S"] ?? [],
        features: ["Luxury", "Flybridge", "Spacious Deck", "Premium Sound"],
        description: "Yacht di lusso con ampi spazi e comfort per crociere indimenticabili.",
        description_en: "Luxury yacht with large spaces and comfort for unforgettable cruises.",
        available: true,
        createdAt: new Date(),
      },
      {
        id: slugify("SunSeeker 53 Portofino"),
        name: "SunSeeker 53 Portofino",
        type: "motor",
        location: "monopoli",
        capacity: 10,
        length: "16.00",
        cabins: 3,
        pricePerDay: "",
        images: yachtImages["SunSeeker 53 Portofino"] ?? [],
        features: ["Elegance", "Comfort", "Large Cockpit", "Modern Equipment"],
        description: "Yacht elegante e confortevole per esplorare la costa pugliese.",
        description_en: "Elegant and comfortable yacht to explore the Apulian coast.",
        available: true,
        createdAt: new Date(),
      },
      {
        id: slugify("Cranchi Z35"),
        name: "Cranchi Z35",
        type: "motor",
        location: "monopoli",
        capacity: 8,
        length: "11.70",
        cabins: 1,
        pricePerDay: "",
        images: [],
        features: ["Sport Cruiser", "Swimming Platform", "Sound System", "Refrigerator"],
        description: "Sport cruiser dinamico e veloce, perfetto per esplorare la costa in libertà.",
        description_en: "Dynamic and fast sport cruiser, perfect for exploring the coast in freedom.",
        available: true,
        createdAt: new Date(),
      },
      {
        id: slugify("Jeanneau Prestige 42 Fly"),
        name: "Jeanneau Prestige 42 Fly",
        type: "motor",
        location: "monopoli",
        capacity: 10,
        length: "13.86",
        cabins: 2,
        pricePerDay: "",
        images: [],
        features: ["Flybridge", "Air Conditioning", "Large Cockpit", "Modern Interior"],
        description: "Motor yacht moderno con flybridge spazioso, ideale per charter di lusso.",
        description_en: "Modern motor yacht with spacious flybridge, ideal for luxury charters.",
        available: true,
        createdAt: new Date(),
      },
      {
        id: slugify("Aventura 34 Catamarano"),
        name: "Aventura 34 Catamarano",
        type: "catamaran",
        location: "polignano",
        capacity: 10,
        length: "10.00",
        cabins: 2,
        pricePerDay: "",
        images: yachtImages["Aventura 34 Catamarano"] ?? [],
        features: ["Stability", "Large Deck", "Shallow Draft", "Family Friendly"],
        description: "Catamarano stabile e spazioso, perfetto per famiglie e gruppi che amano il comfort.",
        description_en: "Stable and spacious catamaran, perfect for families and groups who love comfort.",
        available: true,
        createdAt: new Date(),
      },
      {
        id: slugify("Abacus 62"),
        name: "Abacus 62",
        type: "motor",
        location: "polignano",
        capacity: 12,
        length: "19.00",
        cabins: 4,
        pricePerDay: "",
        images: yachtImages["Abacus 62"] ?? [],
        features: ["Flybridge", "Luxury Interior", "Large Cockpit", "Navigation Equipment"],
        description: "Motor yacht di lusso per charter esclusivi lungo la costa pugliese.",
        description_en: "Luxury motor yacht for exclusive charters along the Apulian coast.",
        available: true,
        createdAt: new Date(),
      },
      {
        id: slugify("Oceanis 351"),
        name: "Oceanis 351",
        type: "sailing",
        location: "monopoli",
        capacity: 8,
        length: "10.32",
        cabins: 3,
        pricePerDay: "",
        images: yachtImages["Oceanis 351"] ?? [],
        features: ["Timone a ruota", "GPS", "VHF", "Cucina", "Bagno", "Doccia", "Vele", "Ampio pozzetto"],
        description: "Barca a vela ideale per crociere in famiglia o tra amici, comfort e prestazioni ottimali. Partenza da Monopoli.",
        description_en: "Sailboat ideal for family or friends cruises, optimal comfort and performance. Departure from Monopoli.",
        available: true,
        createdAt: new Date(),
      },
      {
        id: slugify("Gozzo Mimi 9.5"),
        name: "Gozzo Mimi 9.5",
        type: "gozzo",
        location: "polignano",
        capacity: 8,
        length: "9.50",
        cabins: 0,
        pricePerDay: "",
        images: yachtImages["Gozzo Mimi 9.5"] ?? [],
        features: ["Traditional Design", "Comfortable Seating", "Sun Awning", "Local Style"],
        description: "Gozzo tradizionale per vivere l'autentica esperienza del mare pugliese.",
        description_en: "Traditional gozzo to experience the authentic Apulian sea.",
        available: true,
        createdAt: new Date(),
      },
      {
        id: slugify("Mano Marine 38"),
        name: "Mano Marine 38",
        type: "motor",
        location: "leuca",
        capacity: 10,
        length: "11.50",
        cabins: 2,
        pricePerDay: "",
        images: yachtImages["Mano Marine 38"] ?? [],
        features: ["Open Deck", "Swimming Platform", "Refrigerator", "Sound System"],
        description: "Motor yacht versatile per esplorare le acque del punto più a sud della Puglia.",
        description_en: "Versatile motor yacht to explore the southernmost waters of Apulia.",
        available: true,
        createdAt: new Date(),
      },
      {
        id: slugify("Pershing 46"),
        name: "Pershing 46",
        type: "motor",
        location: "leuca",
        capacity: 10,
        length: "14.00",
        cabins: 2,
        pricePerDay: "",
        images: yachtImages["Pershing 46"] ?? [],
        features: ["High Performance", "Luxury Interior", "Air Conditioning", "Premium Finish"],
        description: "Sport yacht ad alte performance per chi cerca velocità e lusso.",
        description_en: "High performance sport yacht for those seeking speed and luxury.",
        available: true,
        createdAt: new Date(),
      },
      {
        id: slugify("Rizzardi Incredibile 45"),
        name: "Rizzardi Incredibile 45",
        type: "motor",
        location: "leuca",
        capacity: 12,
        length: "13.50",
        cabins: 2,
        pricePerDay: "",
        images: yachtImages["Rizzardi Incredibile 45"] ?? [],
        features: ["Sport Design", "Large Cockpit", "High Speed", "Modern Equipment"],
        description: "Yacht sportivo dalle prestazioni incredibili per charter dinamici.",
        description_en: "Sport yacht with incredible performance for dynamic charters.",
        available: true,
        createdAt: new Date(),
      },
      {
        id: slugify("Sarnico 43"),
        name: "Sarnico 43",
        type: "motor",
        location: "gallipoli",
        capacity: 10,
        length: "13.00",
        cabins: 2,
        pricePerDay: "",
        images: yachtImages["Sarnico 43"] ?? [],
        features: ["Elegant Design", "Comfortable Interior", "Swimming Platform", "Sound System"],
        description: "Motor yacht elegante per esplorare la costa ionica di Gallipoli.",
        description_en: "Elegant motor yacht to explore the Ionian coast of Gallipoli.",
        available: true,
        createdAt: new Date(),
      }
    ];

    // Popola la mappa this.yachts per renderli disponibili alle API
    yachts.forEach(yacht => this.yachts.set(yacht.id, yacht));

    // Inizializza alcune recensioni
    const reviews: Review[] = [
      // Associa le recensioni solo a barche esistenti
      ...(yachts[0] ? [{
        id: randomUUID(),
        yachtId: yachts[0].id,
        customerName: "Melaniya",
        rating: 5,
        comment: "Experiencing Puglia from the source and one of the best things you could do if you are visiting this side of Italy. If you need to tailor it in anyway you want Nicolò is your guy.",
        date: new Date("2024-08-18"),
        verified: true
      }] : []),
      ...(yachts[1] ? [{
        id: randomUUID(),
        yachtId: yachts[1].id,
        customerName: "Elena Constantinescu",
        rating: 5,
        comment: "Great vacation! Definitely recommend! The crew was professional and the yacht was in perfect condition.",
        date: new Date("2024-10-14"),
        verified: true
      }] : []),
      ...(yachts[2] ? [{
        id: randomUUID(),
        yachtId: yachts[2].id,
        customerName: "Daniele Recchia",
        rating: 5,
        comment: "Ottima esperienza, personale qualificato e attento alle esigenze del cliente. Paesaggi mozzafiato!",
        date: new Date("2024-09-15"),
        verified: true
      }] : [])
    ];

    reviews.forEach(review => this.reviews.set(review.id, review));
  }

  async getYachts(): Promise<Yacht[]> {
    return Array.from(this.yachts.values());
  }

  async getYachtsByLocation(location: string): Promise<Yacht[]> {
    return Array.from(this.yachts.values()).filter(yacht => yacht.location === location);
  }

  async getYacht(id: string): Promise<Yacht | undefined> {
    return this.yachts.get(id);
  }

  async createYacht(insertYacht: InsertYacht): Promise<Yacht> {
    const id = randomUUID();
    const yacht: Yacht = {
      ...insertYacht,
      id,
      createdAt: new Date(),
      cabins: insertYacht.cabins ?? null,
      description_en: insertYacht.description_en ?? null,
      available: insertYacht.available ?? null,
    };
    this.yachts.set(id, yacht);
    return yacht;
  }

  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      status: "pending",
      createdAt: new Date(),
      message: insertBooking.message ?? null,
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (booking) {
      booking.status = status;
      this.bookings.set(id, booking);
    }
    return booking;
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getReviewsByYacht(yachtId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.yachtId === yachtId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = { 
      ...insertReview, 
      id, 
      date: new Date(),
      verified: false,
      yachtId: insertReview.yachtId ?? null,
    };
    this.reviews.set(id, review);
    return review;
  }

  async getDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }
}

export const storage = new MemStorage();
