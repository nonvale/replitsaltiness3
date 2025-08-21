# Saltiness - Puglia Boat Charter Platform

## Overview

Saltiness is a full-stack web application for a yacht charter service operating in Puglia, Italy. The platform enables customers to browse available yachts across four coastal destinations (Monopoli, Polignano a Mare, Santa Maria di Leuca, and Gallipoli), view detailed yacht information, and book charter experiences. The application features a modern, responsive design with geometric shapes theming and provides a comprehensive booking management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for home, fleet, and booking
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for consistent, accessible interface elements
- **Styling**: Tailwind CSS with custom CSS variables for ocean-themed color palette and geometric design system
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **Form Handling**: React Hook Form with Zod schema validation for type-safe form processing

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **API Design**: RESTful API endpoints following conventional patterns (/api/yachts, /api/bookings, /api/reviews)
- **Development**: Hot reload setup with Vite middleware integration for seamless development experience
- **Storage**: In-memory storage implementation with interface design for easy database migration

### Data Storage Solutions
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database queries
- **Database**: PostgreSQL (configured but using in-memory storage for development)
- **Schema**: Centralized schema definitions in shared directory with Zod validation
- **Migrations**: Drizzle Kit for database schema management and migrations

### Key Data Models
- **Yachts**: Core entity with details like name, type, location, capacity, pricing, images, and features
- **Bookings**: Customer reservations with contact info, dates, guest count, and status tracking
- **Reviews**: Customer feedback system with ratings and verified status
- **Destinations**: Location data for the four Puglia coastal areas with coordinates and descriptions

### External Dependencies
- **Database**: Neon Database serverless PostgreSQL (via @neondatabase/serverless)
- **UI Components**: Radix UI component library for accessibility-compliant interface elements
- **Styling**: Tailwind CSS for utility-first styling approach
- **Forms**: React Hook Form ecosystem for efficient form management
- **Validation**: Zod for runtime type checking and schema validation
- **Development Tools**: Replit-specific plugins for development environment integration
- **Typography**: Google Fonts (Inter) for consistent typography across the platform
- **Icons**: Font Awesome for comprehensive icon library

### Communication Features
- **WhatsApp Integration**: Direct messaging functionality for customer inquiries
- **Contact Forms**: Structured booking forms with email and phone collection
- **Social Media**: Integration with Instagram and Facebook for business presence

### Design System
- **Theme**: Ocean and coastal-inspired color palette with geometric shapes overlay
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Animations**: CSS-based geometric animations and hover effects
- **Accessibility**: WCAG-compliant components through Radix UI foundation