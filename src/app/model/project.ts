export class Project {
    name: string;
    role: string;
    customer: string;
    descriptions: string;
    fromDate: Date;
    toDate: Date;
    skills: string[] = [];

    addSkill(skill: string): void {
        this.skills.splice(0, 0, skill)
    }

    removeSkill(index: number): void {
        this.skills.splice(index, 1);
    }
}