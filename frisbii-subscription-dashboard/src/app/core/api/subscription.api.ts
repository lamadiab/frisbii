export type SubscriptionStateDTO = 'active' | 'cancelled' | 'expired' | 'on_hold' | 'unknown';

export interface SubscriptionDTO {
  handle: string;
  state: SubscriptionStateDTO;
  plan: string;
  created: string;
}