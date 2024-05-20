import { NgIf } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ApiKeyDialogComponent } from '../api-key-dialog/api-key-dialog.component';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { OthersComponent } from '../others/others.component';
import { PersonComponent } from '../person/person.component';
import { ProjectsComponent } from '../projects/projects.component';
import { plainToClass } from 'class-transformer';
import { ChatService } from '../chat.service';
import { Profile } from '../model/profile';
import { ProfileService } from '../profile.service';
import * as profile_sample from "../../assets/profile_init.json";
import { PersistenceService } from '../persistence.service';
import { ProfileNotFoundError } from '../errors/profile-not-found-error';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'profile-editor',
  standalone: true,
  imports: [
    PersonComponent,
    ProjectsComponent,
    OthersComponent,
    LoadingIndicatorComponent,
    ApiKeyDialogComponent,
    CardModule,
    ToastModule,
    NgIf
  ],
  templateUrl: './profile-editor.component.html',
  styleUrl: './profile-editor.component.css'
})
export class ProfileEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('apiKeyDialog') apiKeyDialog: ApiKeyDialogComponent;

  @Input() profileId: string;

  profile: Profile;

  constructor(private profileService: ProfileService, private chatService: ChatService,
    private persistenceService: PersistenceService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.profileService.profile.subscribe((profile) => {
      this.profile = profile;
    })

    if (this.profileId) {
      this.persistenceService.getProfile(this.profileId)?.subscribe(
        (profile: Profile) => {
          this.profileService.setProfile(profile);
        },
        (error) => {
          if (error instanceof ProfileNotFoundError) {
            this.messageService.add({ detail: 'Profile not found' });
          }
          else {
            this.messageService.add({ detail: error.message });
          }
        })
    }
    else {
      // let profile: Profile = this.profileService.convertProfile(JSON.parse(JSON.stringify(profile_sample)));
      // this.profileService.setProfile(plainToClass(Profile, profile));
    }
  }


  ngAfterViewInit(): void {
    this.chatService.apiKeyRequest$.subscribe(() => {
      this.apiKeyDialog.display = true;
    });
    this.apiKeyDialog.apiKeySubmit.subscribe((key: string) => {
      this.chatService.setApiKey(key);
    });
  }
}
