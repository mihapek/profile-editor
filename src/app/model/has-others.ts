import 'reflect-metadata';
import { ProfileItem } from "./profile-item";
import { Type } from 'class-transformer';

export class HasOthers {
    @Type(() => ProfileItem)
    others: ProfileItem[] = [];

    addOther(profileItem?: ProfileItem): void {
        this.others.push(profileItem ? profileItem : new ProfileItem);
    }

    removeOther(index: number): void {
        this.others.splice(index, 1);
    }
}