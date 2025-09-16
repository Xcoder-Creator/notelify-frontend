import { NewNote } from "@/types/note-editor/editor-redux-state.types";
import Dexie, { Table } from "dexie";

export class NotesDB extends Dexie {
  notes!: Table<NewNote, string>; // Table<Interface, PrimaryKeyType>

  constructor() {
    super("notesDatabase");

    this.version(1).stores({
      notes: "id" 
      // "id" = primary key, the rest are indexes
    });
  }
}

export const db = new NotesDB();