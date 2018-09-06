/**
 * Created by znarf on 1/22/18.
 * Modified by rep on 24/01/2018
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';

// modules
import { SharedModule } from '../../shared/shared.module';

// componentes
import { PageComponent } from './components/page/page.component';

// routes
export const ROUTES: Routes = [
  { path:'', component: PageComponent }
];

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    PageComponent
  ]
})
export class MainSearchModule {}
