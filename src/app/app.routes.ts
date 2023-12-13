import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductComponent},
    {path: 'products/:id', component: ProductDetailComponent},
    {path: 'contact', component: ContactComponent},
    {path: '**', redirectTo: '', pathMatch:'full'},
];
