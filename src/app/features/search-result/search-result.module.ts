/**
 * Created by znarf on 1/23/18.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { SlickModule } from 'ngx-slick';

// modules
import { SharedModule } from '../../shared/shared.module';

// components
import { SearchResultComponent } from './pages/page.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

// services
import { SearchResultService } from './services/search-result.service';
import { ProductDetailModule } from '../product-detail/product-detail.module';

@NgModule({
  imports:[
    FormsModule,
    CommonModule,
    HttpModule,
    // SlickModule.forRoot(),
    SharedModule,
    ProductDetailModule
  ],
  declarations:[
    SearchResultComponent,
    ProductsListComponent,
    ProductCardComponent
  ],
  providers: [
    SearchResultService
  ],
  exports: [
    ProductCardComponent
  ]
})

export class SearchResultModule {}