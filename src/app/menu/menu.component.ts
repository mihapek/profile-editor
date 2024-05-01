import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { ProfileService } from '../profile.service';
import { plainToClass } from 'class-transformer';
import { Profile } from '../model/profile';
import { saveAs } from "file-saver";
import { ChatService } from '../chat.service';
import { MenuItems } from './menu-item';
import { LoadingService } from '../loading.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenubarModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  items: MenuItem[];
  profile: Profile;
  customProfessionDialog = false;
  personDialog = false;
  personDialogContent: string;
  personDialogHeader: string;

  constructor(private profileService: ProfileService,
    private chatService: ChatService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    let menuItems: MenuItems = new MenuItems(this);
    this.items = menuItems.items;
    this.profileService.selectedProfile$.subscribe(
      data => this.profile = data
    )
  }

  uploadProfile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = ".json"
    input.multiple = true;

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader: FileReader = new FileReader();
        reader.onload = () => {
          this.profileService.setProfile(plainToClass(Profile, JSON.parse(reader.result as string)));
        };
        reader.readAsText(file);
      }
    }
    input.click()
  }

  newProfile() {
    this.profileService.setProfile(new Profile);
  }

  saveProfile() {
    return saveAs(new Blob([JSON.stringify(this.profile, null, 2)], { type: 'JSON' }), 'profile.json');
  }

  generateProfile(type: string) {
    this.customProfessionDialog = false;
    this.chatService.getProfile(type).subscribe((data) => {
      try {
        this.profileService.setProfile(plainToClass(Profile, JSON.parse(data)));
      }
      catch (error) {
        console.error(error);
        this.generateProfile(type);
      }
    })
  }

  generatePersonContent(type: string) {
    if (this.profile.person.name) {
      let headerPrefix;
      switch (type) {
        case "poem": { headerPrefix = "Poem about "; break }
        case "description": { headerPrefix = "Description of "; break }
      }
      this.personDialogHeader = headerPrefix + this.profile.person.name;
      this.chatService.getPersonContent(type, this.profile).subscribe((data) => {
        this.personDialogContent = data;
        this.personDialog = true;
      })
    }
    else {
      this.messageService.add({ detail: 'Enter at least person\'s name' });
    }
  }

  switchCustomProfessionDialog() {
    this.customProfessionDialog = !this.customProfessionDialog;
  }

}
