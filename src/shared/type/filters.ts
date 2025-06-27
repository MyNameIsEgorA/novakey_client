export type Filters = {
  priceRange: number[];
  areaRange: number[];
  rooms: string;
  status: string;
  district: string;
  developer: string;
  floorRange: number[];
  amenities: string[];
  nearTransport: boolean;
  nearSchool: boolean;
  nearShops: boolean;
};

export const BaseFilters: Filters = {
  priceRange: [0, 20],
  areaRange: [20, 150],
  rooms: "any",
  status: "any",
  district: "any",
  developer: "any",
  floorRange: [1, 30],
  amenities: [] as string[],
  nearTransport: false,
  nearSchool: false,
  nearShops: false,
};
