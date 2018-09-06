/**
 * Created by rep33 on 24/01/2018
 */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { environment } from '../../../environments/environment';
import { SharedService } from '../../core/services/shared.service';
import { LocalStorageService } from '../../core/services/localStorage.service';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';


import { HttpResponse } from '@angular/common/http';

import { Subject } from 'rxjs';

// import { ImageDataComponent } from '../../../modules/product-detail/components/image-data/image-data.component';
// import { ActionsComponent } from '../../../modules/store-detail/components/actions/actions.component';
// import { PageComponent } from '../../../modules/user-profile/components/page/page.component';

/**
 * Component configuration
 */
@Component({
	selector: 'profile-options',
	templateUrl: 'profile-options.component.html',
	styleUrls:['./profile-options.component.scss']
})

/**
 * This component show headers options, log in, shopping cart, store, notifications
 * @class
 */
export class ProfileOptionsComponent implements OnInit{

	profileOptions: any;
	isAuthenticated: boolean;
	closeResult: string;
	user: any;
	password: string;
	notificationNum:number=10;
	serverUrl: string;
	adminStoreUrl: string;
	userHasStore = true;

	public static updateUserStatus: Subject<boolean> = new Subject();

	constructor(
		private fb: FacebookService,
		private _sharedService: SharedService,
		private router: Router,
		private _localStorage: LocalStorageService,
		// private modalService: NgbModal
	){
		ProfileOptionsComponent.updateUserStatus.subscribe(
			(res)=>{
				console.log("UPDATE USER STATUS!!!");
				this.initParams();
			}
		);
		this.initParams();
	}

	ngOnInit(){
		ProfileOptionsComponent.updateUserStatus.subscribe(
			(res)=>{
				console.log("UPDATE USER STATUS!!!");
				this.initParams();
			}
		);
		this.initParams();
	}

	initParams(){
		this.serverUrl = environment.service_api_url;
		this.adminStoreUrl = environment.admin_store_url;

		this.isAuthenticated = this._localStorage.isLogged();
		if(this.isAuthenticated){
			this.user = this._localStorage.getProfile();
			this.hasStore();
		}else{
			this.isAuthenticated = false;
		}
	}

	hasStore(): void{
    this._sharedService.storeIsCreated(this._localStorage.getProfile().idUser).subscribe(
      (result) => {
        this.userHasStore = (result['message'])?true:false;
      },
      (error) => {
        console.log(error);
      }
    )
	}
	
	goToWizard(): void{
		this.router.navigate(['./wizardStore']);
	}

	/**
	 * Clean localstorage and set isAuthenticate to false
	 */
	// logout(){
	// 	this._localStorage.clear();
	// 	this.isAuthenticated = false;
		
	// 	let url = window.location.href;
	// 	if(url.indexOf('productDetail')!== -1){
	// 		ImageDataComponent.updateImageData.next(true);
	// 	}else if(url.indexOf('storeDetail')!== -1){
	// 		ActionsComponent.updateActions.next(true);
	// 	}else if(url.indexOf('userProfile')!== -1){
	// 		PageComponent.profileLogout.next(true);
	// 	}
	// 	else if(url.indexOf('wizardStore')!==-1){
	// 		this.router.navigate(['./logIn']);
	// 	}
	// }

	loginFacebookStatus(){
		this.fb.getLoginStatus()
			.then((response: any) => {
				console.log("Login Status --> ",response);
			});
	}
	
	logoutFromFacebook(){
		this.fb.getLoginStatus()
			.then((response: any) => {
				console.log(response);
				if(response && response.status === 'connected'){
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
	goToUserProfile(){
		this.router.navigate(['./userProfile', this.user.idUser]);
	}

	/**
	 * Navigate to log in page
	 */
	goToLogIn(){
		this.router.navigate(['./logIn']);
	}

	goToAdminStore(): void{
		this._sharedService.getAdminKey(this.user.idUser, this._localStorage.getToken()).subscribe(
			(response:any) => {
				window.open(this.adminStoreUrl+"/neguxAdminStore/faces/index.xhtml?key="+response.lastKey,"");
			},
			(error: any) => {
				console.log(error);
			}
		)
	}

	// openNoLoggedModal(content): void{
	// 	this.modalService.open(content).result.then((result) => {
	// 		this.closeResult = `Closed with: ${result}`;
	// 	}, (reason) => {
	// 		this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	// 	});
	// }

// 	private getDismissReason(reason: any): string {
//     if (reason === ModalDismissReasons.ESC) {
//       return 'by pressing ESC';
//     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
//       return 'by clicking on a backdrop';
//     } else {
//       return  `with: ${reason}`;
//     }
//   }
}
