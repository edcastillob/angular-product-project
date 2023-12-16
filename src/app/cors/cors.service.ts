
import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorsInterceptor } from './cors.interceptor';

@Injectable({
  providedIn: 'root',
})
export class CorsInterceptorService {
  static interceptor() {
    return { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true };
  }
}
