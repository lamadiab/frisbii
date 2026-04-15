import { Component, Input } from '@angular/core';
import { Customer } from '../../../customers/models/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent {
  @Input() customer!: Customer;
}