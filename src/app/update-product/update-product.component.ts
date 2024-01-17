import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ApiService } from '../services/api.service';
import { IProduct } from '../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { state, style, trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  animations: [
    trigger('done', [
      state('void', style({})),
      state('done', style({})),
      transition('void => done', animate('300ms')), 
    ])],
})
export class UpdateProductComponent implements OnInit {
  productId: string | null = null;
  product!: IProduct;

  constructor(
    private route: ActivatedRoute,
    private routerService: Router, 
    private apiService: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
  
    if (this.productId) {
      this.apiService.getProductById(this.productId).subscribe(
        (data: IProduct) => {
          this.product = data;          
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  showMessageAndRedirect(message: string): void {
    this._snackBar.open(message, 'Cerrar', {
      duration: 3000,
    }).afterDismissed().subscribe(() => {
      this.routerService.navigate(['/products']); 
    });
  }

  updateProduct(): void {
    if (this.productId !== null && this.product) {
      this.apiService.updateProduct(this.productId, this.product).subscribe(
        (data: IProduct) => {
        
          this.showMessageAndRedirect('Product updated successfully');
        },
        error => {
          console.log('Error updating product:', error);
        }
      );
    } else {
      console.log('Invalid productId or product data.');
    }
  }
}
