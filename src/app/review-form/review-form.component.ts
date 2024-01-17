import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  @Input()
  productId!: string;  
  rating: number = 0;
  comment: string = '';

  constructor(private _apiService: ApiService) {}

  submitReview() {   
    const reviewData = {
      rating: this.rating,
      comment: this.comment,
      productId: this.productId  
    };

    // this._apiService.submitReview(reviewData).subscribe((response: any) => {   
    //   console.log('Revisión enviada con éxito');
    // });
  }
}
