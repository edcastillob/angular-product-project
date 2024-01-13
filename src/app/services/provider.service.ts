import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  IProvider } from '../models/provider.model';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private baseURL = "http://localhost:3001";

  constructor(private _httpClient: HttpClient) { }

  public getAllProvider(): Observable<IProvider[]>{
    return this._httpClient.get<IProvider[]>(`${this.baseURL}/provider`)
  }

  public getProviderById(id: string): Observable<IProvider>{
    return this._httpClient.get<IProvider>(`${this.baseURL}/provider/${id}`)
  }
 

  public newProvider(provider: IProvider): Observable<IProvider>{
    console.log(provider)
    return this._httpClient.post<IProvider>(`${this.baseURL}/provider`, provider)
  }
  
  public updateProvider(id: string, provider: IProvider): Observable<IProvider>{
    return this._httpClient.put<IProvider>(`${this.baseURL}/provider/${id}`, provider)
  }

  public deleteProvider(id: string): Observable<IProvider>{
    return this._httpClient.delete<IProvider>(`${this.baseURL}/provider/${id}`)
  }
  
}
