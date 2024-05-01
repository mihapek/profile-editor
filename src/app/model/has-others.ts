import 'reflect-metadata';
import { ProfileItem } from "./profile-item";
import { Type } from 'class-transformer';

export class HasOthers {
    @Type(() => ProfileItem)
    others: ProfileItem[] = [];

    addOther(profileItem?: ProfileItem): void {
        this.others.push(profileItem ? profileItem : new ProfileItem);
    }

    removeOther(item: ProfileItem): void {
        this.others = this.others.filter(obj => obj.key !== item.key);
    }
}