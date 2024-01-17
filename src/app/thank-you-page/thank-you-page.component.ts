import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.css'],
})
export class ThankYouPageComponent implements OnInit {
  idCompra: string = '';
  compraData: any;
  fullname: string = '';
  products: { product: { name: string; price: number }; quantity: number }[] =
    [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idCompra = params['idCompra'];

      if (!this.idCompra) {
        this.router.navigate(['/products']);
      }

      console.log('ID de la compra:', this.idCompra);

      const cartData = this.cartService.getCartData();
      this.products = cartData;

      this.fullname = this.cartService.getFullname();
      console.log(this.fullname, '_');

      this.compraData = { idCompra: this.idCompra, products: this.products };

      console.log('Datos de la compra:', this.compraData);

      this.cartService.clearCart();
    });
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }

  getTotal(): number {
    return this.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  printInvoice() {
    var container = document.querySelector('.invoice-container');

    if (!container) {
      console.error('Container not found');
      return;
    }

    var printWindow = window.open('', '_blank');

    if (!printWindow) {
      console.error('Print window not opened');
      return;
    }

    printWindow.document.write(
      '<html><head><title>Print Invoice</title></head><body>'
    );
    printWindow.document.write(container.innerHTML);
    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.print();
  }
}
