import { Routes } from '@angular/router';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';

export const routes: Routes = [
    {
        path: 'editor',
        component: ProfileEditorComponent
    },
    {
        path: 'editor/:profileId',
        component: ProfileEditorComponent
    },
    {
        path: '**',
        redirectTo: '/editor'
    }

];
