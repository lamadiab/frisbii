import { Component, Input, computed, signal } from '@angular/core';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  @Input() set customers(value: Customer[]) {
    this.allCustomers.set(value);
  }

  @Input() set loading(value: boolean) {
    this.isLoading.set(value);
  }

  readonly displayedColumns: string[] = ['handle', 'fullName', 'email', 'company', 'created'];
  readonly allCustomers = signal<Customer[]>([]);
  readonly searchQuery = signal('');
  readonly isLoading = signal(false);
  readonly pageIndex = signal(0);
  readonly pageSize = signal(20);

  readonly pageData = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();

    let customers = this.allCustomers();

    if (query) {
      customers = customers.filter(customer =>
        customer.handle.toLowerCase().includes(query)
      );
    }

    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();

    return {
      items: customers.slice(start, end),
      total: customers.length
    };
  });

  applySearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.pageIndex.set(0);
  }

  onPageChange(event: any): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}