import { Dispatch, SetStateAction } from "react";
import { store } from "@/store";
import { updateSelectedNotes } from "@/store/slices/notesSlice";
import { NoteProps } from "@/types/notes/notes-redux-state.types";
import { updateActiveBgTheme, updateActiveWallpaper } from "@/store/slices/note_editor/backgroundOptionsToolbarSlice";

/**
 * This method is called when the user selects or deselects a note card.
 * @param note - The data content of the note
 * @param noteSelected - Wether the note was selected or not
 * @param setNoteSelected - The state setter for the note selected state property
 * @return void
 */
const selectNoteCard = (
    note: NoteProps,
    noteSelected: boolean,
    setNoteSelected: Dispatch<SetStateAction<boolean>>
) => {
    // If the note is already selected, deselect the note immediately
    if (noteSelected){ // Deselect a note
        setNoteSelected(false);
        store.dispatch(updateSelectedNotes({ 
            action: 'deselect',
            noteID: note.noteID
        }));
    } else { // Select a note
        setNoteSelected(true);
        store.dispatch(updateSelectedNotes({ 
            action: 'select',
            noteID: note.noteID
        }));

        // Update the background options toolbar with the current selected note theme and wallpaper
        store.dispatch(updateActiveBgTheme({ themeID: note.bgColor }));
        store.dispatch(updateActiveWallpaper({ wallpaperID: note.wallpaper }));
    }
}

export default selectNoteCard;