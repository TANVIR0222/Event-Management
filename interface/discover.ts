// common/pagination.interface.ts

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

// events/event.interface.ts

export interface PrizeDistribution {
  place: string;
  percentage: number;
  additional_prize: string;
  percentage_amount: number;
}

export interface EventItem {
  id: number;
  organizer_id: number;
  title: string;
  description: string;
  sport_type: "single" | "team";
  starting_date: string;
  ending_date: string;
  time: string;
  location: string;
  number_of_player_required: number;
  number_of_team_required: number;
  number_of_player_required_in_a_team: number;
  entry_fee: string;
  prize_amount: string;
  prize_distribution: PrizeDistribution[];
  rules_guidelines: string;
  image: string;
  image_url: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  view: number;
  share: number;
  created_at: string;
  updated_at: string;
  sport_name: string;
  joined: number;
  max: number;
}

export interface DiscoverPayload {
  page?: number;
  per_page?: number;
  search?: string;
  filter?: string | string[];
}

export interface ViewEventData {
  id: number;
  organizer_id: number;
  title: string;
  description: string;
  sport_type: "single" | "team";
  sport_name: string;
  starting_date: string;
  ending_date: string;
  time: string;
  location: string;
  number_of_player_required: number;
  number_of_team_required: number;
  number_of_player_required_in_a_team: number;
  entry_fee: string;
  prize_amount: string;
  prize_distribution: PrizeDistribution[];
  rules_guidelines: string;
  image: string;
  image_url: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  view: number;
  share: number;
  created_at: string;
  updated_at: string;
  organizer: Organizer;
  is_follow: boolean;
  is_join: boolean;
}

export interface ViewEventResponse {
  status: boolean;
  message: string;
  data: ViewEventData;
}

interface Organizer {
  id: number;
  full_name: string;
  role: string;
  avatar: string;
  avatar_url: string;
}

export interface ViewEventPayload {
  id: string;
  team_id?: string;
}

export interface BranchesApiResponse {
  status: boolean;
  message: string;
  data: Branch[];
}

export interface Branch {
  id: number;
  name: string;
  address: string;
  country: string;
  working_hour: string;
  created_at: string; // ISO 8601 Date string
  updated_at: string; // ISO 8601 Date string
}
