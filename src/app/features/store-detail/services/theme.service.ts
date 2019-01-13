/* 18/02/2018 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  nameTheme: string;

  themeChange: Subject<string> = new Subject<string>();

  constructor() {
    this.themeChange.subscribe((value) => {
      this.nameTheme = value;
      
    });
  }

  toggleSidebarVisibility(name) {
    this.themeChange.next(name);
  }
}
