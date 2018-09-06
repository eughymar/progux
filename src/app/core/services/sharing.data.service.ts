import { Injectable } from '@angular/core';

@Injectable()

export class SharingDataService{
  
  country: any;

  setCountry(data: any){
    this.country = data;
  }

  getCountry():any{
    return this.country;
  }
}