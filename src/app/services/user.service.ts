import {Auth} from "@angular/fire/auth";
import {doc, docData, Firestore, setDoc} from "@angular/fire/firestore";
import {Injectable} from "@angular/core";
import {ProfileData} from '../interfaces/interface'

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) {
  }

  getUserProfile() {
    const user = this.auth.currentUser;
    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    return docData(userDocRef, {idField: 'id'});
  }

  async uploadUserProfileData(profileData: ProfileData) {
    const user = this.auth.currentUser;
    try {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, {profileData}, {merge: true});
      return true;
    } catch (e) {
      return null;
    }
  }

}
