import { Component, OnInit } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { Profile } from '../model/profile';
import { ProfileService } from '../profile.service';
import { plainToClass } from "class-transformer"; 

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [FileUploadModule],
  templateUrl: './file.component.html',
  styleUrl: './file.component.css'
})
export class FileComponent  {
  name = 'Angular';
  filetype = "application/json"
  maxFileSize = 10000000;
  filename: string | undefined;
  profile: Profile;

  constructor(private profileService: ProfileService) {}

  public upload(event: any) {
    const file = event.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        this.profile = plainToClass(Profile, JSON.parse(reader.result as string));
        this.profileService.setProfile(this.profile);
      };
      reader.readAsText(file);
    }
  }

}
