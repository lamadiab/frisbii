import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ListResponse<T> {
  size: number;
  count: number;
  from: string;
  to: string;
  content: T[];
  range: string;
  next_page_token?: string;
}

@Injectable()
export abstract class ListService<T> {
  protected readonly baseUrl = `${environment.apiBaseUrl}`;

  constructor(
    protected http: HttpClient,
    protected readonly resourceName: string
  ) { }

  get(params?: HttpParams): Observable<ListResponse<T>> {
    return this.http.get<ListResponse<T>>(`${this.baseUrl}/list/${this.resourceName}`, { params });
  }
}
