export interface User {
  profileData?: ProfileData;
  imageUrl?: string;
}

export interface ProfileData {
  name?: string;
  description?: string;
}

export interface Credentials {
  email: string;
  password: string;

}
