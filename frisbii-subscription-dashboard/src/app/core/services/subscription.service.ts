import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from '../../customers/models/subscription.model';
import { SubscriptionDTO } from '../api/subscription.api';
import { ListService } from './list.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends ListService<SubscriptionDTO> {
  constructor(protected override http: HttpClient) {
    super(http, 'subscription');
  }

  getByCustomer(customerHandle: string): Observable<Subscription[]> {
    const params = new HttpParams()
      .set('customer', customerHandle)
      .set('size', 100);

    return this.get(params).pipe(
      map(response => response.content.map(dto => Subscription.fromDTO(dto)))
    );
  }

  pauseSubscription(handle: string): Observable<void> {
    return this.http.post<void>(`https://api.frisbii.com/v1/subscription/${handle}/on_hold`, {});
  }

  unpauseSubscription(handle: string): Observable<void> {
    return this.http.post<void>(`https://api.frisbii.com/v1/subscription/${handle}/reactivate`, {});
  }
}