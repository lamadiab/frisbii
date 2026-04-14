import { checkPropsNotNull } from "../../shared/utils/validation";
import { CustomerDTO } from "../../core/api/customer.api";

export class Customer {
  readonly handle: string;
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly company: string;
  readonly created: Date;

  protected constructor(props: {
    handle: string;
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    created: Date;
  }) {
    checkPropsNotNull(props);

    this.handle = props.handle;
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.company = props.company;
    this.created = props.created;
  }

  static of(props: {
    handle: string;
    email: string;
    firstName: string;
    lastName: string;
    company: string;
    created: Date;
  }): Customer {
    return new Customer(props);
  }

  static fromDTO(dto: CustomerDTO): Customer {
    return Customer.of({
      handle: dto.handle,
      email: dto.email,
      firstName: dto.firstName ?? '',
      lastName: dto.lastName ?? '',
      company: dto.company ?? '',
      created: new Date(dto.created),
    });
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim() || this.email;
  }
}
