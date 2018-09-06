import { Injectable } from '@angular/core';

@Injectable()

export class LocalStorageService{

  category_key: string = 'category';
  country_key: string = 'country';
  query_key: string = 'query';
  token_key: string = 'token';
  profile_key: string = 'profile';
  username_key: string = 'username';

  setQuery(value){
    localStorage.setItem(this.query_key, JSON.stringify(value));
  }

  getQuery(){
    return JSON.parse(localStorage.getItem(this.query_key));
  }

  setCategory(value){
    localStorage.setItem(this.category_key, JSON.stringify(value));
  }

  getCategory(){
    return JSON.parse(localStorage.getItem(this.category_key));
  }

  setCountry(value){
    localStorage.setItem(this.country_key, JSON.stringify(value));
  }

  getCountry(){
    return JSON.parse(localStorage.getItem(this.country_key));
  }

  setToken(value){
    localStorage.setItem(this.token_key, JSON.stringify(value));
  }

  getToken(){
    return JSON.parse(localStorage.getItem(this.token_key));
  }

  removeToken(){
    localStorage.removeItem(this.token_key);
  }

  setProfile(value){
    localStorage.setItem(this.profile_key, JSON.stringify(value));
  }

  getProfile(){
    return JSON.parse(localStorage.getItem(this.profile_key));
  }

  setUsername(value){
    localStorage.setItem(this.username_key, JSON.stringify(value));
  }

  getUsername(){
    return JSON.parse(localStorage.getItem(this.username_key));
  }

  isLogged(){
    // if(this.getToken())return true;
    // else return false;
    if(this.getToken())return true;
    else return false;
  }

  clear(){
    localStorage.removeItem(this.profile_key);
    localStorage.removeItem(this.token_key);
    localStorage.removeItem(this.username_key);
  }
}