import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()

/**
 * Service for http request
 * @class
 */
export class SearchResultService{

  private URL: string = environment.service_api_url;

  /**
   * Service constructor
   * @constructor
   * @param _http HttpClient instance
   */
  constructor(private _http: HttpClient){}

  /**
   * Get Store's products
   * @param {number} idCat Category id
   * @param {number} idCountry Country id
   * @param {number} idx From index
   * @param {number} qty Quantity products
   * @param {string} txtSearch Text searched
   */
  getProductsBySearch(idCat, idCountry, idx, qty, txtSearch){
    return this._http.get(this.URL+
      '/products/listProductsBySearch?idCategory='+idCat+'&idCountry='+idCountry+'&idx='+idx+'&qty='+qty+'&txtSearch='+txtSearch);
  }

  /**
   * Get stores related text searched
   * @param {number} idCat Category id
   * @param {number} idCountry Country id
   * @param {number} idx From index
   * @param {number} qty Quantity stores
   * @param {string} txtSearch Text searched
   */
  getStoreSlider(idCat, idCountry, idx, qty, txtSearch){
    return this._http.get(this.URL+
      '/stores/listStoresBySearch?idCategory='+idCat+'&idCountry='+idCountry+'&idx='+idx+'&qty='+qty+'&txtSearch='+txtSearch);
  }

  /**
   * Get products total
   * @param {number} idCountry Country id
   * @param {number} idCat Category id
   * @param {string} txtSearch Text searched
   */
  getTotalProducts(idCountry, idCat, txtSearch){
    return this._http.get(this.URL+
      '/products/countProductsBySearch?idCountry='+idCountry+'&idCategory='+idCat+'&txtSearch='+txtSearch);
  }

  /**
   * Create new price
   * @param {number} priceProduct
   * @param {number} percentDiscount
   * @returns {number} newPrice
   */
  newPrice(priceProduct: number, percentDiscount:number): number{
    let newPrice = priceProduct;
    if(percentDiscount!=0){
      newPrice = priceProduct - (priceProduct * (percentDiscount/100));
    }
    return newPrice;
  }

  /**
   * If name product size is > 30 then add '...'
   * @param {string} name
   * @returns {string}
   */
  nameProduct(name: string): string{
    let newName = name;
    if(newName.length > 30){
      newName = newName.substr(0,30)+'...';
    }
    return newName;
  }
}
