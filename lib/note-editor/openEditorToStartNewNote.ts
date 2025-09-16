import { db } from "@/db/notesDB";
import { AppDispatch } from "@/store";
import { createNewNote, updateNewNoteEditorState, updateNoteEditedTimestamp } from "@/store/slices/note-editor/editorSlice";
import { updateNoteEditorDialog } from "@/store/slices/notesSlice";
import getCurrentTime from "@/utils/getCurrentTime.util";

/**
 * Open the note editor to start creating a new note.
 * @param dispatch - The Redux dispatch function
 * @return void
 */
const openEditorToStartNewNote = async (dispatch: AppDispatch) => {
    let currentTime = getCurrentTime(); // Get the current time

    // The new crafted note object
    const newNote = {
        id: crypto.randomUUID(),
        title: '',
        notecontent: '',
        isPinned: false,
        bgThemeID: 0,
        wallpaperID: 0,
        attachments: [],
        synced: false,
        createdTimestamp: `Edited ${currentTime}`,
        editedTimestamp: `Edited ${currentTime}`
    };

    await db.notes.add(newNote); // Store the new note in IndexedDB
    
    dispatch(createNewNote({ newNote: newNote })); // Store the new note in the redux state
    dispatch(updateNoteEditedTimestamp(`Edited ${currentTime}`)); // Update the edited timestamp in the redux state
    dispatch(updateNewNoteEditorState(true)); // Set the new note editor state to true
};

export default openEditorToStartNewNote;