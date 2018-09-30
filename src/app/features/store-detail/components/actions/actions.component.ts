import { Component, OnInit, Input } from '@angular/core';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FacebookService, InitParams, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';

import { environment } from '../../../../../environments/environment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-actions',
  templateUrl: 'actions.component.html',
  styleUrls: ['actions.component.scss']
})

export class ActionsComponent implements OnInit {

  @Input() data: any;

  idStore: string;
  storeName: string;
  urlLogo: string;
  description: string;
  closeResult;
  isFollowing: boolean = false;
  url: string = environment.service_api_url;
  idUser: string;
  followingReady: boolean = false;
  urlVideo: any = 'https://www.youtube.com/embed/88NPJsceU_8';

  public static updateActions: Subject<boolean> = new Subject();

  constructor(
    // private modalService: NgbModal,
    private fb: FacebookService,

  ) { }

  ngOnInit() {

		/**
		 * TODO: change this to head-store
		*/
    ActionsComponent.updateActions.subscribe(
      (res) => { this.initParams(); }
    );
    this.initParams();
  }

  /**
	 * This method initialize local params
	 */
  initParams() {
    if (this.data.store.urlVideo) {
      let url = this.data.store.urlVideo, posIni = 0;
      posIni = url.indexOf("?v=") + 3;
      this.urlVideo = "https://www.youtube.com/embed/" + url.substr(posIni, url.length);
    }

    // init facebook params
    let initParams: InitParams = {
      appId: environment.facebook_id,
      xfbml: true,
      version: 'v2.12',
      cookie: true
    };
    this.fb.init(initParams);
  }

	/**
	 * Share store in facebook
	 */
  shareStore(): void {
    const shareUrl = window.location.href;
    // console.log(this.storeName)
    // console.log(this.description);
    // console.log(shareUrl);
    // console.log(this.url+this.urlLogo);

    const params: UIParams = {
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': shareUrl,
          'og:title': this.storeName,
          'og:description': this.description,
          'og:image': this.url + this.urlLogo,
          'og:image:width': '350',
          'og:image:height': '350',
          'og:image:type': 'image/jpeg'
        }
      })
    };

    // let params: UIParams = {
    // 	href: window.location.href,
    // 	method: 'share'
    // };
    this.fb.ui(params)
      .then((res: UIResponse) => {
        // console.log(res);
      })
      .catch((e: any) => console.error(e));
  }

  /**
	 * Show the reason to close the modal
	 * @param reason
	 */
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  // public showVideo(content): void {
  //   this.modalService.open(content, { size: 'lg' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
}
