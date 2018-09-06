import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from './localStorage.service';

@Injectable()

/**
 * Service for http requests
 * @class
 */
export class SharedService{
	private URL: string = environment.service_api_url;

	/**
	 * Service constructor
	 * @param _http HttpClient instance
	 * @param _localStorage Localstorage instance
	 */
	constructor(
		private _http: HttpClient,
		private _localStorage: LocalStorageService
	){}
	
	/**
	 * Get categories list
	 */
  getCategories(){
    return this._http.get(this.URL+'/categories/listCategories');
  }
	
	/**
	 * Get countries list
	 */
	getCountries(){
		return this._http.get(this.URL+'/countries/listCountries');
	}

	/**
	 * Get Admin Store Key
	 */
	getAdminKey(idUser, token){
		return this._http.post(this.URL+'/sessions/addSession?idUser='+idUser+'&lastToken='+token,{});
	}

	/**
   * The user has a store?
   * @param {string} idUser User id
   */
	storeIsCreated(idUser){
    return this._http.get(this.URL+'/stores/storeByIdUser?idUser='+idUser);
	}
	
	/**
   * If name store size is > 18 then add '...'
   * @param {string} name
   * @returns {string}
   */
  name(name: string): string{
    let newName = name;
    if(newName.length > 18){
      newName = newName.substr(0,18)+'...';
    }
    return newName;
  }

	// /**
	//  * Log in with facebook information
	//  * @param {object} data Facebook user profile
	//  */
	// login(data: any){
	// 	console.log("LOGIN ---> ",data);
	// 	return this._http.post(this.URL_SERVER+'/login', data);
	// }

	// /**
	//  * Log in with negux information
	//  * @param {string} user User's name
	//  * @param {string} pass User's password
	//  */
	// loginByNegux(user, pass){
	// 	return this._http.post(this.URL_SERVER+
	// 		'/loginNegux',{'username': user, 'password': pass});
	// }
}
