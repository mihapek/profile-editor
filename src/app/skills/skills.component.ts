import { Component, Input } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Project } from '../model/project';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    AutoCompleteModule,
    OverlayPanelModule
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  @Input() project: Project;
  skills: string[];
  newSkill: string;
  filteredSkills: string[];

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.skills$.subscribe((skills) => {
      this.skills = skills;
    })
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
