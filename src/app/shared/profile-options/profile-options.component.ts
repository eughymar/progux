import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';

import { environment } from '../../../environments/environment';
import { SharedService } from '../../core/services/shared.service';

import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../../core/services/localStorage.service';


@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss']
})

/**
 * This component show headers options, log in, shopping cart, store, notifications
 * @class
 */
export class ProfileOptionsComponent implements OnInit {

  profileOptions: any;
  isAuthenticated: boolean;
  closeResult: string;
  user: any;
  password: string;
  notificationNum: number = 10;
  serverUrl: string;
  adminStoreUrl: string;
  registratorAdminUrl: string;
  userHasStore = null;
  idStore: string;

  public static updateUserStatus: Subject<boolean> = new Subject();

	/**
	 * Component constructor
	 * @param fb FacebookService instance
	 * @param sharedService SharedService instance
	 * @param router Router instance
	 * @param _localStorage LocalStorageService instance
	 * @param modalService NgbModal instance
	 */
  constructor(
    private fb: FacebookService,
    private _sharedService: SharedService,
    private router: Router,
    private _localStorage: LocalStorageService,
    // private modalService: NgbModal
  ) {
    ProfileOptionsComponent.updateUserStatus.subscribe(
      (res) => {
        // console.log("UPDATE USER STATUS!!!");
        this.initParams();
      }
    );
    this.initParams();
  }

  ngOnInit() {
    // ProfileOptionsComponent.updateUserStatus.subscribe(
    // 	(res)=>{
    // 		console.log("UPDATE USER STATUS!!!");
    // 		this.initParams();
    // 	}
    // );
    // this.initParams();
  }

  initParams() {
    // this.user = this._localStorage.getProfile();
    this.serverUrl = environment.service_api_url;
    this.adminStoreUrl = environment.admin_store_url;
    // this.registratorAdminUrl = environment.registrator_admin_url;
    // let initParams: InitParams = {
    // 	appId: environment.facebook_id,
    // 	xfbml: true,
    // 	version: 'v2.12',
    // 	cookie: true
    // };

    this.isAuthenticated = this._localStorage.isLogged();
    if (this.isAuthenticated) {
      // this.profileOptions = this._localStorage.getProfile();
      this.user = this._localStorage.getProfile();

      // verify if user is register(R) or normal(N)
      if (!this.user.typeUser || this.user.typeUser.toLowerCase() != "r") {
        this.hasStore();
      } else {
        this.userHasStore = true;
      }

    } else {
      this.isAuthenticated = false;
    }

    // this.fb.init(initParams);
    // this.loginFacebookStatus();
  }

  hasStore(): void {
    this._sharedService.storeIsCreated(this._localStorage.getProfile().idUser).subscribe(
      (result: any) => {
        //console.log('result --> ', result);
        this.userHasStore = (result['message']) ? true : false;
        this.idStore = result.message;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  goToWizard(): void {
    this.router.navigate(['./wizardStore']);
  }

	/**
	 * Clean localstorage and set isAuthenticate to false
	 */
  // logout() {
  //   this._localStorage.clear();
  //   this.isAuthenticated = false;
  //   // console.log(this.loginFacebookStatus());
  //   this.logoutFromFacebook();
  //   let url = window.location.href;
  //   if (url.indexOf('productDetail') !== -1) {
  //     ImageDataComponent.updateImageData.next(true);
  //   } else if (url.indexOf('storeDetail') !== -1) {
  //     ActionsComponent.updateActions.next(true);
  //   } else if (url.indexOf('userProfile') !== -1) {
  //     PageComponent.profileLogout.next(true);
  //   }
  //   else if (url.indexOf('wizardStore') !== -1) {
  //     this.router.navigate(['./logIn']);
  //   }
  // }

  loginFacebookStatus() {
    this.fb.getLoginStatus()
      .then((response: any) => {
        console.log("Login Status --> ", response);
        this.logoutFromFacebook();
        // this.isAuthenticated = (response.status === "connected")?true:false;
      });
  }

  logoutFromFacebook() {
    this.fb.getLoginStatus()
      .then((response: any) => {
        console.log(response);
        if (response && response.status === 'connected') {
          this.fb.logout().then(() => {
            this.isAuthenticated = false;
            console.log('Logged out!');
          });
        }
      });
  }

	/**
	 * Navigate to user profile page
	 */
  goToUserProfile() {
    this.router.navigate(['./userProfile', this.user.idUser]);
  }

	/**
	 * Navigate to log in page
	 */
  goToLogIn() {
    this.router.navigate(['./logIn']);
  }

  // goToAdminStore(): void {
  //   this._sharedService.getAdminKey(this.user.idUser, this._localStorage.getToken(), this.idStore).subscribe(
  //     (response: any) => {
  //       window.open(this.adminStoreUrl + "/adminegux/faces/index.xhtml?key=" + response.lastKey, "");
  //     },
  //     (error: any) => {
  //       console.log(error);
  //     }
  //   )
  // }

  // goToRegistratorAdmin(): void {
  //   let idStore = 0;
  //   this._sharedService.getAdminKey(this.user.idUser, this._localStorage.getToken(), idStore).subscribe(
  //     (response: any) => {
  //       window.open(this.registratorAdminUrl + "/verifyKey?key=" + response.lastKey + "&username=" + this._localStorage.getUsername(), "_self");
  //     },
  //     (error: any) => {
  //       console.log(error);
  //       // window.open(this.registratorAdminUrl+"/verifyKey?key="+error.error.lastKey+"&username="+this._localStorage.getUsername(),"_self");
  //     }
  //   )
  // }

  // openNoLoggedModal(content): void {
  //   this.modalService.open(content).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

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
