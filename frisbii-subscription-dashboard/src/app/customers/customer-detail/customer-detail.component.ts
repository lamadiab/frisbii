import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  readonly customer = signal<Customer | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const handle = this.route.snapshot.paramMap.get('handle');

    if (handle) {
      this.loadCustomer(handle);
    }
  }

  loadCustomer(handle: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.customer.set(Customer.of({
      handle,
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      company: 'Acme Corp',
      created: new Date()
    }));
    
    this.loading.set(false);
  }
}