import { Component, Input, OnInit } from '@angular/core';
import { DialogConfig } from './dialog-config';

@Component({
  selector: 'dialog-info',
  template: `
    <div class="info">
      {{ message }}
    </div>
  `
})
export class DialogInfoComponent implements OnInit{
  
  message: any;

  constructor(
    public config: DialogConfig
  ) {}

  ngOnInit() {
    this.message = this.config.data.message;
  }
}
