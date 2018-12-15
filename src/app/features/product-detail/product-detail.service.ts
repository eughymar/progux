import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  private URL: string = environment .service_api_url;

  /**
   * Service constructor
   * @constructor
   * @param _http HttpClient instance
   */
  constructor(private _http: HttpClient) { }

  /**
   * Get product detail
   * @param {string} id Product id
   */
  getProductById(id) {
    return this._http.get(this.URL + '/products/productById?idProduct=' + id);
  }

  /**
   * Get related products
   * @param {number} idx From index
   * @param {number} qty Quantity products
   * @param {string} id Product id
   */
  getProductRelated(idx: number, qty: number, id: string) {
    return this._http.get(this.URL +
      '/products/listRelatedProducts?idx=' + idx + '&qty=' + qty + '&idProduct=' + id);
  }

  /**
   * Get products comments
   * @param {string} id Product id
   */
  getProductComment(id: string) {
    return this._http.get(this.URL +
      '/comments/listCommentsByIdProduct?idProduct=' + id);
  }

  /**
   * Send comment
   * @param {object} comment The user's comment
   */
  postProductComment(comment: any): Observable<any> {
    return this._http
      .post(this.URL +
        '/comments/addCommentProduct', comment);
  }

  /**
   * Follow a product
   * @param {object} data idProduct and idUser
   */
  followProduct(data: any) {
    return this._http.post(this.URL +
      '/products/followProduct', data);
  }

  /**
   * Unfollow a product
   * @param {object} data idProduct and idUser
   */
  unfollowProduct(data: any) {
    return this._http
      .post(this.URL + '/products/unfollowProduct', data);
  }

  /**
   * Product Is followed
   * @param {string} idProduct Product id
   * @param {string} idUser User id
   */
  isFollowed(idProduct, idUser) {
    return this._http.get(this.URL +
      '/follows/isFollowProduct?idProduct=' + idProduct + '&idUser=' + idUser);
  }

  /**
   * Evaluate Product
   * @param {object} data
   */
  rateProduct(data: any) {
    return this._http.post(this.URL +
      '/ratings/ratingProduct', data);
  }

  /**
   * Product's actual rate
   * @param {string} idProduct
   * @param {string} idUser
   */
  actualRate(idProduct: string, idUser: string) {
    return this._http.get(this.URL +
      '/ratings/isRatingProduct?idProduct=' + idProduct + '&idUser=' + idUser);
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

}
