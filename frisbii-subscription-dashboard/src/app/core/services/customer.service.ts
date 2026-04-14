import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerDTO } from '../api/customer.api';
import { Customer } from '../../customers/models/customer.model';
import { ListService } from './list.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends ListService<CustomerDTO> {

  constructor(http: HttpClient) {
    super(http, 'customer');
  }

  getCustomers(size: number = 20): Observable<Customer[]> {
    let params = new HttpParams()
      .set('size', size);

    return this.get(params)
      .pipe(
        map(response => response.content.map(dto => Customer.fromDTO(dto)))
      );
  }
}
