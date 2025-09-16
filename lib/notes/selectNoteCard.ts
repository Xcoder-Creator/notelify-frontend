import { Dispatch, SetStateAction } from "react";
import { AppDispatch } from "@/store";
import { updateSelectedNotes } from "@/store/slices/notesSlice";
import { NoteProps } from "@/types/notes/notes-redux-state.types";
import { updateActiveBgTheme, updateActiveWallpaper } from "@/store/slices/backgroundToolbarBottomSheetSlice";

/**
 * This method is called when the user selects a note card
 * @param dispatch - The dispatch method for redux
 * @param note - The data content of the note
 * @param noteSelected - Wether the note was selected or not
 * @param setNoteSelected - The state setter for the note selected state property
 * @param index - The index position of the note
 * @return void
 */
const selectNoteCard = (
    dispatch: AppDispatch,
    note: NoteProps,
    noteSelected: boolean,
    setNoteSelected: Dispatch<SetStateAction<boolean>>,
    index: number
) => {
    if (noteSelected){ // Deselect a note
        setNoteSelected(false);
        dispatch(updateSelectedNotes({ 
            action: 'deselect',
            noteID: note.id,
            index: index
        }));
    } else { // Select a note
        setNoteSelected(true);
        dispatch(updateSelectedNotes({ 
            action: 'select',
            noteID: note.id,
            index: index
        }));

        // Update the background toolbar with the current selected note theme and wallpaper
        dispatch(updateActiveBgTheme(note.bgThemeID));
        dispatch(updateActiveWallpaper(note.wallpaperID));
    }
}

export default selectNoteCard;