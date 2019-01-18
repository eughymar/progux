/*09/02/2018*/
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreDetailService } from '../../services/store-detail.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: 'catalogue.component.html',
  styleUrls: ['catalogue.component.scss']
})

export class CatalogueComponent implements OnInit {

  @Input() data: any;

  idStore: string;
  title: string;
  query: string = '';
  queryTemp: string = '';
  products: Array<any> = [];
  imagesFound: boolean = false;
  searching: boolean = false;
  seeMore: boolean = false;
  finished: boolean = false;

  idx: number = 0;
  qty: number = 8;
  productsCount: number;

  constructor(
    private route: ActivatedRoute,
    private _productStoreService: StoreDetailService
  ) { }

  ngOnInit() {
    this.getTotalProducts();
  }

  getTotalProducts() {
    this.seeMore = false;
    this.idStore = this.data.store.idStore;
    this.title = this.data.store.titleProducts;

    this._productStoreService.getTotalProducts(this.idStore, this.query).subscribe(
      (result: any) => {
        this.productsCount = result;
        this.getProducts();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getProducts() {
    this.finished = false;
    if (this.queryTemp != this.query) {
      this.idx = 0;
      this.products = [];
      this.seeMore = false;
    }

    this.queryTemp = this.query;

    this._productStoreService.getStoreProducts(this.idx, this.qty, this.query, this.idStore)
      .subscribe(
        (result: any) => {
          for (var i = 0; i < result.length; i++) {
            this.products.push(result[i]);
          }
          if (result.length > 0) {
            this.idx += this.qty;
          }
          this.seeMore = this.idx >= this.productsCount && result.length > this.qty;
          // if (this.idx >= this.productsCount ) {
          //   this.seeMore = true;
          // }
          this.finished = true;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
