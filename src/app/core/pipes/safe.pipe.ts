import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
@Injectable() 

export class SafePipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) { }

  transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {

    switch (type) {
      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      case 'urlStyle': return this.sanitizer.bypassSecurityTrustStyle(`url('${value}')`);
      default: throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
