import {Component, Input, OnInit} from '@angular/core';
import {
  ref,
  Storage,
  uploadBytesResumable,
  UploadTask,
  UploadTaskSnapshot,
} from '@angular/fire/storage';
import {Auth} from "@angular/fire/auth";

@Component({
  selector: 'app-upload-instance',
  templateUrl: './upload-instance.component.html',
  styleUrls: ['./upload-instance.component.scss'],
})
export class UploadInstanceComponent implements OnInit {

  @Input() image: any;

  percentage: number = 0;
  snapshot$: UploadTaskSnapshot;

  task$: UploadTask;

  constructor(
    private storage: Storage,
    private auth: Auth) {
  }

  ngOnInit() {
    console.log(this.image);
    this.startUpload().then(() => console.log('Upload was run'));
  }

  async startUpload() {
    const user = this.auth.currentUser;
    const path = `images/${user.uid}/${Date.now()}.${this.image.format}`;
    const storageRef = ref(this.storage, path);
    const response = await fetch(this.image.webPath);
    const blob = await response.blob();
    const uploadTask = uploadBytesResumable(storageRef, blob, {
      contentType: this.image.format,
    });
    this.task$ = uploadTask;
    this.task$.pause();
    uploadTask.on('state_changed',
      (snapshot) => {
        this.snapshot$ = snapshot;
        this.percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      });
  }
}



