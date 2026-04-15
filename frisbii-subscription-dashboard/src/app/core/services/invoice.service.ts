import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invoice } from '../../customers/models/invoice.model';
import { InvoiceDTO } from '../api/invoice.api';
import { ListService } from './list.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends ListService<InvoiceDTO> {
  constructor(protected override http: HttpClient) {
    super(http, 'invoice');
  }

  getByCustomer(customerHandle: string): Observable<Invoice[]> {
    const params = new HttpParams()
      .set('customer', customerHandle)
      .set('size', 100);

    return this.get(params).pipe(
      map(response => response.content.map(dto => Invoice.fromDTO(dto)))
    );
  }
}
