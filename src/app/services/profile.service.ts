import { Injectable } from '@angular/core';
import { Profile } from '../model/profile';
import { BehaviorSubject } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { ProfileItem } from '../model/profile-item';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profile$ = new BehaviorSubject<Profile>(new Profile);
  profile = this.profile$.asObservable();
  private skills$ = new BehaviorSubject<string[]>([]);
  skills = this.skills$.asObservable();
  private personFoto$ = new BehaviorSubject<string>("");
  personFoto = this.personFoto$.asObservable();

  constructor() { }

  setProfile(profile: Profile) {
    this.profile$.next(profile);
    this.initSkills(profile);
    this.personFoto$.next("");
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
    skills = this.sortSkills(skills);
    this.skills$.next(skills);
  }

  setPersonFoto(imageUrl: string) {
    this.personFoto$.next(imageUrl);
  }

  convertProfile(json: any): Profile {
    let profile: Profile = plainToClass(Profile, json);
    if (!Array.isArray(profile.person.others)) {
      profile.person.others = [];
      for (let prop in json.person.others) {
        profile.person.addOther(new ProfileItem(prop, json.person.others[prop]));
      }
    }
    if (!Array.isArray(profile.others)) {
      profile.others = [];

      for (let prop in json.others) {
        profile.addOther(new ProfileItem(prop, json.others[prop]));
      }
    }
    profile.projects.forEach(project => {
      project.skills.forEach((skill: any, i) => {
        if (skill.name) {
          project.skills[i] = skill.name;
        }
      })
    })
    return profile;
  }

  addSkill(newSkill: string) {
    let skills: string[] = this.skills$.getValue();
    if (!skills.includes(newSkill)) {
      skills.push(newSkill);
      skills = this.sortSkills(skills);
      this.skills$.next(skills);
    }
  }

  private sortSkills(skills: string[]): string[] {
    return skills.sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase())
    });
  }
}

