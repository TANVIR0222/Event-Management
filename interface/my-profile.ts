export interface PlayerApiResponse {
  status: boolean;
  message: string;
  data: PlayerData;
}

export interface PlayerData {
  user_info: UserInfo;
  follower_info: FollowerInfo;
  events_status: EventsStatus;
  my_events: MyEvent[];
}

/* ================= User Info ================= */

export interface UserInfo {
  id: number;
  full_name: string;
  user_name: string;
  connected_account_id: number | null;
  role: "PLAYER" | string;
  email: string;
  email_verified_at: string | null;
  status: "Active" | "Inactive" | string;
  otp_verified_at: string | null;
  otp: string | null;
  otp_expires_at: string | null;
  phone_number: string | null;
  address: string | null;
  avatar: string | null;
  google_id: string | null;
  created_at: string;
  updated_at: string;
  avatar_url: string;
  profile: UserProfile[];
}

/* ================= Profile ================= */

export interface UserProfile {
  id: number;
  user_id: number;
  total_balance: string;
  total_earning: string;
  total_expence: string;
  total_withdraw: string;
  total_event_joined: number;
  created_at: string;
  updated_at: string;
}

/* ================= Followers ================= */

export interface FollowerInfo {
  followings: number;
  followers: number;
}

/* ================= Events Status ================= */

export interface EventsStatus {
  events_joined: number;
  total_winnings: string;
  top_rank: string;
}

/* ================= My Events ================= */

export interface TeamApiResponse {
  status: boolean;
  message: string;
  data: Team[];
}

export interface Team {
  id: number;
  player_id: number; // Likely the owner or captain ID
  name: string;
  created_at: string;
  updated_at: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: number;
  team_id: number;
  player_id: number;
  created_at: string;
  updated_at: string;
}
