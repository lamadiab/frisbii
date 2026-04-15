import { Component, Input, signal, computed } from '@angular/core';
import { Invoice, InvoiceState } from '../models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent {
  @Input() set invoices(value: Invoice[]) {
    this.allInvoices.set(value);
  }

  @Input() set loading(value: boolean) {
    this.isLoading.set(value);
  }

  readonly allInvoices = signal<Invoice[]>([]);
  readonly isLoading = signal(false);
}