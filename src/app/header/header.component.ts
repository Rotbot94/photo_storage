import {Component, Input} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

interface route {
  title: string;
  url: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() pageName: string;
  @Input() routes: route[];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  async logout() {
    await this.authService.logout();
    await this.router.navigateByUrl('/', {replaceUrl: true});
  }

}