export class ProfileItem {
    key: string;
    value: string;
    showEditor: boolean = false

    switchEditor(): void {
        this.showEditor = !this.showEditor;
    }

    toJSON() {
        return {
            "key": this.key,
            "value": this.value
        };
    };
}