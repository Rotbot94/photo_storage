import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {UploadPage} from './upload.page';
import {UploadPageRoutingModule} from "./upload-routing.module";
import {UploadInstanceComponent} from "../../components/upload-instance/upload-instance.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadPageRoutingModule
  ],
  declarations: [UploadPage, UploadInstanceComponent]
})
export class UploadPageModule {}
