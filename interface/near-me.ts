export interface NearMeApiResponse {
  status: boolean;
  message: string;
  data: NearMeData;
}

export interface NearMeData {
  current: CurrentLocation;
  events: NearMeEvent[];
}

export interface CurrentLocation {
  latitude: number;
  longitude: number;
}

export interface NearMeEvent {
  id: number;
  organizer_id: number;
  title: string;
  sport_type: "team" | "single"; // Defined as literal types for better intellisense
  sport_name: string;
  image: string;
  location: string;
  latitude: string; // Note: API returns these as strings or empty strings
  longitude: string; // Note: API returns these as strings or empty strings
  distance_km: number;
}

export interface NearMePayload {
  latitude: number;
  longitude: number;
  search: string;
}
