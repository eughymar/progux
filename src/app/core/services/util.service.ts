import { Injectable } from '@angular/core';
import {Event, Router, NavigationStart} from '@angular/router';

@Injectable({
	providedIn: 'root'
})

export class UtilService {
	public isMainSearch: boolean = true;

	constructor(
		private router: Router) {
		this.router.events.subscribe(
			(event: Event) => {
				if (event instanceof NavigationStart) {
					this.isMainSearch = event.url === "/mainSearcher" || event.url === "/";
				}
			}
		);
	}

	public isMainPage() {
		return this.isMainSearch;
	}
}
