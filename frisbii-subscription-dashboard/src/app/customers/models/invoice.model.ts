import { checkPropsNotNull } from "src/app/shared/utils/validation";
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

  static getLabel(state: InvoiceState): string {
    switch (state) {
      case InvoiceState.created:
        return "Created";
      case InvoiceState.pending:
        return "Pending";
      case InvoiceState.settled:
        return "Settled";
      case InvoiceState.authorized:
        return "Authorized";
      case InvoiceState.failed:
        return "Failed";
      default:
        return "Unknown";
    }
  }
}

export class Invoice {
  readonly handle: string;
  readonly state: InvoiceState;
  readonly amount: number;
  readonly currency: string;
  readonly created: Date;

  private constructor(props: {
    handle: string;
    state: InvoiceState;
    amount: number;
    currency: string;
    created: string;
  }) {
    checkPropsNotNull(props);

    this.handle = props.handle;
    this.state = props.state;
    this.amount = props.amount;
    this.currency = props.currency;
    this.created = new Date(props.created);
  }

  static of(props: {
    handle: string;
    state: InvoiceState;
    amount: number;
    currency: string;
    created: Date;
  }): Invoice {
    return new Invoice({
      handle: props.handle,
      state: props.state,
      amount: props.amount,
      currency: props.currency,
      created: props.created.toISOString(),
    });
  } 

  static fromDTO(dto: InvoiceDTO): Invoice {
    return Invoice.of({
      handle: dto.handle,
      state: InvoiceStateUtils.fromDTO(dto.state),
      amount: dto.amount,
      currency: dto.currency,
      created: new Date(dto.created),
    });
  }
}
