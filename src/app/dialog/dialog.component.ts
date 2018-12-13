import { Component, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { InsertionDirective } from './insertion.directive';
import { Subject } from 'rxjs';
import { DialogRef } from './dialog-ref';
import { DialogConfig } from './dialog-config';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  componentRef: ComponentRef<any>;

  @ViewChild(InsertionDirective)
  insertionPoint: InsertionDirective;
  @ViewChild('modal') modal;

  private readonly _onClose = new Subject<any>();
  public onClose = this._onClose.asObservable();

  childComponentType: Type<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver, 
    private cd: ChangeDetectorRef, 
    private dialogRef: DialogRef,
    private renderer: Renderer2,
    public config: DialogConfig) {}

  ngAfterViewInit() {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  loadChildComponent(componentType: Type<any>) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentFactory);
    this.renderer.addClass(this.modal.nativeElement, 'is-active');
    this.freeze();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  close() {
    this._onClose.next();

    this.renderer.removeClass(this.modal.nativeElement, 'is-active');
    this.unFreeze();
  }

  freeze() {
    document.getElementsByTagName('html')[0].style.overflow = "hidden"
    document.getElementsByTagName('body')[0].style.overflowY = "scroll";
  };

  unFreeze() {
    document.getElementsByTagName('html')[0].style.overflow = ""
    document.getElementsByTagName('body')[0].style.overflowY = "";
  };
}
