import { store } from "@/store";
import { updateActiveBgTheme, updateActiveWallpaper } from "@/store/slices/note_editor/backgroundOptionsToolbarSlice";
import { updateEditorContent, updateEditorTitle } from "@/store/slices/note_editor/editorSlice";
import { updateFormattingOptionsToolbarTheme } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";
import { toggleNoteEditorDialog, updateCurrentNoteTheme, updateCurrentNoteTimestamp, updateCurrentNoteWallpaper, updateCurrentViewedNote } from "@/store/slices/notesSlice";
import { NoteProps } from "@/types/notes/notes-redux-state.types";
import formatNoteDate from "@/utils/notes/formatNoteDate.util";

/**
 * This method allows the user to view and edit a note in the note editor dialog.
 * @param note - The note that the user wants to view/edit
 * @returns void
 */
const viewNoteInNoteEditorDialog = (note: NoteProps) => {
    if (store.getState().notes.notesSelected.length === 0){ // If there are no selected notes, open the note editor dialog
        store.dispatch(updateCurrentNoteTheme({ themeID: note.bgColor })); // Update the theme of the editor to make use of the current viewed note theme
        store.dispatch(updateCurrentNoteWallpaper({ wallpaperID: note.wallpaper })); // Update the wallpaper of the editor to make use of the current viewed note wallpaper
        store.dispatch(updateActiveBgTheme({ themeID: note.bgColor })); // Update the active theme of the background options toolbar
        store.dispatch(updateActiveWallpaper({ wallpaperID: note.wallpaper })); // Update the active wallpaper of the background options toolbar
        store.dispatch(updateFormattingOptionsToolbarTheme(note.bgColor)); // Update the theme of the formatting options toolbar
        store.dispatch(updateEditorTitle(note.title)); // Update the title field of the editor
        store.dispatch(updateEditorContent(note.content)); // Update the content field of the editor
        store.dispatch(updateCurrentNoteTimestamp({ timestamp: formatNoteDate(new Date(note.updatedAt)) })); // Display the last updated timestamp for this note in the note editor dialog
        store.dispatch(updateCurrentViewedNote({ note: note })); // Update the current viewed note
        store.dispatch(toggleNoteEditorDialog(true)); // Open the note editor dialog
    } else { // If there are any selected notes, set the focus on the exact note card
        //selectNoteCard(dispatch, note, noteSelected, setNoteSelected, index)
    }
}

export default viewNoteInNoteEditorDialog;