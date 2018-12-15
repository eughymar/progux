import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ProductDetailService } from '../../product-detail.service';
import { LocalStorageService } from '../../../../core/services/localStorage.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  
  @Input() opinion: Array<any> = [];

  comment: string = "";
  url = environment.service_api_url;
  idProduct: string;
  closeResult: string;
  
  constructor(
    private _productDetailService: ProductDetailService,
    private _localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
  }

  sendComment(content) {
    if (this._localStorageService.isLogged()) {

      if (this.comment.trim().length > 0) {
        let tempComment = {
          idProduct: this.idProduct,
          idUser: this._localStorageService.getProfile().idUser,
          descriptionComment: this.comment
        }

        this._productDetailService.postProductComment(tempComment)
          .subscribe(
            data => {
              this.comment = "";
              this.opinion.unshift(data);

            },
            error => {
              console.log(error);
            }
          )
      }
    } else {
      // this.modalService.open(content).result.then((result) => {
      //   this.closeResult = `Closed with: ${result}`;
      // }, (reason) => {
      //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // });
    }
  }

}
