import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Yacht routes
  app.get("/api/yachts", async (req, res) => {
    try {
      const { location } = req.query;
      const yachts = location 
        ? await storage.getYachtsByLocation(location as string)
        : await storage.getYachts();
      res.json(yachts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch yachts" });
    }
  });

  app.get("/api/yachts/:id", async (req, res) => {
    try {
      const yacht = await storage.getYacht(req.params.id);
      if (!yacht) {
        return res.status(404).json({ error: "Yacht not found" });
      }
      res.json(yacht);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch yacht" });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid booking data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const booking = await storage.updateBookingStatus(req.params.id, status);
      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: "Failed to update booking status" });
    }
  });

  // Review routes
  app.get("/api/reviews", async (req, res) => {
    try {
      const { yachtId } = req.query;
      const reviews = yachtId 
        ? await storage.getReviewsByYacht(yachtId as string)
        : await storage.getReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid review data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create review" });
    }
  });

  // Destination routes
  app.get("/api/destinations", async (req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.getDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destination" });
    }
  });

  // Contact/WhatsApp webhook (for form submissions)
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message, date, guests, destination } = req.body;
      
      // Here you would typically send email notification or integrate with WhatsApp Business API
      // For now, we'll just log the contact request
      console.log("Contact request received:", {
        name,
        email,
        phone,
        message,
        date,
        guests,
        destination,
        timestamp: new Date()
      });

      res.status(200).json({ 
        success: true, 
        message: "Richiesta ricevuta con successo. Ti contatteremo presto!" 
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to process contact request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
