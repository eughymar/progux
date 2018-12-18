import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit
} from '@angular/core';

import { TabComponent } from './tab.component';

@Component({
  selector: 'my-tabs',
  template: `
    <div class="tabs">
      <ul>
        <li *ngFor="let tab of tabs" (click)="selectTab(tab)" [class.is-active]="tab.active">
          <a class="title"><strong>{{tab.title}}</strong></a>
        </li>
      </ul>
    </div>
    <ng-content></ng-content>
  `,
  styles: [
    `
    .title {
      font-size: 0.9rem;
    }
    .tabs {
      margin-bottom: 1rem;
    }
    `
  ]
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab) => tab.active);

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab) {
    this.tabs.toArray().forEach(tab => tab.active = false);

    tab.active = true;
  }
}
