// ------------------------------------------------------------------------------
// Angular libs
// ------------------------------------------------------------------------------
import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { SharedService } from './services/shared.service';
import { LocalStorageService } from './services/localStorage.service';
import { SharingDataService } from './services/sharing.data.service';
import { UtilService } from "./services/util.service";
import { SafePipe } from "./pipes/safe.pipe";
import { ParallaxDirective } from './directives/parallax.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SharedService,
    LocalStorageService,
    SharingDataService,
    UtilService,
    SafePipe
  ],
  declarations: [ParallaxDirective],
  exports: [ParallaxDirective]
})
export class CoreModule {
  /* Make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error("CoreModule is already loaded. Import only in AppModule");
    }
  }
}