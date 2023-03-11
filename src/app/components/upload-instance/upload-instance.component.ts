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

  percentage: any = 0;
  snapshot$: UploadTaskSnapshot;

  task$: UploadTask;

  constructor(
    private storage: Storage,
    private auth: Auth,) {
  }

  ngOnInit() {
    console.log(this.image);
    this.startUpload().then(r => console.log('run'));
  }

  async startUpload() {
    const user = this.auth.currentUser;
    const path = `images/${user.uid}/${Date.now()}+1.webp`;
    const storageRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(storageRef, this.image.blob);
    this.task$ = uploadTask;
    this.task$.pause();
    uploadTask.on('state_changed',
      (snapshot) => {
        this.snapshot$ = snapshot;
        this.percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      });
  }
}



