export interface User {
  profileData?: ProfileData;
  profileImage?: string;
}

export interface ProfileData {
  name?: string;
  description?: string;
}

export interface Credentials {
  email: string;
  password: string;

}
