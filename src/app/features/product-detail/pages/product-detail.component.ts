import { Component, OnInit, Input } from '@angular/core';
import { DialogConfig } from '../../../dialog/dialog-config';
import { ProductDetailService } from '../product-detail.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId: string;
  product: any;
  otherProducts: Array<any>;
  productDesc: any = {};
  productComment: Array<any> = [];
  sliderTitle: string = "TAMBIÉN TE PUEDE INTERESAR...";
  idx: number = 0;
  qty: number = 20;

  constructor(
    private productDetailService: ProductDetailService,
    private route: ActivatedRoute,
    private router: Router,
    public config: DialogConfig
  ) { }

  ngOnInit() {
    this.product = this.config.data.product;
    this.getProductDetail();
    this.getProductComments();
  }

  getProductDetail() {
    this.productDetailService.getProductById(this.product.idProduct).subscribe(
      data => {
        this.product = data;
      },
      error => { console.log(error); }
    );

  }

  getProductComments() {
    this.productDetailService.getProductComment(this.product.idProduct).subscribe(
      (data) => {
        console.log("COMENTTTT", data);
        
        if (Array.isArray(data)) {
          this.productComment = data;
        }
      },
      error => { console.log(error); }
    );
  }

}