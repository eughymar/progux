import { Component, OnInit, Input } from "@angular/core";

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: 'team.component.html',
  styleUrls: ['team.component.scss']
})

export class TeamComponent implements OnInit {

  @Input() team: any;

  url = environment.service_api_url;

  constructor() { }

  ngOnInit() {
    // console.log(this.team);
  }
}
