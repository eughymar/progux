/**
 * Created by rep33 on 24/01/2018
 */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationStart, NavigationEnd } from '@angular/router';

// Services

import { SharedService } from '../../core/services/shared.service';
import { SharingDataService } from '../../core/services/sharing.data.service';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
    selector: 'input-seeker',
    templateUrl: './input-seeker.component.html',
    styleUrls: ['./input-seeker.component.scss']
})

export class InputSeekerComponent implements OnInit{
    @Input() public classs: string;

    //Attributes
    wordsearch: string;
    categories = [];
    currentCategory;
    selectedCategory;
    model: any ={
      idCategory: '0'
    };
    isMainSearcher: boolean = false;

    //Methods
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private _sharedService: SharedService,
      private _sharingDataService : SharingDataService
    ){
      // review url, mainSearcher
      this.router.events.subscribe(
        (event: Event) => {
          if(event instanceof NavigationEnd){
            if(event.url === "/mainSearcher" || event.url === "/") this.isMainSearcher = true;
            else this.isMainSearcher = false;
          }
        }
      )
    }

    ngOnInit(){
      this.route.queryParams.subscribe(
        params => {
          this.wordsearch = params['query']||"";
          this.model.idCategory = params['category']||'0';
        }
      )
      this.getCategories();
    }

    getCategories(){
      this._sharedService.getCategories()
        .subscribe((result:any) => {
          result.sort(function(a, b) {
            return a.idCategory - b.idCategory;
          });
          this.categories = result;
          this.currentCategory = this.categories[0];
        },
        error => {
          let errorMessage = <any>error;
          console.log(errorMessage);
        }
      );
    }

    onChange(newCategory){
      this.currentCategory = this.categories.filter(value => value.idCategory == parseInt(newCategory))[0];
    }

    // addProduct(){
    //   var info = {
    //     "nameProduct": "snombre producto adidas '25228  4'",
    //     "idCategory": 2,
    //     "urlImageProduct": "/images/product8.jpg",
    //     "descriptionProduct": "descripcion del producto 4",
    //     "starsProduct": 3,
    //     "priceProduct": 20.8,
    //     "offerPriceProduct": 0,
    //     "idStore": 25228
    //   };
    //   this._sharedService.postProduct(info).subscribe(
    //     res => {
    //       console.log(res);
    //     }
    //   )
      
    // }

    search() {
      var country = this._sharingDataService.getCountry();

      var idCategory = this.currentCategory.idCategory;
      // debugger;
      var params = {
        queryParams:{ 
          query: this.wordsearch,
          category: idCategory,
          country: country.idCountry
        }
      };
      
      this.router.navigate(['/searchResult'], params);
    }

    // searchC = (text$: Observable<string>) =>
    // text$
    //   .debounceTime(200)
    //   .distinctUntilChanged()
    //   .map((term) => {
    //       (term.length < 2) ? []: states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
    //   });
}



