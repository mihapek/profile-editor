import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { ProfileService } from '../profile.service';
import { plainToClass } from 'class-transformer';
import { Profile } from '../model/profile';
import { saveAs } from "file-saver";
import { ChatService } from '../chat.service';
import { MenuItems } from './menu-item';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { UploadService } from '../upload.service';
import { PersistenceService } from '../persistence.service';
import { Location } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenubarModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    LanguageSelectorComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  @ViewChild('profileUploader') profileUploader: ElementRef;

  items: MenuItem[];
  profile: Profile;
  customProfessionDialog = false;
  personDialog = false;
  personDialogContent: string;
  personDialogHeader: string;

  constructor(private profileService: ProfileService, private chatService: ChatService,
    private messageService: MessageService, private uploadService: UploadService,
    private persistenceService: PersistenceService, private location: Location) { }

  ngOnInit(): void {
    let menuItems: MenuItems = new MenuItems(this);
    this.items = menuItems.items;
    this.profileService.profile.subscribe(
      data => this.profile = data
    )
  }

  openProfile() {
    this.profileUploader.nativeElement.click();
    this.resetLocation();
  }

  uploadProfile(event: any) {
    this.uploadService.uploadProfile(event.target.files[0]);
  }

  newProfile() {
    this.profileService.setProfile(new Profile);
    this.resetLocation();
  }

  exportProfile() {
    return saveAs(new Blob([JSON.stringify(this.profile, null, 2)], { type: 'JSON' }), 'profile.json');
  }

  saveProfile() {
    this.persistenceService.saveProfile(this.profile).subscribe(
      (profileId) => {
        this.location.go(`editor/${profileId}`);
        this.messageService.add({ detail: "Profile successfully saved" })
      },
      (error) => {
        this.messageService.add({ detail: error.message })
      })
  }

  generateProfile(type: string) {
    let attempts = 0;
    const maxAttempts = 3;

    const getProfile = () => {
      this.customProfessionDialog = false;
      this.chatService.getProfile(type)?.subscribe((data) => {
        try {
          const jsonProfile = JSON.parse(data);
          this.profileService.setProfile(plainToClass(Profile, jsonProfile));
        }
        catch (error) {
          console.log(data);
          console.error(error);
          attempts++;
          if (attempts < maxAttempts) {
            getProfile();
          } else {
            console.log('Max attempts reached');
          }
        }
      });
    };

    getProfile();
    this.resetLocation();
  }

  generatePersonContent(type: string) {
    this.personDialogContent = "";
    this.personDialog = false;
    if (this.profile.person.name) {
      let headerPrefix;
      switch (type) {
        case "poem": { headerPrefix = "Poem about "; break }
        case "description": { headerPrefix = "Description of "; break }
      }
      this.personDialogHeader = headerPrefix + this.profile.person.name;
      this.chatService.getPersonContent(type, false, this.profile)?.subscribe((data) => {
        this.personDialogContent = data;
        this.personDialog = true;
      })
    }
    else {
      this.messageService.add({ detail: 'Enter at least person\'s name' });
    }
  }

  generatePersonFoto() {
    this.chatService.getPersonFoto(this.profile)?.subscribe((data) => {
      this.profileService.setPersonFoto(data);
    })
  }

  switchCustomProfessionDialog() {
    this.customProfessionDialog = !this.customProfessionDialog;
  }

  resetLocation() {
    this.location.go("editor");
  }

}
