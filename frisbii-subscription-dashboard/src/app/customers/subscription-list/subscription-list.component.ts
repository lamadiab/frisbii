import { Component, Input, signal, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, SubscriptionStateUtils } from '../models/subscription.model';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements AfterViewInit {
  @Input() set subscriptions(value: Subscription[]) {
    this.dataSource.data = value;
  }

  @Input() set loading(value: boolean) {
    this.isLoading.set(value);
  }

  @Output() pause = new EventEmitter<string>();
  @Output() unpause = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly displayedColumns: string[] = ['handle', 'state', 'planHandle', 'created', 'actions'];
  readonly dataSource = new MatTableDataSource<Subscription>([]);
  readonly isLoading = signal(false);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  protected readonly SubscriptionStateUtils = SubscriptionStateUtils;
}
