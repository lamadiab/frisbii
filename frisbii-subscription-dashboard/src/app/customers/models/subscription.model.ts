import { checkPropsNotNull } from "src/app/shared/utils/validation";
import {
  SubscriptionDTO,
  SubscriptionStateDTO,
} from "../../core/api/subscription.api";

export enum SubscriptionState {
  Active = "active",
  Cancelled = "cancelled",
  Expired = "expired",
  OnHold = "on_hold",
  Unknown = "unknown",
}

export class SubscriptionStateUtils {
  static fromDTO(dto: SubscriptionStateDTO): SubscriptionState {
    switch (dto) {
      case "active":
        return SubscriptionState.Active;
      case "cancelled":
        return SubscriptionState.Cancelled;
      case "expired":
        return SubscriptionState.Expired;
      case "on_hold":
        return SubscriptionState.OnHold;
      default:
        return SubscriptionState.Unknown;
    }
  }

  static getLabel(state: SubscriptionState): string {
    switch (state) {
      case SubscriptionState.Active:
        return "Active";
      case SubscriptionState.Cancelled:
        return "Cancelled";
      case SubscriptionState.Expired:
        return "Expired";
      case SubscriptionState.OnHold:
        return "On Hold";
      default:
        return "Unknown";
    }
  }
}

export class Subscription {
  readonly handle: string;
  readonly state: SubscriptionState;
  readonly planHandle: string;
  readonly created: Date;

  private constructor(props: {
    handle: string;
    state: SubscriptionState;
    planHandle: string;
    created: Date;
  }) {
    checkPropsNotNull(props);

    this.handle = props.handle;
    this.state = props.state;
    this.planHandle = props.planHandle;
    this.created = props.created;
  }

  static of(props: {
    handle: string;
    state: SubscriptionState;
    planHandle: string;
    created: Date;
  }): Subscription {
    return new Subscription(props);
  }

  static fromDTO(dto: SubscriptionDTO): Subscription {
    return Subscription.of({
      handle: dto.handle,
      state: SubscriptionStateUtils.fromDTO(dto.state),
      planHandle: dto.plan,
      created: new Date(dto.created),
    });
  }

  canPause(): boolean {
    return this.state === SubscriptionState.Active;
  }

  canUnpause(): boolean {
    return this.state === "on_hold";
  }
}
