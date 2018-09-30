import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreDetailComponent } from './pages/store-detail.component';
import { HeadStoreComponent } from './components/head-store/head-store.component';
import { SafePipe } from '../../core/pipes/safe.pipe';
import { ActionsComponent } from './components/actions/actions.component';

@NgModule({
  imports: [
    CommonModule,
    
  ],
  declarations: [StoreDetailComponent, HeadStoreComponent, SafePipe, ActionsComponent]
})
export class StoreDetailModule { }
