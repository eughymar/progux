// ------------------------------------------------------------------------------
// Import Angular libs
// ------------------------------------------------------------------------------
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// ------------------------------------------------------------------------------
// Import components/pages
// ------------------------------------------------------------------------------
import { WelcomeComponent } from "./features/welcome/pages/welcome.component";
import { ContactComponent } from "./features/contact/pages/contact.component";
import { PageComponent } from "./features/main-search/components/page/page.component";
import { SearchResultComponent } from './features/search-result/pages/page.component';
import { StoreDetailComponent } from "./features/store-detail/pages/store-detail.component";
import { NotFoundComponent } from "./features/not-found/not-found.component";


// ------------------------------------------------------------------------------
// Import custom preload strategy
// ------------------------------------------------------------------------------
import { SelectivePreloadingStrategy } from "./preloading-strategy";

// ------------------------------------------------------------------------------
// Import environments
// ------------------------------------------------------------------------------
import { environment } from "../environments/environment";

// -----------------------------------------------------------------------------
// Route Configuration
// ------------------------------------------------------------------------------
const routes: Routes = [
  { path: "", component: PageComponent, pathMatch: "full" },
  { path: "contact", component: ContactComponent, data: { preload: true } },
  { path: "searchResult", component: SearchResultComponent },
  { path: 'bo/:id', component: StoreDetailComponent },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: environment.production ? false : true,
      preloadingStrategy: SelectivePreloadingStrategy
    })
  ],
  providers: [SelectivePreloadingStrategy],
  exports: [RouterModule]
})
export class AppRoutingModule {}
