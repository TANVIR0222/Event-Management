export interface TransactionApiResponse {
  status: boolean;
  message: string;
  data: TransactionData;
}

export interface TransactionData {
  available_balance: number;
  transactions_histories: TransactionsHistories;
}

export interface TransactionsHistories {
  current_page: number;
  data: TransactionRecord[];
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

export interface TransactionRecord {
  id: number;
  payment_intent_id: string | null;
  user_id: number;
  event_id: number;
  type: string;
  message: string;
  amount: string; // Note: API returns this as a string "100.00"
  date: string;
  status: string;
  created_at: string;
  updated_at: string;
  event_title: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}
