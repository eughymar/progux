// ------------------------------------------------------------------------------
// Import Angular libs
// ------------------------------------------------------------------------------
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

// ------------------------------------------------------------------------------
// Import components
// ------------------------------------------------------------------------------
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { TestComponent } from './test/test.component';
import { CountriesListComponent } from "./countries-list/countries-list.component";
import { ProfileOptionsComponent } from './profile-options/profile-options.component';
import { InputSeekerComponent } from './input-seeker/input-seeker.component';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule
  ],
  declarations: [
    FooterComponent, 
    HeaderComponent,
    TestComponent,
    CountriesListComponent,
    ProfileOptionsComponent,
    InputSeekerComponent
  ],
  exports: [
    FooterComponent, 
    HeaderComponent,
    TestComponent,
    CountriesListComponent,
    ProfileOptionsComponent,
    InputSeekerComponent
  ]
})
export class SharedModule {}
