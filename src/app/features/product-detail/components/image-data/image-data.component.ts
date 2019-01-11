import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../../core/services/localStorage.service';
import { ProductDetailService } from '../../product-detail.service';
import { FacebookService, InitParams, UIParams, UIResponse } from 'ngx-facebook';
import { DialogRef } from '../../../../dialog/dialog-ref';
import { DialogService } from '../../../../dialog/dialog.service';

@Component({
  selector: 'app-image-data',
  templateUrl: './image-data.component.html',
  styleUrls: ['./image-data.component.scss']
})
export class ImageDataComponent implements OnInit {

  @Input() data: any;

  public static updateImageData: Subject<boolean> = new Subject();

  url: string = environment.service_api_url;
  closeResult: any;
  isFollowing: boolean = false;
  followingReady: boolean = false;
  idUser: string;
  idProduct: string;
  isLogged: boolean;
  currentRate: number = 0;
  productSelected: string;

  slideConfig: any;
  slides: Array<any>;
  displayArrow = false;

	/**
	 * Component constructor
	 * @param router Router instance
	 * @param route ActivatedRoute instance
	 * @param _localStorage LocalStorageService instance
	 * @param modalService NgbModal instance
	 * @param _productDetailService ProductDetailService instance
	 * @param fb FacebookService instance
	 * @param config NgbRatingConfig instance
	 */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _localStorage: LocalStorageService,
    private dialogService: DialogService,
    private _productDetailService: ProductDetailService,
    private fb: FacebookService,
    public dialog: DialogRef
    // config: NgbRatingConfig
  ) {
    // config.max = 5;
    // config.readonly = true;
  }

	/**
	 * Set idProduct, idUser, and review if this product is followed
	 */
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.idProduct = params['id'];
      }
    );
    ImageDataComponent.updateImageData.subscribe(
      (res) => { this.initParams(); }
    );
    this.initParams();
  }

	/**
	 * This method initialize local params
	 */
  initParams(): void {

    this.slideConfiguration();

    // init facebook params
    let initParams: InitParams = {
      appId: environment.facebook_id,
      xfbml: true,
      version: 'v2.12',
      cookie: true
    };

    this.fb.init(initParams);

    this.data.newPrice = this._productDetailService.newPrice(this.data.priceProduct, parseInt(this.data.percentDiscount));
    this.isLogged = this._localStorage.isLogged();
    this.productSelected = this.url + this.data.urlImageProduct;

    // If logged, check if the product is followed
    if (this.isLogged) {
      this.idUser = this._localStorage.getProfile().idUser;
      // product is followed
      this.followingReady = false;
      this._productDetailService.isFollowed(this.idProduct, this.idUser).subscribe(
        (res) => {
          this.isFollowing = (res["message"] !== "false") ? true : false;
          this.followingReady = true;
        }
      );
    } {
      this.followingReady = true;
      this.isFollowing = false;
    }
  }

  slideConfiguration() {
    let slidesToShow = 3, slidesToScroll = 1;

    // adding the actual product to the array
    if (this.data.images && this.data.images.length > 0) {
      this.data.images.unshift({
        idImage: 0,
        urlImage: this.data.urlImageProduct
      });
    }

    this.slides = this.data.images;
    if (this.slides && this.slides.length < 4) {
      this.displayArrow = false;
    } else {
      this.displayArrow = true;
    }

    // slide
    this.slideConfig = {
      "infinite": false,
      "speed": 300,
      "arrows": false,
      // "fade": true,
      // "cssEase": 'linear',
      // "autoplay": false,
      "responsive": [{
        "breakpoint": 2500,
        "settings": { "slidesToShow": slidesToShow, "slidesToScroll": slidesToScroll }
      },
      {
        "breakpoint": 2000,
        "settings": { "slidesToShow": slidesToShow, "slidesToScroll": slidesToScroll }
      },
      {
        "breakpoint": 1024,
        "settings": { "slidesToShow": slidesToShow, "slidesToScroll": slidesToScroll }
      },
      {
        "breakpoint": 700,
        "settings": { "slidesToShow": slidesToShow, "slidesToScroll": slidesToScroll }
      },
      {
        "breakpoint": 480,
        "settings": { "slidesToShow": 2, "slidesToScroll": slidesToScroll }
      }
      ]
    };
  }

  selectImage(slide) {
    // console.log(slide);
    this.productSelected = this.url + slide.urlImage;
  }

	/**
	 * Navigate to store detail
	 */
  goToStore(): void {
    this.dialog.close();
    this.router.navigate(['./bo', this.data.store.nameUrlStore]);
  }

	/**
	 * Follow a product if the user is log in
	 */
  followProduct(): void {
    if (!this.isLogged) {
      this.dialogService.openInfo({
        data: {
          optionOk: 'Aceptar',
          message: 'Debe de iniciar sesión para poder seguir este producto'
        }
      });
    } else {
      var temp = {
        idProduct: +this.idProduct,
        idUser: this._localStorage.getProfile().idUser
      };
      // unfollow product
      if (this.isFollowing) {
        const dialogUnFollow = this.dialogService.openInfo({
          data: {
            optionOk: 'Aceptar',
            optionCancel: 'Cerrar',
            message: 'Esta seguro que quiere dejar de seguir este producto?'
          }
        });
        
        dialogUnFollow.afterClosed.subscribe(response => {
          if (response) {
            this._productDetailService.unfollowProduct(temp).subscribe(
              (result) => { this.isFollowing = false; });
          }
        });
      } else {
        // follow product
        this._productDetailService.followProduct(temp).subscribe(
          (result) => { this.isFollowing = true; });
      }
    }
  }

  rateProduct(content):void {
    const rate = this.dialogService.open(content, {
      data: {
        title: "Calificación",
        optionOk: 'Aceptar',
        optionCancel: 'Cancelar'
      }
    });
    rate.afterClosed.subscribe(response => {
      if (response && this.currentRate > 0) {
        let temp = {
          idProduct: this.idProduct,
          idUser: this.idUser,
          value: this.currentRate
        }
        this._productDetailService.rateProduct(temp).subscribe(
          (result) => {
            console.log(result);
          }
        );
      }
    });
  }
      
  actualRate(): void {
  this._productDetailService.actualRate(this.idProduct, this.idUser).subscribe(
    (response) => {
      //console.log("actual rate --> ", response);
      this.currentRate = response["value"];
    },
    (error) => {
      console.log(error);
    }
    )
  }
  
  noLogged(content): void {
    this.dialogService.openInfo({
      data: {
        optionOk: 'Aceptar',
        message: 'Debe de iniciar sesión para poder calificar este producto.'
      }
    });
  }

	/**
	 * Share product in Facebook
	 */
  shareProduct(): void {
    const shareUrl = window.location.href;

    const params: UIParams = {
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': shareUrl,
          'og:title': this.data.nameProduct,
          'og:description': this.data.descriptionProduct,
          'og:image': this.productSelected,
          'og:image:width': '600',
          'og:image:height': '600',
          'og:image:type': 'image/jpeg'
        }
      })
    };
    // let params: UIParams = {
    // 	href: window.location.href,
    // 	method: 'share'
    // };
    this.fb.ui(params)
      .then((res: UIResponse) => {
        // console.log(res);
      })
      .catch((e: any) => console.error(e));
  }
}
