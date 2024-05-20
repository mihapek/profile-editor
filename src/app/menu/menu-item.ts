import { MenuItem } from "primeng/api";
import { MenuComponent } from "./menu.component";
import * as professions from "../../assets/professions.json";

export class MenuItems {
    menu: MenuComponent;
    items: MenuItem[];

    constructor(menu: MenuComponent) {
        this.menu = menu;
        this.buildMenu();
    }

    buildMenu() {
        this.items = [];
        this.items.push(this.getFileMenu());
        let generateItem: MenuItem = {
            label: 'Generate'
        };
        generateItem.items = [];
        let qualies: any = JSON.parse(JSON.stringify(professions));
        delete qualies.default;
        for (let key in qualies) {
            let hasChildren = qualies[key].length != 0;
            let menuItem = this.getItem(key, hasChildren);
            generateItem.items.push(menuItem)

            if (hasChildren) {
                menuItem.items = [];
                qualies[key].forEach((value: string) => {
                    menuItem.items?.push(this.getItem(value, false));
                });
            }

        }
        generateItem.items.push({
            label: 'Custom',
            command: () => { this.menu.switchCustomProfessionDialog() }
        })

        this.items.push(generateItem);
        this.items.push(this.getPersonMenu());
    }
    getPersonMenu(): MenuItem {
        return {
            label: 'Person',
            items: [
                {
                    label: 'Description',
                    command: () => { this.menu.generatePersonContent('description') }
                },
                {
                    label: 'Poem',
                    command: () => { this.menu.generatePersonContent('poem') }
                },
                {
                    label: 'Foto',
                    command: () => { this.menu.generatePersonFoto() }
                }
            ]
        }
    }

    getFileMenu(): MenuItem {
        return {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    command: () => { this.menu.newProfile() }
                },
                {
                    label: 'Open',
                    icon: 'pi pi-fw pi-folder-open',
                    command: () => { this.menu.openProfile() }
                },
                {
                    label: 'Save',
                    icon: 'pi pi-fw pi-save',
                    command: () => { this.menu.saveProfile() }
                },
                {
                    label: 'Download',
                    icon: 'pi pi-fw pi-download',
                    command: () => { this.menu.exportProfile() }
                }
            ]
        }
    }

    getItem(label: string, hasLink: boolean): MenuItem {
        return {
            label: label,
            icon: 'pi pi-fw',
            command: () => { if (!hasLink) this.menu.generateProfile(label) }
        }
    }

}