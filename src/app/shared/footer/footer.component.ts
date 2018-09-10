/**
 * Created by rep33 on 24/01/2018
 */
import { Component, Input, OnInit } from '@angular/core';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { UtilService } from '../../core/services/util.service';
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

  //Modal
  closeResult: string;

  //Methods
  constructor(
    // private modalService: NgbModal,
    private router: Router,
    ) {
  }

  ngOnInit() {
    this.neguxTitle = "NEGUX INNOVATIONS";
    this.neguxTitleData = "Copyright Negux 2018";
  }

  //Methos for modal
  // open(content) {
  //   this.modalService.open(content).result.then((result) => {
  //     this.closeResult = 'Closed with: ${result}';
  //   }, (reason) => {
  //     this.closeResult = 'Dismissed ${this.getDismissReason(reason)}';
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return 'with: ${reason}';
  //   }
  // }

  goToStoreNegux() {
    this.router.navigate(['./bo/negux.innovations']);
  }
}
