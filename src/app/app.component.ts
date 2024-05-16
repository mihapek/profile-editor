import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { Profile } from './model/profile';
import { ProfileService } from './profile.service';
import { NgIf } from '@angular/common';
import { PersonComponent } from './person/person.component';
import { ProjectsComponent } from './projects/projects.component';
import { CardModule } from 'primeng/card';
import { OthersComponent } from './others/others.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { ToastModule } from 'primeng/toast';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { ApiKeyDialogComponent } from './api-key-dialog/api-key-dialog.component';
import { ChatService } from './chat.service';
import * as profile_sample from "../assets/profile2.json";
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    PersonComponent,
    ProjectsComponent,
    OthersComponent,
    LoadingIndicatorComponent,
    ApiKeyDialogComponent,
    CardModule,
    ToastModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('apiKeyDialog') apiKeyDialog: ApiKeyDialogComponent;
  profile: Profile;

  constructor(private profileService: ProfileService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.profileService.selectedProfile$.subscribe((profile) => {
      this.profile = profile;
    })
  }


  ngAfterViewInit(): void {
    this.chatService.apiKeyRequest$.subscribe(() => {
      this.apiKeyDialog.display = true;
    });
    this.apiKeyDialog.apiKeySubmit.subscribe((key: string) => {
      this.chatService.setApiKey(key);
    });
    // let profile: Profile = this.profileService.convertProfile(JSON.parse(JSON.stringify(profile_sample)));
    // this.profileService.setProfile(plainToClass(Profile, profile));
  }

}
