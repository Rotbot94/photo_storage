import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {LoadingController, AlertController, IonModal} from '@ionic/angular';
import {AuthService} from '../services/auth.service';
import {AvatarService} from '../services/avatar.service';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  profileDataForm: FormGroup;
  profile: any;
  isModalOpen = false;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
    this.profileDataForm = this.formBuilder.group({
      name: [''],
      description: [''],
      image: [''],
    }, {validator: this.atLeastOne(Validators.required)});
  }

  async imageUpload() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos // Camera, Photos or Prompt!
    });
    if (image) {
      //insert imaga data to form
      this.profileDataForm.controls['image'].setValue(image);
      this.profileDataForm.controls['image'].markAsDirty();
    }
  }

  async changeImage(image: Photo) {
    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      await loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async submitForm() {
    if (this.profileDataForm?.get('image').dirty) {
      await this.changeImage((this.profileDataForm?.get('image').value as Photo))
    }
  }

  atLeastOne = (validator: ValidatorFn) => (
    group: FormGroup
  ): ValidationErrors | null => {
    const hasAtLeastOne =
      group &&
      group.controls &&
      Object.keys(group.controls).some(
        (k) => !validator(group.controls[k])
      );

    return hasAtLeastOne ? null : {atLeastOne: true};
  };


}
