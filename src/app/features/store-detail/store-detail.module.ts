import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreDetailComponent } from './pages/store-detail.component';
import { HeadStoreComponent } from './components/head-store/head-store.component';
import { SafePipe } from '../../core/pipes/safe.pipe';
import { ActionsComponent } from './components/actions/actions.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { SearchResultModule } from '../search-result/search-result.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchResultModule
  ],
  declarations: [StoreDetailComponent, HeadStoreComponent, SafePipe, ActionsComponent, CatalogueComponent]
})
export class StoreDetailModule { }
