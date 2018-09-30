/* 18/02/2018 */

import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * Service for http requests
 * @class
 */
export class StoreDetailService {

  private URL: string = environment.service_api_url;

  /**
   * Service constructor
   * @constructor
   * @param _http HttpClient instance
   */
  constructor(private _http: HttpClient) { }

  /**
   * Get store's information
   * @param {string} id Store id
   */
  getStoreHead(id) {
    return this._http.get(this.URL +
      '/stores/storeById?idStore=' + id);
  }

  /**
   * Get store's products
   * @param {number} idx From index
   * @param {number} qty Quantity products
   * @param {string} txtSearch Text searched
   * @param {string} idStore Store id
   */
  getStoreProducts(idx, qty, txtSearch, idStore) {
    return this._http.get(this.URL +
      '/products/listProductsByStore?idx=' + idx + '&qty=' + qty + '&txtSearch=' + txtSearch + '&idStore=' + idStore);
  }

  /**
   * Get store's branchs
   * @param {string} idStore Store id
   */
  getBranchStore(idStore) {
    return this._http.get(this.URL +
      '/branches/listBranchStoresByStore?idStore=' + idStore);
  }

  /**
   * Follow store
   * @param {object} data Follow data
   */
  followStore(data) {
    return this._http
      .post(this.URL + '/stores/followStore', data);
  }

  /**
   * Unfollow store
   * @param {object} data Follow data
   */
  unfollowStore(data) {
    return this._http
      .post(this.URL + '/stores/unfollowStore', data);
  }

  /**
   * Store Is followed
   * @param {string} idStore Store id
   * @param {string} idUser User id
   */
  isFollowed(idStore, idUser) {
    idUser = idUser + "";
    return this._http.get(this.URL +
      '/follows/isFollowStore?idStore=' + idStore + '&idUser=' + idUser);
  }

  /**
   * Get Id Store
   * @param {string} name Store name
   */
  getIdStore(name) {
    return this._http.get(this.URL + '/stores/storeByUrl?nameUrlStore=' + name);
  }

  /**
   * Create new price
   * @param {number} priceProduct
   * @param {number} percentDiscount
   * @returns {number} newPrice
   */
  newPrice(priceProduct: number, percentDiscount: number): number {
    let newPrice = priceProduct;
    if (percentDiscount != 0) {
      newPrice = priceProduct - (priceProduct * (percentDiscount / 100));
    }
    return newPrice;
  }

  /**
   * If name product size is > 30 then add '...'
   * @param {string} name
   * @returns {string}
   */
  nameProduct(name: string): string {
    let newName = name;
    if (newName.length > 30) {
      newName = newName.substr(0, 30) + '...';
    }
    return newName;
  }

  /**
   * Get Total products
   * @param {string} idStore
   * @param {string} query
   */
  getTotalProducts(idStore: string, query: string): any {
    return this._http.get(this.URL + '/products/countProductsByStore?idStore=' + idStore + '&txtSearch=' + query);
  }

}
