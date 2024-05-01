import { Injectable } from '@angular/core';
import { Profile } from './model/profile';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profile$ = new BehaviorSubject<Profile>(new Profile);
  selectedProfile$ = this.profile$.asObservable();
  private allSkills$ = new BehaviorSubject<string[]>([]);
  skills$ = this.allSkills$.asObservable();
  constructor() { }

  setProfile(profile: Profile) {
    this.profile$.next(profile);
    this.initSkills(profile);
  }

  initSkills(profile: Profile) {
    let skills: string[] = [];
    profile.projects.forEach(project => {
      project.skills?.forEach(skill => {
        if (!skills.includes(skill)) {
          skills.push(skill);
        }
      })
    })
    this.allSkills$.next(skills);
  }

}
