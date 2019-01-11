import { Component, Input, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { DialogService } from '../../dialog/dialog.service';
// import { RouterConfigLoader } from '@angular/router/src/router_config_loader';

@Component({
  selector: 'ngx-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  //Attributes
  public neguxTitle: string;
  public neguxTitleData: string;
  public isMainSearch: boolean = true;

  //Modal
  closeResult: string;

  //Methods
  constructor(
    private dialog: DialogService,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.neguxTitle = "NEGUX INNOVATIONS";
    this.neguxTitleData = "Copyright Negux 2018";
  }

  open(content, title) {
    this.dialog.open(content, {
      data: {
      title: title,
      optionOk: 'Aceptar',
      message: 'Debe de iniciar sesión para poder seguir este producto'
    }});
  }

  goToStoreNegux() {
    this.router.navigate(['./bo/negux.innovations']);
  }
}
