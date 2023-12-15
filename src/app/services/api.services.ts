import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import {  Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable, catchError } from 'rxjs';
import * as cloudinary from 'cloudinary-core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  cloudinaryInstance: any;

  constructor(private _http: HttpClient) { 
    this.cloudinaryInstance = new cloudinary.Cloudinary({ cloud_name: 'prodelevatepf' })
  }
  private urlBase: string = "http://localhost:3001/product"

  getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(this.urlBase)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud HTTP:', error);
        throw error;
      })
    );
}

  getProductsInactive(): Observable<IProduct[]>{
    return this._http.get<IProduct[]>(`${this.urlBase}inactive`)
  }

  getProductById(id: string): Observable<IProduct>{
    return this._http.get<IProduct>(`${this.urlBase}/${id}`);
  }

//   newProduct(product: IProduct): Observable<IProduct>{
//     console.log(product)
//     return this._http.post<IProduct>(this.urlBase, product)
//     .pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('Error en la solicitud HTTP:', error);
//         throw error;
//       })
//     );
// }
newProduct(product: IProduct): Observable<IProduct> {
  console.log('__________',this.urlBase, product, '__________')
  console.log('Enviando solicitud para agregar producto:', product);
  return this._http.post<IProduct>(this.urlBase, product)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud HTTP al agregar producto:', error);
        throw error;
      })
    );
}


  deleteProducts(id: string): Observable<IProduct> {
    return this._http.delete<IProduct>(`${this.urlBase}/${id}`);
  }

  updateProduct(id: string, product: IProduct): Observable<IProduct>{
    return this._http.put<IProduct>(`${this.urlBase}/${id}`, product);
  }

  uploadImage(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file);

      this.cloudinaryInstance.uploader.upload(formData, (result: { secure_url: any; error: { message: any; }; }) => {
        if (result.secure_url) {
          resolve(result.secure_url);
        } else {
          reject(result.error.message);
        }
      });
    });
  }
}
