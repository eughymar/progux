// ------------------------------------------------------------------------------
// Import Angular libs
// ------------------------------------------------------------------------------
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';

// ------------------------------------------------------------------------------
// Import components
// ------------------------------------------------------------------------------
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { TestComponent } from './test/test.component';
import { CountriesListComponent } from "./countries-list/countries-list.component";
//import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { InputSeekerComponent } from './input-seeker/input-seeker.component';
import { SliderComponent } from './slider/slider.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    SlickCarouselModule,
  ],
  declarations: [
    FooterComponent, 
    HeaderComponent,
    TestComponent,
    CountriesListComponent,
    InputSeekerComponent,
    SliderComponent,
    RatingComponent
  ],
  exports: [
    FooterComponent, 
    HeaderComponent,
    TestComponent,
    CountriesListComponent,
    InputSeekerComponent,
    SliderComponent,
    RatingComponent
  ]
})
export class SharedModule {}
