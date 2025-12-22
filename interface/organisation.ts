export interface OrganisationProfile {
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

export interface UserInfo {
  id: number;
  full_name: string;
  user_name: string;
  connected_account_id: string | null;
  role: string;
  email: string;
  email_verified_at: string;
  status: string;
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
  profile: OrganisationProfile[];
}

export interface FollowerInfo {
  followings: string;
  followers: number;
}

export interface EventStatus {
  total_events: number;
  completed: number;
  upcoming: number;
  canceled: number;
}

export interface RecentEvent {
  id: number;
  title: string;
  sport_type: string;
  status: string;
  image_url: string;
}

export interface OrganisationsApiResponse {
  status: boolean;
  message: string;
  data: {
    user_info: UserInfo;
    follower_info: FollowerInfo;
    events_status: EventStatus;
    recent_events: RecentEvent[];
  };
}
