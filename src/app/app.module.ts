import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductAddComponent } from './product-add/product-add.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateProductComponent } from './update-product/update-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponentComponent } from './confirmation/confirmation-dialog-component/confirmation-dialog-component.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { ThankYouPageComponent } from './thank-you-page/thank-you-page.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ReviewFormComponent } from './review-form/review-form.component';
import { StarRatingModule } from 'angular-star-rating';
import { ProviderComponent } from './provider/provider.component';
import { CreateProviderComponent } from './provider/create-provider/create-provider.component';
import { DetailProviderComponent } from './provider/detail-provider/detail-provider.component';
import { UpdateProviderComponent } from './provider/update-provider/update-provider.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ContactComponent,
    ProductDetailComponent,
    ProductAddComponent,
    UpdateProductComponent,
    ConfirmationDialogComponentComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    ThankYouPageComponent,
    ReviewFormComponent,
    ProviderComponent,
    CreateProviderComponent,
    DetailProviderComponent,
    UpdateProviderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxDropzoneModule,
    OAuthModule.forRoot(),
    FormsModule,
    StarRatingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
