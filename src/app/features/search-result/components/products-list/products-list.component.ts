/**
 * Created by znarf on 1/24/18.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchResultService } from '../../services/search-result.service';

@Component({
  selector: 'ngx-products-list',
  templateUrl: 'products-list.component.html'
})

export class ProductsListComponent implements OnInit{

  _query: string='';
  products: Array<any>=[];
  imagesFound: boolean = false;
  searching: boolean = false;
  productsCount: number;
  // scrollDistance = 2;
  // scrollThrottle = 1000;
  finished: boolean = false;
  searchQuery: string;
  quantity: number = 8;
  idx: number = 0;
  idCountry: string='1';      // pass like input parameter
  idCategory: string = '1';   // pass like input parameter

  @Input() title: string; // title parameter

  constructor(
    private route: ActivatedRoute,
    private searchResultService: SearchResultService
  ){}

  ngOnInit(){
    this.route.queryParams
      .subscribe(params => {
        this.searchQuery = params['query'] || '';
        this.idCategory = params['category'] || '';
        this.idCountry = params['country'] || '';

        this.idx = 0;
        this.quantity = 8;
        this.products = [];
        this.getTotalProducts();
      });
  }

  getTotalProducts(){
    this.searchResultService
      .getTotalProducts(this.idCountry, this.idCategory, this.searchQuery)
      .subscribe(
        (result: any) => {
          this.productsCount = result;
          this.getProducts();
        },
        error => {
          let errorMessage = <any>error;
          console.log(errorMessage);
        }
      );
  }

  getProducts(){
    this.searching = true;
    this.imagesFound = false;
    this.searchResultService
      .getProductsBySearch(this.idCategory, this.idCountry, this.idx, this.quantity, this.searchQuery)
      .subscribe(
        (result: any) => {
          this.searching = false;
          if(this.products && result.length!=0) {
            for(var i=0;i<result.length;i++){
              this.products.push(result[i]);
            }
            this.idx+=this.quantity;
          }else{
            this.finished = true;
          }
          // console.log(this.idx + " - "+ this.productsCount)
          if(this.idx >= this.productsCount){
            this.finished = true;
          }
        },
        error => {
          let errorMessage = <any>error;
          console.log(errorMessage);
        }
      );
  }
}
