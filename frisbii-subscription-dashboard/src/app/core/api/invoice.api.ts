export type InvoiceStateDTO = 'created' | 'pending' | 'settled' | 'authorized' | 'failed' | 'unknown';

export interface InvoiceDTO {
  handle: string;
  state: InvoiceStateDTO;
  amount: number;
  currency: string;
  created: string;
}