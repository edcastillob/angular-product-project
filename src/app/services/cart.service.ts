import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseURL = "http://localhost:3001/payment/create-checkout-session";
  private cart: { product: IProduct; quantity: number }[] = [];

  constructor(private _httpClient: HttpClient) {
    // Recupera el carrito del localStorage al inicializar el servicio
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  getCart(): { product: IProduct; quantity: number }[] {
    return this.cart;
  }

  addToCart(product: IProduct): void {
    const existingItem = this.cart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }

    // Guarda el carrito en el localStorage
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(productId: number | string): void {
    this.cart = this.cart.filter(item => item.product.id !== productId);

    // Guarda el carrito en el localStorage
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart(): void {
    this.cart = [];

    // Borra el carrito del localStorage
    localStorage.removeItem('cart');
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      return; // No permitir cantidades negativas ni cero
    }
    // Implementa la lógica para actualizar la cantidad del producto en el carrito
    const item = this.cart.find(item => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
    }

    // Actualiza el localStorage
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getTotal(): number {
    // Implementa la lógica para calcular el total del carrito
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getUser(): string { 
    const username = localStorage.getItem('username'); 
    return username ? username : ""; 
  }

  public newOrderBuy(data: any): Observable<any>{  
    console.log('order', data);
    return this._httpClient.post<any>(`${this.baseURL}`, data);
  }
  

}
