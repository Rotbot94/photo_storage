import {Component, OnInit} from '@angular/core';
import {Storage, ref, listAll, getDownloadURL} from '@angular/fire/storage';
import {Auth} from "@angular/fire/auth";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  imageUrls: any[] = [];
  selectedItem: any;
  isLoading: boolean = true;

  constructor(
    private storage: Storage,
    private auth: Auth,
    public loadingController: LoadingController
  ) {
  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading images...'
    });
    await loading.present();
    this.getImages().then((result) => {
        result.forEach((res) => {
          this.imageUrls.push(res);
        })
        console.log(this.imageUrls.length);
      }
    ).finally(() => {
      this.loadingController.dismiss();
    });
  }

  async getImages() {
    const images = [];
    const user = this.auth.currentUser;
    const path = `images/${user.uid}`
    const storageRef = ref(this.storage, path);
    const list = await listAll(storageRef);
    for (let i = 0; i < list.items.length; i++) {
      let downloadUrl = await getDownloadURL(list.items[i]);
      if (downloadUrl) {
        images.push(downloadUrl);
      }
    }
    return images;
  }

  saveItem(index: any) {
    window.open(this.imageUrls[index], '_blank');
  }

  deleteItem(index: any) {
    console.log('Not implemented');
  }


}
