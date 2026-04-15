import { Component, OnInit, signal } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { Customer } from '../../customers/models/customer.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  readonly customers = signal<Customer[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loading.set(true);
    this.error.set(null);

    this.customerService.getCustomers()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (customers) => this.customers.set(customers),
        error: (err) => this.error.set('Failed to load customers.')
      });
  }
}
