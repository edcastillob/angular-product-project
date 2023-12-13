import { HttpClient } from '@angular/common/http'
import {  Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }
  private urlBase: string = "http://localhost:3001/product"

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this.urlBase);
  }

  getProductsInactive(): Observable<IProduct[]>{
    return this._http.get<IProduct[]>(`${this.urlBase}inactive`)
  }

  getProductById(id: string): Observable<IProduct>{
    return this._http.get<IProduct>(`${this.urlBase}/${id}`);
  }

  newProduct(product: IProduct): Observable<IProduct>{
    return this._http.post<IProduct>(this.urlBase, product)
  }

  deleteProducts(id: string): Observable<IProduct> {
    return this._http.delete<IProduct>(`${this.urlBase}/${id}`);
  }

  updateProduct(id: string, product: IProduct): Observable<IProduct>{
    return this._http.put<IProduct>(`${this.urlBase}/${id}`, product);
  }
}
