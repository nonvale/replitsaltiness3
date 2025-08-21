import type { Yacht as BaseYacht, Destination } from "@shared/schema";

export interface YachtWithExtras extends BaseYacht {
  locationName?: string;
  isLuxury?: boolean;
  averageRating?: number;
  reviewCount?: number;
  nextAvailableDate?: string;
}

export interface YachtFilters {
  location: string;
  capacity: string; 
  priceRange: string;
  type?: string;
  availability?: boolean;
}

export interface LocationWithYachts extends Destination {
  availableYachts?: number;
  priceRange?: {
    min: number;
    max: number;
  };
}

export interface BookingFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  guests: number;
  message?: string;
  specialRequests?: string[];
  preferredServices?: string[];
}

export interface PriceCalculation {
  basePrice: number;
  totalDays: number;
  subtotal: number;
  extras: {
    name: string;
    price: number;
  }[];
  tax: number;
  total: number;
}

export interface YachtAvailability {
  yachtId: string;
  availableDates: string[];
  blockedDates: string[];
  minimumBookingDays: number;
  maxAdvanceBookingDays: number;
}

export type YachtType = "motor" | "sailing" | "catamaran" | "gozzo";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type LocationId = "monopoli" | "polignano" | "leuca" | "gallipoli";

// Utility types for component props
export interface YachtCardProps {
  yacht: YachtWithExtras;
  showLocationBadge?: boolean;
  showPricing?: boolean;
  onBookingClick?: (yacht: YachtWithExtras) => void;
  onFavoriteToggle?: (yacht: YachtWithExtras) => void;
}

export interface FleetGridProps {
  yachts: YachtWithExtras[];
  filters?: YachtFilters;
  onFiltersChange?: (filters: YachtFilters) => void;
  loading?: boolean;
  showFilters?: boolean;
}

export interface LocationFilterProps {
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  showYachtCount?: boolean;
  locations?: LocationWithYachts[];
}
