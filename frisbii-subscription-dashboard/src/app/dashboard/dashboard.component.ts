import { Component, OnInit, signal } from '@angular/core';
import { CustomerService } from '../core/services/customer.service';
import { Customer } from '../customers/models/customer.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  customers = signal<Customer[]>([]);
  loading = signal<boolean>(false);

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading.set(true);
    console.log('Loading customers from API...');

    this.customerService.getCustomers().subscribe({
      next: (customers: Customer[]) => {
        this.customers.set(customers);
        this.loading.set(false);
        console.log('✅ Customers loaded successfully:', customers.length);
        console.log('Customer data:', customers);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('❌ Error loading customers:', error);
      }
    });
  }
}
