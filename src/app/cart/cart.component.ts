import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { NgIfContext } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmationDialogComponentComponent } from '../confirmation/confirmation-dialog-component/confirmation-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
 
  cartItems: { product: IProduct; quantity: number; }[] = [];
  total: number = 0;
  emptyCart!: TemplateRef<NgIfContext<boolean>> | null;
  user: string = "";

  constructor(private _cartService: CartService, private _router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.cartItems = this._cartService.getCart();
    this.calculateTotal();
    this.user = this._cartService.getUser(); 
  }

  buy(): void {
    const orderData = {
      products: this.cartItems.map(item => ({ product: item.product, quantity: item.quantity })),
      user: this.user
    };

    this._cartService.newOrderBuy(orderData).subscribe(
      response => {
        console.log('Order successful', response);
        // Redirigir al usuario a la URL de la sesión de pago
        window.location.href = response.session.url;
      },
      error => {
        console.error('Error placing order', error);
      }
    );
  }

  goToProducts() {
    this._router.navigate(['/products']);
  }

  removeFromCart(productId: string): void {
    this._cartService.removeFromCart(productId);
    this.updateCart();
  }

  incrementQuantity(productId: string): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      const updatedQuantity = item.quantity + 1;
      this.updateQuantity(productId, updatedQuantity);
    }
  }

  decrementQuantity(productId: string): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      const updatedQuantity = item.quantity - 1;
      this.updateQuantity(productId, updatedQuantity);
    }
  }

  updateQuantity(productId: string, newQuantity: number): void {
   
    if (newQuantity < 1) {
      newQuantity = 1; 
    }

    this._cartService.updateQuantity(productId, newQuantity);
    this.updateCart();
  }

  clearCart(): void {
    this._cartService.clearCart();
    this.updateCart();
  }

  private updateCart(): void {
    this.cartItems = this._cartService.getCart();
    this.calculateTotal();
  }

  private calculateTotal(): void {
    this.total = this._cartService.getTotal();
  }

  back() {
    this._router.navigate(['/products']);
  }

  openBuyConfirmationDialog(): void {
    // const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent);
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      data: { message: '¿Do you want to proceed with the purchase?' },
    });
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.buy();
      } else {
      }
    });
  }
  openClearCartConfirmationDialog(): void {
    // const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent);
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      data: { message: '¿you want to empty the shopping cart?' },
    });
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.clearCart();
      } else {
      }
    });
  }

}
