import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { CustomerService } from '../../core/services/customer.service';
import { InvoiceService } from '../../core/services/invoice.service';
import { SubscriptionService } from '../../core/services/subscription.service';
import { Customer } from '../../customers/models/customer.model';
import { Invoice } from '../../customers/models/invoice.model';
import { Subscription } from '../../customers/models/subscription.model';

@Component({
  selector: 'app-customer-page',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss']
})
export class CustomerPage implements OnInit {
  readonly customer = signal<Customer | null>(null);
  readonly invoices = signal<Invoice[]>([]);
  readonly subscriptions = signal<Subscription[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private subscriptionService: SubscriptionService
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
      this.invoiceService.getByCustomer(handle),
      this.subscriptionService.getByCustomer(handle)
    ])
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ([customer, invoices, subscriptions]) => {
          this.customer.set(customer);
          this.invoices.set(invoices);
          this.subscriptions.set(subscriptions);
        },
        error: () => this.error.set('Failed to load customer data')
      });
  }

  onPauseSubscription(handle: string): void {
    this.subscriptionService.pauseSubscription(handle).pipe(
      switchMap(() => this.subscriptionService.getByCustomer(this.route.snapshot.paramMap.get('handle')!))
    ).subscribe({
      next: (subscriptions) => this.subscriptions.set(subscriptions)
    });
  }

  onUnpauseSubscription(handle: string): void {
    this.subscriptionService.unpauseSubscription(handle).pipe(
      switchMap(() => this.subscriptionService.getByCustomer(this.route.snapshot.paramMap.get('handle')!))
    ).subscribe({
      next: (subscriptions) => this.subscriptions.set(subscriptions)
    });
  }
}
