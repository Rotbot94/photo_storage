import { Component } from '@angular/core';
@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})
export class HomePage {
	constructor(
	) {}

  routes = [
    {
      title: "Profile",
      url: "/profile",

    },
    {
      title: "Home",
      url: "/",
    }
  ]
}
