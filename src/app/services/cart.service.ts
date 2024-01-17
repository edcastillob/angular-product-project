import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseURL = 'http://localhost:3001/payment/create-checkout-session';
  private cart: { product: IProduct; quantity: number }[] = [];

  constructor(private _httpClient: HttpClient) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }
  realizarCompra(): Observable<any> {
    return this._httpClient.get(this.baseURL);
  }
  getCart(): { product: IProduct; quantity: number }[] {
    return this.cart;
  }
  getCartData(): { product: IProduct; quantity: number }[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  addToCart(product: IProduct): void {
    const existingItem = this.cart.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(productId: number | string): void {
    this.cart = this.cart.filter((item) => item.product.id !== productId);

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(): void {
    this.cart = [];

    localStorage.removeItem('cart');
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      return;
    }

    const item = this.cart.find((item) => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getTotal(): number {
    return this.cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  getUser(): string {
    const username = localStorage.getItem('username');
    return username ? username : '';
  }
  getFullname(): string {
    const fullname = localStorage.getItem('fullname');
    return fullname ? fullname : '';
  }

  public newOrderBuy(data: any): Observable<any> {
    console.log('order', data);
    return this._httpClient.post<any>(`${this.baseURL}`, data);
  }
}
