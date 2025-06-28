export type ObjectFullData = {
  id: number;
  user_uuid: string;
  name: string;
  description: string;
  developer: string;
  construction_status: string;
  address: string;
  district: string;
  transport_nearby: boolean;
  school_nearby: boolean;
  shops_nearby: boolean;
  longitude: string;
  latitude: string;
  floors_count: number;
  total_apartments: number;
  apartment_types: string[];
  amenities: string[];
  delivery_date: string;
  price_per_sqm: string; // or number, if always passed as number
  min_price: string; // or number, if always passed as number
  max_price: string; // or number, if always passed as number
  payment_plans: string[];
  photos: string[]; // Base64 encoded images
  vr_tour_url: string;
  ar_model_url: string;
  cadastral_number: string;
  property_documents: string[];
  created_at: string; // ISO 8601 date string
  updated_at: string; // ISO 8601 date string
};

export type ObjectCreate = {
  user_uuid: string;
  name: string;
  description: string;
  developer: string;
  construction_status: string;
  address: string;
  district: string;
  transport_nearby: boolean;
  school_nearby: boolean;
  shops_nearby: boolean;
  longitude: number;
  latitude: number;
  floors_count: number;
  total_apartments: number;
  apartment_types: string[];
  amenities: string[];
  delivery_date: string;
  price_per_sqm: number;
  min_price: number;
  max_price: number;
  payment_plans: string[];
  photos: string[];
  vr_tour_url: string;
  ar_model_url: string;
  cadastral_number: string;
  property_documents: string[];
};
