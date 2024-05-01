import { Component, OnInit } from '@angular/core';
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
    LanguageSelectorComponent,
    CardModule,
    ToastModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  profile: Profile;

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.selectedProfile$.subscribe((profile) => {
      this.profile = profile;
    })
  }

}
