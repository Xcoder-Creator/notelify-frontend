import { db } from "@/db/notesDB";
import { AppDispatch } from "@/store";
import { updateNewNote, updateNoteEditedTimestamp } from "@/store/slices/note-editor/editorSlice";
import { NewNote } from "@/types/note-editor/editor-redux-state.types";
import getCurrentTime from "@/utils/getCurrentTime.util";

/**
 * This updates the edited timestamp of the new note in IndexedDB 
 * whenever the user types something in the note editor.
 * @param dispatch - The Redux dispatch function
 * @return void
 */
const updateTheContentsOfTheNewNote = async (dispatch: AppDispatch, newNoteObject: NewNote | Record<string, never>, editorTitle: string, editorContent: string) => {
    let currentTime = getCurrentTime(); // Get the current time

    // The updated version of the new note
    const newNote = {
        id: newNoteObject.id,
        title: editorTitle,
        notecontent: editorContent,
        isPinned: false,
        bgThemeID: 0,
        wallpaperID: 0,
        attachments: [],
        synced: false,
        createdTimestamp: newNoteObject.createdTimestamp,
        editedTimestamp: `Edited ${currentTime}`
    };

    await db.notes.put(newNote); // Update the new note in IndexedDB
    dispatch(updateNewNote({ newNote: newNote })); // Update the new note in the redux state
    dispatch(updateNoteEditedTimestamp(`Edited ${currentTime}`)); // Update the edited timestamp in the redux state
};

export default updateTheContentsOfTheNewNote;