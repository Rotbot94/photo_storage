import { NgModule } from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import {IonicModule} from "@ionic/angular";
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    IonicModule,
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgForOf
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
