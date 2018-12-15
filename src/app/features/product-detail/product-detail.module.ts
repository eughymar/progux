import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './pages/product-detail.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ImageDataComponent } from './components/image-data/image-data.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [ProductDetailComponent, CommentsComponent, ImageDataComponent],
  exports: [ProductDetailComponent, CommentsComponent],
  entryComponents: [ProductDetailComponent]
})
export class ProductDetailModule { }
