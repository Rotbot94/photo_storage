import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import {LoadingController, AlertController, ActionSheetController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {AvatarService} from '../../services/avatar.service';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ProfileData, User} from "../../interfaces/interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  profileDataForm: FormGroup;
  profile: User;
  isModalOpen = false;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.userService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
    this.profileDataForm = this.formBuilder.group({
      name: [''],
      description: [''],
      image: [''],
    }, {validator: this.atLeastOne(Validators.required)});
  }

  async addPhotoToForm(option: string) {
    const photoGalleryOptions = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
    }
    const cameraOptions = {
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    }

    if(option === 'camera') {
      const image = await Camera.getPhoto(cameraOptions);
      if (image) {
        //insert imaga data to form
        this.profileDataForm.controls['image'].setValue(image);
        this.profileDataForm.controls['image'].markAsDirty();
      }
    } else if (option === 'gallery') {
      const image = await Camera.getPhoto(photoGalleryOptions);
      if (image) {
        //insert imaga data to form
        this.profileDataForm.controls['image'].setValue(image);
        this.profileDataForm.controls['image'].markAsDirty();
      }
    }
  }

  async uploadImage(image: Photo) {
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
      await this.uploadImage((this.profileDataForm?.get('image').value as Photo));
    }
    if (this.profileDataForm?.get('name').dirty && this.profileDataForm?.get('description').dirty) {
      await this.insertOrUpdateUserProfileData({
        name: this.profileDataForm?.get('name').value,
        description: this.profileDataForm?.get('description').value,
      });
    } else if (this.profileDataForm?.get('name').dirty) {
      await this.insertOrUpdateUserProfileData({
        name: this.profileDataForm?.get('name').value
      });
    } else if (this.profileDataForm?.get('description').dirty) {
      await this.insertOrUpdateUserProfileData({
        description: this.profileDataForm?.get('description').value
      });
    }
    this.profileDataForm.reset();
    this.isModalOpen = false;
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

  async insertOrUpdateUserProfileData(profileData: ProfileData) {
    await this.userService.uploadUserProfileData(profileData);
  }

  async selectPhotoSource() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select source',
      buttons: [
        {
          text: 'Camera',
          data: 'camera'
        },
        {
          text: 'Gallery',
          data: 'gallery'
        },
      ],
    });

    await actionSheet.present();

    const uploadOption = await actionSheet.onDidDismiss();
    await this.addPhotoToForm(uploadOption?.data);
  }


}
