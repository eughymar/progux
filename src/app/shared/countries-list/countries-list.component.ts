/**
 * Created by rep33 on 24/01/2018
 */
import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../core/services/shared.service';
import { SharingDataService } from '../../core/services/sharing.data.service';
import { Router }from '@angular/router';

//Services

@Component({
  selector: 'countries-list',
  templateUrl: 'countries-list.component.html',
  styleUrls:['countries-list.component.scss']
})

export class CountriesListComponent implements OnInit{

  //Attributes
  countries;
  currentCountry;
  @Input() isMainSearch;  

  //Methods
  constructor( 
    private _sharedService: SharedService,
    private _sharingDataService: SharingDataService,
    private router: Router
  ){}
  
  ngOnInit(){
    this.getCountries();
    window.console.log('aaaa');
  }

  goToMainSearcher(){
    this.router.navigate(['./mainSearcher']);
  }

  getCountries(){
    this._sharedService.getCountries()
      .subscribe(result => {
        this.countries = result;
        this.currentCountry = this.countries[0];
        this._sharingDataService.setCountry(this.currentCountry);
      },
      error => {
        let errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }

  onChange(newCountry){
    console.log("----NEW COUNTRY------->", newCountry);
    this.currentCountry = this.countries.filter(value => value.idCountry == parseInt(newCountry))[0];
    this._sharingDataService.setCountry(this.currentCountry);
  }
}
