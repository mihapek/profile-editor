export class ProfileItem {
    key: string | undefined;
    value: string | undefined;

    constructor(key?: string, value?: string) {
        this.key = key;
        this.value = value;
    }
}