export interface PrizeDistribution {
  place: string;
  percentage: number;
  additional_prize: string;
  percentage_amount: number;
}

export interface MyAllEvent {
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

  status: string;
  view: number;
  share: number;

  created_at: string;
  updated_at: string;
}

export interface ViewEventApiResponse {
  status: boolean;
  message: string;
  data: Event;
}

export interface Event {
  id: number;
  organizer_id: number;

  title: string;
  description: string;

  sport_type: "single" | "team";
  sport_name: string;

  starting_date: string; // YYYY-MM-DD
  ending_date: string; // YYYY-MM-DD
  time: string; // "03:00 PM"

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

  status: string;
  view: number;
  share: number;

  created_at: string;
  updated_at: string;
}

export interface ViewEventResponse {
  status: boolean;
  message: string;
  data: EventData;
}

export interface EventData {
  event: EventDetails;
  max: number;
  joined: number;
  joined_players: JoinedPlayer[];
  top_3_winners: Winner[];
  event_status: EventStatusSummary;
}

export interface EventDetails {
  id: number;
  organizer_id: number;
  title: string;
  description: string;
  sport_type: string;
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
  status: string;
  view: number;
  share: number;
  created_at: string;
  updated_at: string;
  image_url: string;
}

export interface JoinedPlayer {
  id: number;
  event_id: number;
  player_id: number;
  team_id: number | null;
  joining_date: string;
  created_at: string;
  updated_at: string;
  player: PlayerProfile;
}

export interface PlayerProfile {
  id: number;
  full_name: string;
  user_name: string;
  avatar: string | null;
  avatar_url: string;
}

export interface Winner {
  id: number;
  event_id: number;
  place: string;
  player_id: number;
  team_id: number | null;
  amount: string;
  additional_prize: string;
  admin_approval: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface EventStatusSummary {
  players_registered: string;
  prize_amount: string;
  view: number;
}

export interface PerformanceApiResponse {
  status: boolean;
  message: string;
  data: {
    account_reach: string;
    social_shares: string;
    total_participants_last_30_days: string;
    active_participants_last_30_days: string;
    completed_events: string;
  };
}

export interface MyFormValues {
  current_password: string;
  password: string;
  password_confirmation: string;
}
