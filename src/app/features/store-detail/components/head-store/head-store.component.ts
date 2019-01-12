/* 09/02/2018 */

import { Component, OnInit, Input, OnChanges, SimpleChanges, HostListener, Renderer2, Inject, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../../../../../environments/environment';
import { LocalStorageService } from '../../../../core/services/localStorage.service';
import { StoreDetailService } from '../../services/store-detail.service';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { FacebookService, InitParams, UIParams, UIResponse } from "ngx-facebook/dist/esm";
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-head-store',
  templateUrl: 'head-store.component.html',
  styleUrls: ['head-store.component.scss'],
})

export class HeadStoreComponent implements OnInit, OnChanges {

  @Input() data: any;

  @Input() storeName: string;
  @Input() urlLogo: string;
  @Input() description: string; // description store

  nameStore: string;
  logoStore: string;
  scoreStore: number;
  numberOpinios: number;
  socialNetworkContact: any;
  imagesSourceStore: Array<any> = [];
  url: string = environment.service_api_url;
  idStore: string;
  pixeles: number;
  nameLogo: string;
  activeMenuMobile: boolean = false;
  idUser: string;
  closeResult;
  followingReady: boolean = false;
  isFollowing: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _scrollToService: ScrollToService,
    private fb: FacebookService,
    private _localStorage: LocalStorageService,
    private _storeDetailService: StoreDetailService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    // customize default values of ratings used by this component tree
    // config.max = 5;
    // config.readonly = true;
  }

  @ViewChild('navbar') navbar: ElementRef;

  @HostListener('window:scroll') verificar() {
    if (this.document.documentElement.scrollTop > 10) {
      this.renderer.addClass(this.navbar.nativeElement, 'menu-fixed');
    } else {
      this.renderer.removeClass(this.navbar.nativeElement, 'menu-fixed');
    }
  }

  ngOnInit() {
    this.idStore = this.data.store.idStore;
    this.pixeles = window.innerWidth;
    let nameSplit = this.data.store.nameStore.split(" ");
    let firstChar = nameSplit[0][0];
    let secondChar = (nameSplit.length > 1) ? nameSplit[1][0] : '';
    this.nameLogo = firstChar + secondChar;

    // init facebook params
    let initParams: InitParams = {
      appId: environment.facebook_id,
      xfbml: true,
      version: 'v2.12',
      cookie: true
    };
    this.fb.init(initParams);

    // If logged, check if the store is followed
    if (this._localStorage.isLogged()) {
      this.idUser = this._localStorage.getProfile().idUser;
      // store is followed
      this.followingReady = false;
      this._storeDetailService.isFollowed(this.idStore, this.idUser).subscribe(
        (res) => {
          // console.log(res);
          this.isFollowing = (res["message"] !== "false") ? true : false;
          this.followingReady = true;
        },
        (error) => {
          console.log(error);
        }
      );
    } {
      this.followingReady = true;
      this.isFollowing = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      if (this.data.store.urlBanner1Store)
        this.imagesSourceStore.push(this.url + this.data.store.urlBanner1Store);

      if (this.data.store.urlBanner2Store)
        this.imagesSourceStore.push(this.url + this.data.store.urlBanner2Store);

      if (this.data.store.urlBanner3Store)
        this.imagesSourceStore.push(this.url + this.data.store.urlBanner3Store);
    }
  }

  goToAssessmentStore() {
    this.router.navigate(['./storeAssessment', this.data.store.nameUrlStore]);
  }

  triggerScrollTo(section) {
    const config: ScrollToConfigOptions = {
      target: section,
      offset: -60,
      duration: 1500
    };
    this._scrollToService.scrollTo(config);
  }

  @HostListener('window: resize', ['$event'])
  onResize(event) {
    this.pixeles = event.target.innerWidth;
  }

  verificate() {
    this.activeMenuMobile = !this.activeMenuMobile;
  }

  /**
	 * Share store in facebook
	 */
  shareStore(): void {
    const shareUrl = window.location.href;
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

    this.fb.ui(params)
      .then((res: UIResponse) => {
      })
      .catch((e: any) => console.error(e));
  }

  /**
	 * Follow an store if the user is log in
	 * @param content This is the modal template
	 */
  // followStore(content) {
  //   if (!this._localStorage.isLogged()) {
  //     this.modalService.open(content).result.then(
  //       (result) => {
  //         this.closeResult = `Closed with: ${result}`;
  //       },
  //       (reason) => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //       });
  //   } else {
  //     var temp = {
  //       idStore: +this.idStore,
  //       idUser: this._localStorage.getProfile().idUser
  //     };
  //     // unfollow store
  //     if (this.isFollowing) {
  //       this.modalService.open(content).result.then(
  //         (result) => {
  //           this.closeResult = `Closed with: ${result}`;
  //           this._storeDetailService.unfollowStore(temp).subscribe(
  //             (result) => { this.isFollowing = false; })
  //         },
  //         (reason) => {
  //           this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //         });
  //     } else {
  //       // follow store
  //       this._storeDetailService.followStore(temp).subscribe(
  //         (result) => { this.isFollowing = true; }
  //       )
  //     }
  //   }
  // }

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
}
