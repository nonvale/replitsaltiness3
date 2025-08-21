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
    // Initialize destinations
    const destinations: Destination[] = [
      {
        id: "monopoli",
        name: "Monopoli",
        description: "Porto storico e acque cristalline della costa adriatica",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=800&h=600",
        coordinates: { lat: 40.9536, lng: 17.3036 },
        yachtCount: 4
      },
      {
        id: "polignano",
        name: "Polignano a Mare",
        description: "Grotte marine spettacolari e scogliere a picco sul mare",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&w=800&h=600",
        coordinates: { lat: 40.9979, lng: 17.2188 },
        yachtCount: 3
      },
      {
        id: "leuca",
        name: "Santa Maria di Leuca",
        description: "Il faro storico dove si incontrano l'Adriatico e lo Ionio",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&w=800&h=600",
        coordinates: { lat: 39.7947, lng: 18.3581 },
        yachtCount: 3
      },
      {
        id: "gallipoli",
        name: "Gallipoli",
        description: "Città antica circondata dalle acque cristalline del Mar Ionio",
        image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&w=800&h=600",
        coordinates: { lat: 40.0559, lng: 17.9925 },
        yachtCount: 1
      }
    ];

    destinations.forEach(dest => this.destinations.set(dest.id, dest));

    // Initialize yachts with real data from competitors
    const yachts: Yacht[] = [
      // Monopoli Fleet
      {
        id: randomUUID(),
        name: "SunSeeker 68S",
        type: "motor",
        location: "monopoli",
        capacity: 12,
        length: "21.00",
        cabins: 3,
        pricePerDay: "5500.00",
        images: [
          "https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-4.0.3&w=800&h=600",
          "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&w=800&h=600"
        ],
        features: ["Flybridge", "Air Conditioning", "WiFi", "Sound System", "Water Toys", "Crew"],
        description: "Luxury motor yacht perfetta per charter esclusivi lungo la costa pugliese. Dotata di ogni comfort per un'esperienza indimenticabile.",
        available: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "SunSeeker 53 Portofino",
        type: "motor",
        location: "monopoli",
        capacity: 10,
        length: "16.00",
        cabins: 2,
        pricePerDay: "2500.00",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&w=800&h=600",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=800&h=600"
        ],
        features: ["Flybridge", "Air Conditioning", "Sound System", "Swimming Platform"],
        description: "Elegante motor yacht ideale per giornate in famiglia o con amici, con tutto il comfort SunSeeker.",
        available: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Cranchi Z35",
        type: "motor",
        location: "monopoli",
        capacity: 8,
        length: "11.70",
        cabins: 1,
        pricePerDay: "1500.00",
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=800&h=600"
        ],
        features: ["Sport Cruiser", "Swimming Platform", "Sound System", "Refrigerator"],
        description: "Sport cruiser dinamico e veloce, perfetto per esplorare la costa in libertà.",
        available: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Jeanneau Prestige 42 Fly",
        type: "motor",
        location: "monopoli",
        capacity: 10,
        length: "13.86",
        cabins: 2,
        pricePerDay: "2500.00",
        images: [
          "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&w=800&h=600"
        ],
        features: ["Flybridge", "Air Conditioning", "Large Cockpit", "Modern Interior"],
        description: "Motor yacht moderno con flybridge spazioso, ideale per charter di lusso.",
        available: true,
        createdAt: new Date()
      },

      // Polignano Fleet
      {
        id: randomUUID(),
        name: "Aventura 34 Catamarano",
        type: "catamaran",
        location: "polignano",
        capacity: 10,
        length: "10.00",
        cabins: 2,
        pricePerDay: "2800.00",
        images: [
          "https://pixabay.com/get/gc2ac4516576ec5670d77b7ede3102aa8a08a714c8d2c4374cc85e4c421c76f9cbc75a1cdec34286422cb0c2ba6370f68a4a4e3aac8fa00e4302fcb4add632a09_1280.jpg"
        ],
        features: ["Stability", "Large Deck", "Shallow Draft", "Family Friendly"],
        description: "Catamarano stabile e spazioso, perfetto per famiglie e gruppi che amano il comfort.",
        available: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Abacus 62",
        type: "motor",
        location: "polignano",
        capacity: 12,
        length: "19.00",
        cabins: 4,
        pricePerDay: "5500.00",
        images: [
          "https://pixabay.com/get/g26483f24dfa27759dc869d83a416f3b09dd599ef12ff110722daa8bc1b5695c9385d7552a7f9069e06f4be2dc1d6796b8f25a7b031745c7b1af75361820fa9d8_1280.jpg"
        ],
        features: ["Flybridge", "Luxury Interior", "Large Cockpit", "Navigation Equipment"],
        description: "Motor yacht di lusso per charter esclusivi lungo la costa pugliese.",
        available: true,
        createdAt: new Date()
      },
      // Oceanis 351 - Monopoli
      {
        id: randomUUID(),
        name: "Oceanis 351",
        type: "sailing",
        location: "monopoli",
        capacity: 8,
        length: "10.32",
        cabins: 3,
        pricePerDay: "",
        images: [
          "https://www.beneteau.com/sites/default/files/public/medias/images/Oceanis351_1.jpg",
          "https://www.beneteau.com/sites/default/files/public/medias/images/Oceanis351_2.jpg"
        ],
        features: ["Timone a ruota", "GPS", "VHF", "Cucina", "Bagno", "Doccia", "Vele", "Ampio pozzetto"],
        description: "Barca a vela ideale per crociere in famiglia o tra amici, comfort e prestazioni ottimali. Partenza da Monopoli.",
        available: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Gozzo Mimi 9.5",
        type: "gozzo",
        location: "polignano",
        capacity: 8,
        length: "9.50",
        cabins: 0,
        pricePerDay: "1200.00",
        images: [
          "https://pixabay.com/get/gc74500096da78b799736439ee510ef41b3866659ed485c106cac616db8c4681799a9d2abce8c2d4fb39617ed07223771d637fe04a8f49993bfe19ba853871bcf_1280.jpg"
        ],
        features: ["Traditional Design", "Comfortable Seating", "Sun Awning", "Local Style"],
        description: "Gozzo tradizionale per vivere l'autentica esperienza del mare pugliese.",
        available: true,
        createdAt: new Date()
      },

      // Santa Maria di Leuca Fleet
      {
        id: randomUUID(),
        name: "Mano Marine 38",
        type: "motor",
        location: "leuca",
        capacity: 10,
        length: "11.50",
        cabins: 2,
        pricePerDay: "2200.00",
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&w=800&h=600"
        ],
        features: ["Open Deck", "Swimming Platform", "Refrigerator", "Sound System"],
        description: "Motor yacht versatile per esplorare le acque del punto più a sud della Puglia.",
        available: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Pershing 46",
        type: "motor",
        location: "leuca",
        capacity: 10,
        length: "14.00",
        cabins: 2,
        pricePerDay: "4500.00",
        images: [
          "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&w=800&h=600"
        ],
        features: ["High Performance", "Luxury Interior", "Air Conditioning", "Premium Finish"],
        description: "Sport yacht ad alte performance per chi cerca velocità e lusso.",
        available: true,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        name: "Rizzardi Incredibile 45",
        type: "motor",
        location: "leuca",
        capacity: 12,
        length: "13.50",
        cabins: 2,
        pricePerDay: "3800.00",
        images: [
          "https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-4.0.3&w=800&h=600"
        ],
        features: ["Sport Design", "Large Cockpit", "High Speed", "Modern Equipment"],
        description: "Yacht sportivo dalle prestazioni incredibili per charter dinamici.",
        available: true,
        createdAt: new Date()
      },

      // Gallipoli Fleet
      {
        id: randomUUID(),
        name: "Sarnico 43",
        type: "motor",
        location: "gallipoli",
        capacity: 10,
        length: "13.00",
        cabins: 2,
        pricePerDay: "2800.00",
        images: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&w=800&h=600"
        ],
        features: ["Elegant Design", "Comfortable Interior", "Swimming Platform", "Sound System"],
        description: "Motor yacht elegante per esplorare la costa ionica di Gallipoli.",
        available: true,
        createdAt: new Date()
      }
    ];

    yachts.forEach(yacht => this.yachts.set(yacht.id, yacht));

    // Initialize some reviews
    const reviews: Review[] = [
      {
        id: randomUUID(),
        yachtId: yachts[0].id,
        customerName: "Melaniya",
        rating: 5,
        comment: "Experiencing Puglia from the source and one of the best things you could do if you are visiting this side of Italy. If you need to tailor it in anyway you want Nicolò is your guy.",
        date: new Date("2025-06-08"),
        verified: true
      },
      {
        id: randomUUID(),
        yachtId: yachts[6].id,
        customerName: "B B",
        rating: 5,
        comment: "Beautiful boat, Gozzo Seesee. Great hosts, accommodating to children and knowledgeable, thank you for a lovely tour!",
        date: new Date("2025-06-14"),
        verified: true
      },
      {
        id: randomUUID(),
        yachtId: yachts[2].id,
        customerName: "Alex Hewitt",
        rating: 5,
        comment: "Nico arranged a great boat trip for us from Polignano a Mare to Monopoli and back, with stops to swim, snorkel, and paddleboard along the way. Highly recommend",
        date: new Date("2024-09-13"),
        verified: true
      },
      {
        id: randomUUID(),
        yachtId: yachts[2].id,
        customerName: "Antonio Altobello",
        rating: 5,
        comment: "Abbiamo fatto un bellissimo tour, siamo soddisfatti al 100%. Splendidi ragazzi. Lo consigliamo vivamente",
        date: new Date("2024-08-18"),
        verified: true
      },
      {
        id: randomUUID(),
        yachtId: yachts[1].id,
        customerName: "Elena Constantinescu",
        rating: 5,
        comment: "Great vacation! Definitely recommend! The crew was professional and the yacht was in perfect condition.",
        date: new Date("2024-10-14"),
        verified: true
      },
      {
        id: randomUUID(),
        yachtId: yachts[3].id,
        customerName: "Daniele Recchia",
        rating: 5,
        comment: "Ottima esperienza, personale qualificato e attento alle esigenze del cliente. Paesaggi mozzafiato!",
        date: new Date("2024-09-15"),
        verified: true
      }
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
    const yacht: Yacht = { ...insertYacht, id, createdAt: new Date() };
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
      createdAt: new Date() 
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
      verified: false 
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
