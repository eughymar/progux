import { Component, OnInit, ViewChild, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-main-searcher',
  templateUrl: 'page.component.html',
  styleUrls:['./page.component.scss'],
})
export class PageComponent implements OnInit{

  constructor(
    private elem: ElementRef,
    private renderer: Renderer2
  ) { }
  
  @ViewChild('content') content: ElementRef;

  ngOnInit(){
    this.effect();
  }

  effect() {
    setTimeout(() => {
      const LISTA = this.elem.nativeElement.querySelectorAll('.bg');
      for (var i = 0; i < LISTA.length; i ++) {
        this.renderer.setStyle(LISTA[i], 'animation-play-state', 'paused');
      }
      this.renderer.addClass(this.content.nativeElement, 'transition-on');
    }, 7000);
    // }, 17000);
  }
}
