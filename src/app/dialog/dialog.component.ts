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
  childTemplateType: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver, 
    private cd: ChangeDetectorRef, 
    private dialogRef: DialogRef,
    private renderer: Renderer2,
    public config: DialogConfig) {}

  ngAfterViewInit() {
    this.load();
    // this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  onOverlayClicked(evt: MouseEvent) {
    this.dialogRef.close();
  }

  onDialogClicked(evt: MouseEvent) {
    evt.stopPropagation();
  }

  load() {
    let viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();
    if (this.childComponentType) {
      this.loadChildComponent(this.childComponentType, viewContainerRef);
    }
    if (this.childTemplateType) {
      this.loadChildTemplate(this.childTemplateType, viewContainerRef);
    }
    this.renderer.addClass(this.modal.nativeElement, 'is-active');
    this.freeze();
  }

  loadChildComponent(componentType: Type<any>, viewContainerRef) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  loadChildTemplate(content, viewContainerRef) {
    viewContainerRef.createEmbeddedView(content);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  accept() {
    this.dialogRef.close(true);
    this.close();
  }

  cancel() {
    this.dialogRef.close(false);
    this.close();
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
