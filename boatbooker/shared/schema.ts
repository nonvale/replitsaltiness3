import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const yachts = pgTable("yachts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // "motor", "sailing", "catamaran", "gozzo"
  location: text("location").notNull(), // "monopoli", "polignano", "leuca", "gallipoli"
  capacity: integer("capacity").notNull(),
  length: decimal("length", { precision: 5, scale: 2 }).notNull(),
  cabins: integer("cabins"),
  pricePerDay: decimal("price_per_day", { precision: 10, scale: 2 }).notNull(),
  images: text("images").array().notNull(),
  features: text("features").array().notNull(),
  description: text("description").notNull(),
  description_en: text("description_en"),
  available: boolean("available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  yachtId: varchar("yacht_id").references(() => yachts.id).notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  guests: integer("guests").notNull(),
  message: text("message"),
  status: text("status").default("pending"), // "pending", "confirmed", "cancelled"
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  yachtId: varchar("yacht_id").references(() => yachts.id),
  customerName: text("customer_name").notNull(),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment").notNull(),
  date: timestamp("date").defaultNow(),
  verified: boolean("verified").default(false),
});

export const destinations = pgTable("destinations", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  coordinates: jsonb("coordinates").notNull(), // {lat: number, lng: number}
  yachtCount: integer("yacht_count").default(0),
});

export const insertYachtSchema = createInsertSchema(yachts).omit({
  id: true,
  createdAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  date: true,
  verified: true,
});

export type InsertYacht = z.infer<typeof insertYachtSchema>;
export type Yacht = typeof yachts.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;
export type Destination = typeof destinations.$inferSelect;
