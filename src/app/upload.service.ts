import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Profile } from './model/profile';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private profileService: ProfileService, private messageService: MessageService) { }

  uploadProfile(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        let profileData = JSON.parse(reader.result as string);
        let profile: Profile = this.profileService.convertProfile(profileData);
        this.profileService.setProfile(profile);
      };
    }
  }

  uploadFoto(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          this.profileService.setPersonFoto(reader.result.toString());
        }
      };
    }
  }
}

