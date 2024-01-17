import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { IProduct } from '../models/product.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  product?: IProduct;
  productsList: IProduct[] = [];
  loading: boolean = true;
  viewReview!: boolean;
  productId!: string;
  modalService: any;
  // username: string | null= "";
  
  constructor( 
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private _userService: UserService
    ){}

    
    ngOnInit(): void {
      this._route.params.subscribe(params => { 
        this.productId = params['productId']
        this._apiService.getProductById(params['productId']).subscribe((data: IProduct) => { 
          this.product = data;
        });
    
      const username = this._userService.getUser();
      this._apiService.verifyReviewProduct(params['productId'], username)
        .subscribe((response: any) => {
         
          this.viewReview = response.hasPurchased;
          console.log(this.viewReview, 'review');
        });

      this.loading = false;
    });
  }
    handleImageError(event: any) {     
     event.target.src = '../../assets/noimage.jpeg';
   }

}
