import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-section',
  templateUrl: './title-section.component.html',
  styleUrls: ['./title-section.component.scss']
})
export class TitleSectionComponent implements OnInit {

  constructor() { }

  @Input() title: any;
  @Input() classs: any;

  ngOnInit() {
  }

}
