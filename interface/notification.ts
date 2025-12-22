// notificationsResponse.ts
export interface NotificationData {
  title: string;
  body: string;
  invited?: true;
  data: {
    id: number;
  };
}

export interface Notification {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: NotificationData;
  read_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

export interface NotificationsResponse {
  status: boolean;
  message: string;
  data: {
    current_page: number;
    data: Notification[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLinks[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface RewardPayloade {
  page: number;
  per_page: number;
}
