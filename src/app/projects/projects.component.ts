import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { Profile } from '../model/profile';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ProfileService } from '../profile.service';
import { MenuItem } from 'primeng/api';
import { ChatService } from '../chat.service';
import { plainToClass } from 'class-transformer';
import { Project } from '../model/project';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FocusOnShowDirective } from '../focusOnShowDerictive';
import { SkillsComponent } from '../skills/skills.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    SkillsComponent,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    AccordionModule,
    CalendarModule,
    SplitButtonModule,
    FocusOnShowDirective
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit, OnChanges {
  @Input() profile: Profile;
  addProjectItems: MenuItem[];
  focus: boolean;

  constructor(private profileService: ProfileService, private chatService: ChatService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.addProjectItems = [
      {
        label: 'Generate project', command: () => {
          this.generateProject();
        }
      }
    ]
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['object']) {
      this.focus = false;
    }
  }

  addProject(): void {
    this.focus = true;
    this.profile.addProject();
  }

  generateProject() {
    if (this.profile.projects.length != 0) {
      this.chatService.getProject(this.profile.projects)?.subscribe(data => {
        const project = plainToClass(Project, JSON.parse(data));
        this.profile.addProject(project);
      });
    }
    else {
      this.messageService.add({ detail: 'You should have at least one project' });
    }
  }

}
