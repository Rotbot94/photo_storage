import {Injectable} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {doc, Firestore, updateDoc} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import {Photo} from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {
  }

  async uploadProfileImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `uploads/${user.uid}/profile.webp`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');
      const profileImage = await getDownloadURL(storageRef);
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await updateDoc(userDocRef, {
        profileImage,
      });
      return true;
    } catch (e) {
      return null;
    }
  }
}
