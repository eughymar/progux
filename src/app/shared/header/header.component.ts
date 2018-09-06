// ------------------------------------------------------------------------------
// Import Angular libs
// ------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  //Attributes
  componentHeader: string;
  isMainSearcher: boolean = true;
  isBussines: boolean = true;
  profileOptions: any;

  //Methods
  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationStart) {
          this.isBussines = event.url.substring(0, 4) === "/bo/";
          this.isMainSearcher = event.url === "/mainSearcher" || event.url === "/";
        } 
      }
    )
  }

  ngOnInit() {
    this.componentHeader = "Header NGX";
  }
}

