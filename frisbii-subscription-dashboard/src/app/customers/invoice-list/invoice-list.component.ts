import { Component, Input, signal, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice, InvoiceStateUtils } from '../models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements AfterViewInit {
  @Input() set invoices(value: Invoice[]) {
    this.dataSource.data = value;
  }

  @Input() set loading(value: boolean) {
    this.isLoading.set(value);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns: string[] = ['handle', 'state', 'amount', 'created'];
  readonly dataSource = new MatTableDataSource<Invoice>([]);
  readonly isLoading = signal(false);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  protected readonly InvoiceStateUtils = InvoiceStateUtils;
}
