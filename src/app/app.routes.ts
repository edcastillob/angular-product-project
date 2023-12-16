import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { AddProductComponent } from './pages/product/add-product/add-product.component';


export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'product', component: ProductComponent},
    {path: 'product/:id', component: ProductDetailComponent},
    {path: 'product-add', component: AddProductComponent},
    {path: 'contact', component: ContactComponent},
    {path: '**', redirectTo: '', pathMatch:'full'},
];
