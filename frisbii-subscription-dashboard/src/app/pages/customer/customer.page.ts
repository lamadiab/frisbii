import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CustomerService } from '../../core/services/customer.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { Customer } from '../../customers/models/customer.model';
import { Invoice } from '../../customers/models/invoice.model';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss']
})
export class CustomerPage implements OnInit {
  readonly customer = signal<Customer | null>(null);
  readonly invoices = signal<Invoice[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private invoiceService: InvoiceService
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

    forkJoin([
      this.customerService.getByHandle(handle),
      this.invoiceService.getByCustomer(handle)
    ])
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ([customer, invoices]) => {
          this.customer.set(customer);
          this.invoices.set(invoices);
        },
        error: () => this.error.set('Failed to load customer data')
      });
  }
}
