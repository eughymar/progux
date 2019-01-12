import { Component, OnInit, Input } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
import { environment } from '../../../../../environments/environment';
import { Subject } from 'rxjs';
import { DialogService } from '../../../../dialog/dialog.service';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

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
  urlVideo: any = 'https://www.youtube.com/embed/88NPJsceU_8?autoplay=1';

  public static updateActions: Subject<boolean> = new Subject();

  constructor(
    private dialogService: DialogService,
    private fb: FacebookService,
    private _scrollToService: ScrollToService
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
        // console.log(res);
      })
      .catch((e: any) => console.error(e));
  }

  public showVideo(content): void {
    this.dialogService.open(content, {
      data: {
        optionOk: 'Aceptar',
        size: 'large'
      }
    });
  }

  public triggerScrollTo(section): void {
    const config: ScrollToConfigOptions = {
      target: section,
      offset: -60,
      duration: 1500
    };
    this._scrollToService.scrollTo(config);
  }
}
