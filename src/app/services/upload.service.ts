import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private _http: HttpClient) {}

  upLoadImage(value: any): Observable<any> {
    let data = value;

    return this._http.post(
      'https://api.cloudinary.com/v1_1/prodelevatepf/image/upload',
      data
    );
  }
}
