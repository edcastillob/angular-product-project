// review-form.component.ts
import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  @Input()
  productId!: string;   // Recibimos el productId como entrada desde el componente padre
  rating: number = 0;
  comment: string = '';

  constructor(private _apiService: ApiService) {}

  submitReview() {
    // Enviamos la revisión al backend
    const reviewData = {
      rating: this.rating,
      comment: this.comment,
      productId: this.productId  // Usamos el productId recibido como entrada
    };

    // this._apiService.submitReview(reviewData).subscribe((response: any) => {
    //   // Manejar la respuesta del backend según sea necesario
    //   console.log('Revisión enviada con éxito');
    // });
  }
}
