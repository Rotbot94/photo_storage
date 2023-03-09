import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  appDescription = 'Welcome to our photo storage application!\n Keep all your precious memories in one safe and secure place.\n Our app allows you to easily upload, organize and share your photos with friends and family.\n Say goodbye to the cluttered camera roll and hello to a beautiful, organized photo collection.\n Start storing your memories with us today!';

  constructor(
    private router: Router
  ) {
  }

  async navigateTo(path: string) {
    await this.router.navigateByUrl(path, {replaceUrl: true});
  }
}
