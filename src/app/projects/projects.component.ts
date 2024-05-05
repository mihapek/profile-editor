import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    AccordionModule,
    CalendarModule,
    AutoCompleteModule,
    SplitButtonModule,
    OverlayPanelModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  @Input() profile: Profile;
  skills: string[];
  newSkill: string;
  filteredSkills: string[];
  addProjectItems: MenuItem[];

  constructor(private profileService: ProfileService, private chatService: ChatService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.profileService.skills$.subscribe((skills) => {
      this.skills = skills;
    })
    this.addProjectItems = [
      {
        label: 'Generate project', command: () => {
          this.generateProject();
        }
      }
    ]
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

  filterSkill(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    this.skills.forEach(skill => {
      if (skill.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(skill);
      }
    }
    )
    this.filteredSkills = filtered;
  }

  addSkill(project: Project): void {
    if (this.newSkill) {
      project.addSkill(this.newSkill);
      this.profileService.addSkill(this.newSkill);
      this.newSkill = "";
    }

  }
}
