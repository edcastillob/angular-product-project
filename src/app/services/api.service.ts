import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'  
})
export class ApiService {

  private baseURL = "http://localhost:3001";

  constructor(private _httpClient: HttpClient) { }

  public getAllProducts(): Observable<IProduct[]>{
    return this._httpClient.get<IProduct[]>(`${this.baseURL}/product`)
  }

  public getProductById(id: string): Observable<IProduct>{
    return this._httpClient.get<IProduct>(`${this.baseURL}/product/${id}`)
  }
 

  public newProduct(product: IProduct): Observable<IProduct>{
    console.log(product)
    return this._httpClient.post<IProduct>(`${this.baseURL}/product`, product)
  }
  
  public updateProduct(id: string, product: IProduct): Observable<IProduct>{
    return this._httpClient.put<IProduct>(`${this.baseURL}/product/${id}`, product)
  }

  public deleteProduct(id: string): Observable<IProduct>{
    return this._httpClient.delete<IProduct>(`${this.baseURL}/product/${id}`)
  }

  public verifyReviewProduct(productId: string, username: string): Observable<any>{
    const data = {productId, username}
    return this._httpClient.post<any>(`${this.baseURL}/review-product`, data)
  }
}
