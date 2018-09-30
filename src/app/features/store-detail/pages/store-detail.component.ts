import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { StoreDetailService } from '../services/store-detail.service';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss']
})
export class StoreDetailComponent implements OnInit {
  backButton: string = "atrás";
  catalogueTitle: string = 'CATÁLOGO DE LA TIENDA';
  contactTitle: string = "CONTACTO";
  query: string = "Buscar en catálogo";
  idStore: string;
  urlName: string;
  headData: any;
  branchData: any;
  isNegux: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _storeDetailService: StoreDetailService
  ) { }

  ngOnInit() {

    // insert id
    console.log("----- ngOnInit -----");

    // getting id param
    this.route.params.subscribe(
      (params) => {
        this.urlName = params['id'];
        this.isNegux = params['id'] === 'negux.innovations';
      }
    );

    // this approach https://stackoverflow.com/questions/40983055/how-to-reload-the-current-route-with-the-angular-2-router
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
    // approach

    this._storeDetailService.getIdStore(this.urlName).subscribe(
      (result) => {
        //console.log(result);
        this.idStore = result['message'];
        if (this.idStore) {
          this.getStoreHead();
          this.getBranchStore();
        } else {
          this.router.navigate(['./not-found']);
        }
      },
      (error) => {
        console.log(error);
      }
    )

    // this.getStoreHead();
    // this.getBranchStore();
  }

  getStoreHead() {
    this._storeDetailService.getStoreHead(this.idStore).subscribe(
      (result) => {
        this.headData = result;
      },
      error => {
        console.log(error);
      }
    )
  }

  getBranchStore() {
    this._storeDetailService.getBranchStore(this.idStore).subscribe(
      (result) => {
        this.branchData = result;
      },
      error => {
        console.log(error);
      }
    )
  }
}
