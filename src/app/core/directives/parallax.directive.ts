import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  
  image: any;
  parent: any;
  
  @Input('ratio') parallaxRatio: number = 1
  initialTop: number = 0
  
  constructor(
    private eleRef: ElementRef,
    private renderer: Renderer2
    ) {
    this.initialTop = this.eleRef.nativeElement.getBoundingClientRect().top;
  }
  
  @HostListener("window:scroll", ["$event"])

  onWindowScroll(event) {
    this.renderer.setStyle(this.eleRef.nativeElement, 'top', (this.initialTop - (window.scrollY * this.parallaxRatio)) + 'px');
  }

}
