import { Component, OnInit} from '@angular/core';
import { SearchResultService } from '../services/search-result.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.scss']
})

export class SearchResultComponent implements OnInit {

  searchQuery: string;
  storeTitle: string = 'TIENDAS RECOMENDADAS';
  productTitle: string = 'PRODUCTOS ENCONTRADOS';
  imageSources: any;
  quantity: number = 20;
  idx: number = 0;
  idCountry: string = '1';      // pass like input parameter
  idCategory: string = '1';   // pass like input parameter
  loading = true;
  thereIsResult = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchResultService: SearchResultService
  ) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.searchQuery = params['query'] || '';
        this.idCategory = params['category'];
        this.idCountry = params['country'];
        this.idx = 0;
        this.quantity = 20;

        this.getStoreData();
      });
  }

  getStoreData(): void {
    this.loading = true;
    this.searchResultService
      .getStoreSlider(this.idCategory, this.idCountry, this.idx, this.quantity, this.searchQuery).subscribe(
        result => {
          this.imageSources = result;
          this.loading = false;
          if (this.imageSources.length > 0) {
            this.thereIsResult = true;
          } else {
            this.thereIsResult = false;
          }
        },
        error => {
          let errorMessage = <any>error;
          console.log(errorMessage);
        }
      );
  }
}