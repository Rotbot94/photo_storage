import {Component} from '@angular/core';
import {Camera} from "@capacitor/camera";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {
  images: any[] = [];

  constructor() {}
  async selectImages() {
    const {photos} = await Camera.pickImages({
      quality: 100,
      correctOrientation: true,
    });
    if(photos) {
      photos.forEach((photo) => {
        this.images.push(photo);
      })
    }
  }
}
