/* 09/02/2018 */

import { Component, OnInit, Input, HostListener } from '@angular/core';
import * as moment from 'moment';

declare var L: any;

@HostListener('window:resize', ['$event'])
@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.scss']
})

export class ContactComponent implements OnInit {

  countBranchStore: number = 0;

  lat: number = -16.495257858990993;
  lng: number = -68.14861277266493;
  theMarker = {};

  branchInfo = '';

  mondayToFriday: any;
  saturday: any;
  sunday: any;
  showBranch: any;

  @Input() storeName: string;
  @Input() data: any;

  constructor() {
    this.assignClassBySize(window.screen.width);
  }

  ngOnInit() {
    this.branchInfo = this.data[0].address;
    this.countBranchStore = this.data.length;
    this.mapConfig();	// map configuration
    this.scheduleFormat();  // schedule
  }

  mapConfig() {
    this.lat = this.data[0].latitude;
    this.lng = this.data[0].longitude;

    // map's config
    var map = L.map('map', { dragging: false }).setView([this.lat, this.lng], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.scrollWheelZoom.disable();	// scroll wheel zoom disable

    // icon's config
    var greenIcon = L.icon({
      iconUrl: 'assets/img/pointNGX.jpg',
      shadowUrl: '',
      iconSize: [32, 37], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      iconAnchor: [16, 41], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -40] // point from which the popup should open relative to the iconAnchor
    });

    // marker's config
    this.theMarker = L.marker([this.lat, this.lng], { icon: greenIcon, draggable: true })
      .addTo(map)
      .bindPopup(`<span style='text-align:center;display:block;font-weight:bold;'> ${this.storeName} </span>
										<span style='text-align:center;display:block;'>${this.branchInfo}</span>`)
      .openPopup();
  }

  scheduleFormat() {
    // monday to friday
    if (this.data[0].listSchedule[0]) {
      this.mondayToFriday = {
        hourBeginOne: (moment(this.data[0].listSchedule[0].hourBeginOne).utc()).format('h:mm A'),
        hourEndOne: (moment(this.data[0].listSchedule[0].hourEndOne).utc()).format('h:mm A'),
        hourBeginTwo: (moment(this.data[0].listSchedule[0].hourBeginTwo).utc()).format('h:mm A'),
        hourEndTwo: (moment(this.data[0].listSchedule[0].hourEndTwo).utc()).format('h:mm A')
      };
    }
    // saturday
    if (this.data[0].listSchedule[5]) {
      this.saturday = {
        hourBeginOne: (moment(this.data[0].listSchedule[5].hourBeginOne).utc()).format('h:mm A'),
        hourEndOne: (moment(this.data[0].listSchedule[5].hourEndOne).utc()).format('h:mm A'),
        hourBeginTwo: (moment(this.data[0].listSchedule[5].hourBeginTwo).utc()).format('h:mm A'),
        hourEndTwo: (moment(this.data[0].listSchedule[5].hourEndTwo).utc()).format('h:mm A')
      }
    }
    // sunday
    if (this.data[0].listSchedule[6]) {
      this.sunday = {
        hourBeginOne: (moment(this.data[0].listSchedule[6].hourBeginOne).utc()).format('h:mm A'),
        hourEndOne: (moment(this.data[0].listSchedule[6].hourEndOne).utc()).format('h:mm A'),
        hourBeginTwo: (moment(this.data[0].listSchedule[6].hourBeginTwo).utc()).format('h:mm A'),
        hourEndTwo: (moment(this.data[0].listSchedule[6].hourEndTwo).utc()).format('h:mm A')
      }
    }
  }

  selectBranchStore(branchStore) {
    // this.latitude = branchStore.latitude;
    // this.longitude = branchStore.longitude;
    this.lat = branchStore.latitude;
    this.lng = branchStore.longitude;

    this.branchInfo = branchStore.address;
  }

  onResize(event) {
    this.assignClassBySize(event.target.innerWidth);
  }

  assignClassBySize(size) {
    this.showBranch = size > 769;
  }
}
