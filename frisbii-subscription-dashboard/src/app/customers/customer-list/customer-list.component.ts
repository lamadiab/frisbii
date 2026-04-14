import { Component, Input } from '@angular/core';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  @Input() customers: Customer[] = [];
  @Input() loading = false;
}
