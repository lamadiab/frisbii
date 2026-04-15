import { InvoiceDTO, InvoiceStateDTO } from "../../core/api/invoice.api";

export enum InvoiceState {
  created = "created",
  pending = "pending",
  settled = "settled",
  authorized = "authorized",
  failed = "failed",
  unknown = "unknown",
}

export class InvoiceStateUtils {
  static fromDTO(state: InvoiceStateDTO): InvoiceState {
    switch (state) {
      case "created":
        return InvoiceState.created;
      case "pending":
        return InvoiceState.pending;
      case "settled":
        return InvoiceState.settled;
      case "authorized":
        return InvoiceState.authorized;
      case "failed":
        return InvoiceState.failed;
      default:
        return InvoiceState.unknown;
    }
  }
}

export class Invoice {
  readonly handle: string;
  readonly state: InvoiceState;
  readonly amount: number;
  readonly currency: string;
  readonly created: Date;

  private constructor(dto: InvoiceDTO) {
    this.handle = dto.handle;
    this.state = InvoiceStateUtils.fromDTO(dto.state);
    this.amount = dto.amount;
    this.currency = dto.currency;
    this.created = new Date(dto.created);
  }

  static fromDTO(dto: InvoiceDTO): Invoice {
    return new Invoice(dto);
  }
}
