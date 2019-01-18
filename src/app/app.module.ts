// ------------------------------------------------------------------------------
// Import Angular libs
// ------------------------------------------------------------------------------
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

// ------------------------------------------------------------------------------
// Import Modules
// ------------------------------------------------------------------------------
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { WelcomeModule } from "./features/welcome/welcome.module";
import { ContactModule } from "./features/contact/contact.module";
import { MainSearchModule } from "./features/main-search/main-search.module";
import { SearchResultModule } from "./features/search-result/search-result.module";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { StoreDetailModule } from "./features/store-detail/store-detail.module";
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";
import { NotFoundModule } from "./features/not-found/not-found.module";
import { FacebookModule } from "ngx-facebook/dist/esm/facebook.module";
import { DialogModule } from "./dialog/dialog.module";

// ------------------------------------------------------------------------------
// Import Routings
// ------------------------------------------------------------------------------
import { AppRoutingModule } from "./app-routing.module";

// ------------------------------------------------------------------------------
// Import global error handling
// ------------------------------------------------------------------------------
import { GlobalErrorHandler } from "./global-error-handler";

// ------------------------------------------------------------------------------
// Import Components
// ------------------------------------------------------------------------------
import { AppComponent } from "./app.component";

// ------------------------------------------------------------------------------
// Import SSR components
// ------------------------------------------------------------------------------
import { PLATFORM_ID, APP_ID, Inject } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

// ------------------------------------------------------------------------------
// Import environments
// ------------------------------------------------------------------------------
import { environment } from "../environments/environment";

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: "marleyapp" }),
    FormsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    WelcomeModule,
    ContactModule,
    MainSearchModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    SearchResultModule,
    StoreDetailModule,
    SlickCarouselModule,
    ScrollToModule.forRoot(),
    NotFoundModule,
    FormsModule,
    DialogModule
  ],
  declarations: [AppComponent],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {
    if (!environment.production) {
      const platform = isPlatformBrowser(platformId)
        ? "in the browser"
        : "on the server";
      console.log(`Running ${platform} with appId=${appId}`);
    }
  }
}
