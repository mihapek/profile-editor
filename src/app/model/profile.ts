import 'reflect-metadata';
import { Type } from "class-transformer";
import { Person } from "./person";
import { Project } from "./project";
import { HasOthers } from './has-others';
import { ProfileItem } from './profile-item';

export class Profile extends HasOthers {
    @Type(() => Person)
    person: Person = new Person();
    @Type(() => Project)
    projects: Project[] = [];

    addProject(project?: Project): void {
        this.projects.splice(0, 0, project ? project : new Project);
    }
}