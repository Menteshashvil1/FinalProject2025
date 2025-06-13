import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { DatePipe, NgClass } from '@angular/common';
import { NotesService } from '../../services/notes.service';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

/*
  (10 points) Implement view notes feature
  3.1. Create a "note-list" component for listing notes and add it to routing under the "my-notes"path
  3.2. Notes should be displayed as a table. The table should have the following columns: title and create date.
  3.3. If the title is longer than 10 characters, only the first 7 characters should be displayed, followed by "...".
  3.4. Important notes should have a yellow background. Use the date pipe to format the date column and display the date in the following format: 24/01/2023.
*/

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [DatePipe, NgClass, RouterModule, TranslatePipe],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent implements OnInit {
  notes: Note[] = []
  constructor(private db: NotesService) { }

  ngOnInit(): void {
    this.db.getNotes().subscribe(notes => {
      this.notes = notes
    })
  }
}
