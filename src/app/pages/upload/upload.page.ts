import {Component} from '@angular/core';
import {FilePicker} from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage {
  images: any[] = [];

  constructor() {
  }

  async selectImages() {
    const result = await FilePicker.pickFiles({
      multiple: true, readData: true
    });
    if (result.files) {
      for (let i = 0; i < result.files.length; i++)
        this.images.push(result.files[i]);
    }
  }
}
