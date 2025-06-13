import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Note } from '../../models/note';
import { TranslatePipe } from '@ngx-translate/core';

/*
(10 points) Implement edit note feaure 4.1 Add the "edit-note" component and add it to routing under the path "my-notes/{id}/edit"
4.2. The "edit-notes" component should include the following fields for editing notes: title (text), content(text area), important (checkbox), and buttons for saving changes and canceling the edit operation.
4.3. Pressing the cancel button returns the user to the notes list.
4.4. The Edit component should load note data from the server using the "getNote" method created earlier and id from route params.
4.5. Implement a note edit feature using the "editNote" service method. Once the edit request is complete user should return to the note list.
*/

@Component({
  selector: 'app-note-edit',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.css'
})
export class NoteEditComponent implements OnInit {
  currNote?: Note;
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    isImportant: new FormControl(false),
  })
  constructor(private router: Router, private activeRoute: ActivatedRoute, private db: NotesService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id') as string
      this.db.getNoteById(id).subscribe((noteData: Note) => {
        this.currNote = noteData

        this.form.setValue({
          title: noteData.title,
          content: noteData.content,
          isImportant: noteData.isImportant
        })
      })
    })
  }

  saveEdit() {
    if (!this.currNote) {
      alert("Something went wrong!")
      this.router.navigate(['/my-notes'])
      return
    }

    this.db.patchNote(this.currNote.id, { ...this.form.value }).subscribe(response => {
      this.router.navigate(['/my-notes'])
    })
  }
  cancelEdit() {
    this.router.navigate(['/my-notes'])
  }
}
