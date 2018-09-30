import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDetailComponent } from './pages/store-detail.component';
import { HeadStoreComponent } from './components/head-store/head-store.component';
import { SafePipe } from '../../core/pipes/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    
  ],
  declarations: [StoreDetailComponent, HeadStoreComponent, SafePipe]
})
export class StoreDetailModule { }
