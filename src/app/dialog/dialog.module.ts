import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { InsertionDirective } from './insertion.directive';
import { DialogInfoComponent } from './dialog-info.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DialogComponent, 
    InsertionDirective,
    DialogInfoComponent
  ],
  entryComponents: [DialogComponent, DialogInfoComponent]
})
export class DialogModule {}
