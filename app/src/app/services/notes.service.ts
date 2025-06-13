import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private readonly url = 'http://localhost:3000/notes'

  constructor(private http: HttpClient) { }

  getNotes() {
    return this.http.get<Note[]>(this.url);
  }

  getNoteById(id: string) {
    return this.http.get<Note>(`${this.url}/${id}`)
  }

  editNote(note: Note) {
    return this.http.put<Note>(`${this.url}/${note.id}`, note)
  }

  patchNote(id: string, fields: any) {
    return this.http.patch<Note>(`${this.url}/${id}`, fields)
  }
}
