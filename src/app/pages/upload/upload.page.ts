import { Component } from '@angular/core';
import {Camera} from '@capacitor/camera';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {
  photos: any[] = [];
  constructor() { }

  async selectPhotos() {
    const {photos} = await Camera.pickImages({
      quality: 100,
      correctOrientation: true,
    });
    if(photos) {
      photos.forEach((photo) => {
        this.photos.push(photo);
      })
    }
  }

  deletePhoto(index: any) {
    this.photos.splice(index, 1);
  }

  startPhotoUpload() {

  }

}
