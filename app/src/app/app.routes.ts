import { Routes } from '@angular/router';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteEditComponent } from './components/note-edit/note-edit.component';

export const routes: Routes = [
    {
        path: 'my-notes',
        component: NoteListComponent
    },
    {
        path: 'my-notes/:id/edit',
        component: NoteEditComponent
    }
];
