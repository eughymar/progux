import { Component, OnInit, Input } from "@angular/core";

import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-pricing',
  templateUrl: 'pricing.component.html',
  styleUrls: ['pricing.component.scss']
})

export class PricingComponent implements OnInit {

  @Input() data: any;

  images: Array<any>;
  url = environment.service_api_url;
  title: string;

  constructor() { }

  ngOnInit() {
    this.images = this.data.promotionImages;
    this.images.splice(3, this.images.length); // show only 3 images
    this.title = this.data.store.titlePromotions;
  }
}
