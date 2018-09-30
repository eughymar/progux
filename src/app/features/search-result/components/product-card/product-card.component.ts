/**
 * Created by znarf on 1/24/18.
 */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { SearchResultService } from '../../services/search-result.service';

@Component({
  selector: 'app-product-card',
  templateUrl: 'product-card.component.html',
  styleUrls:['product-card.component.scss']
})

export class ProductCardComponent implements OnInit{

  @Input() data: any;

  url = environment.service_api_url;

  constructor(
    private router: Router,
    private _searchResultService: SearchResultService
  ){}

  ngOnInit(){
    this.data.newPrice = this._searchResultService.newPrice(this.data.priceProduct, parseInt(this.data.percentDiscount));
    this.data.nameProduct = this._searchResultService.nameProduct(this.data.nameProduct);
  }

  productDetail(product){
    this.router.navigate(['./productDetail',product.idProduct]);
  }

  storeDetail(product){
    this.router.navigate(['./bo',product.store.nameUrlStore]);
  }
}
