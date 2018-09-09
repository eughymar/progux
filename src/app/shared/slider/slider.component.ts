/**
 * Created by znarf on 1/24/18.
 */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../core/services/shared.service';


@Component({
  selector: 'ngx-slider',
  templateUrl: 'slider.component.html',
  styleUrls: ['slider.component.scss']
})

export class SliderComponent implements OnInit {

  _query: string = '';
  imageSources: any;
  url: string = environment.service_api_url;

  @Input() title: string;
  @Input() imageData: any;
  @Input() isStore: boolean;

  slideConfig = {
    "infinite": false,
    "speed": 300,
    "arrows": false,
    // "fade": true,
    // "cssEase": 'linear',
    // "autoplay": true,
    "responsive": [
      {
        "breakpoint": 2000,
        "settings": {
          "slidesToShow": 6,
          "slidesToScroll": 1
        }
      },
      {
        "breakpoint": 1024,
        "settings": {
          "slidesToShow": 6,
          "slidesToScroll": 1
        }
      },
      {
        "breakpoint": 700,
        "settings": {
          "slidesToShow": 5,
          "slidesToScroll": 1
        }
      },
      {
        "breakpoint": 480,
        "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 1
        }
      }
    ]
  };

  constructor(
    private router: Router,
    private _sharedService: SharedService
  ) { }

  ngOnInit() {
    if (this.isStore) {
      for (let i = 0; i < this.imageData.length; i++) {
        let name = this.imageData[i].nameStore;
        let split = name.split(" ");
        this.imageData[i].nameStore = this._sharedService.name(name);
        if (split.length == 1) {
          this.imageData[i].logoName = split[0][0];
        } else {
          this.imageData[i].logoName = split[0][0] + split[1][0];
        }
      }
    } else {
      for (let i = 0; i < this.imageData.length; i++) {
        let name = this.imageData[i].nameProduct;
        this.imageData[i].nameProduct = this._sharedService.name(name);
      }
    }
  }

  goToDetail(slide) {
    if (this.isStore) {
      this.router.navigate(['./bo', slide.nameUrlStore]);
    } else {
      this.router.navigate(['./productDetail', slide.idProduct]);
    }
  }
}
