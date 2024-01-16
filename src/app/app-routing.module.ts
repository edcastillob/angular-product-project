import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ContactComponent } from './contact/contact.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { ProviderComponent } from './provider/provider.component';
import { CreateProviderComponent } from './provider/create-provider/create-provider.component';
import { DetailProviderComponent } from './provider/detail-provider/detail-provider.component';
import { UpdateProviderComponent } from './provider/update-provider/update-provider.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:productId', component: ProductDetailComponent},
  {path: 'product-add', component: ProductAddComponent},
  {path: 'update-product/:id', component: UpdateProductComponent },
  {path: 'contact', component: ContactComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'viewReview', component: ReviewFormComponent},
  {path: 'thank-you-page', component: ThankYouPageComponent},
  {path: 'providers', component: ProviderComponent},
  {path: 'provider-add', component: CreateProviderComponent},
  {path: 'provider/:providerId', component: DetailProviderComponent},
  {path: 'update-provider/:id', component: UpdateProviderComponent},
  {path: '**', redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
