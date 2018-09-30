import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreDetailComponent } from './pages/store-detail.component';
import { HeadStoreComponent } from './components/head-store/head-store.component';
import { SafePipe } from '../../core/pipes/safe.pipe';
import { ActionsComponent } from './components/actions/actions.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { SearchResultModule } from '../search-result/search-result.module';
import { TeamComponent } from './components/team/team.component';
import { PricingComponent } from './components/pricing/pricing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchResultModule
  ],
  declarations: [StoreDetailComponent, HeadStoreComponent, SafePipe, ActionsComponent, CatalogueComponent, TeamComponent, PricingComponent]
})
export class StoreDetailModule { }
