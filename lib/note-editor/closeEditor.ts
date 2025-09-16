import { Dispatch, RefObject, SetStateAction } from "react";
import { Editor } from '@tiptap/react';
import { AppDispatch } from "@/store";
import { updateActiveBgTheme, updateActiveWallpaper } from "@/store/slices/note-editor/backgroundToolbarSlice";
import { updateFormattingOptionsBlockState, updateFormattingOptionsBlockTheme } from "@/store/slices/note-editor/formattingOptionsBlockSlice";
import { updateNoteEditorDialog } from "@/store/slices/notesSlice";
import { updateEditorTitle, updateFormattingOptionsButton } from "@/store/slices/note-editor/editorSlice";

/**
 * Close the editor and replace it with the placeholder
 * @param dispatch - The dispatch method for redux
 * @param dialogComp - The state of the note editor dialog wether its opened(true) or closed(false)
 * @param setDialogComp - The state setter for the note editor dialog
 * @param setIsFocused - The state setter for the focused state that indicates if the editor is focused
 * @param  - The state setter for the formatting options block
 * @param set - The state setter for the formatting options button
 * @param editor - Tiptap editor instance
 * @param setHeaderOne - The state setter for the header one formatting option
 * @param setHeaderTwo - The state setter for the header two formatting option
 * @param setNormalText - The state setter for the normal text formatting option
 * @param setBold - The state setter for the bold formatting option
 * @param setItalic - The state setter for the italic formatting option
 * @param setUnderline - The state setter for the underline formatting option
 * @param setUndo - The state setter for the undo action
 * @param setRedo - The state setter for the redo action
 * @param titleInput - The title input reference
 * @param setBackgroundToolbarDisplay - The reference to the background toolbar
 * @return void
 */
const closeEditor = (
    dispatch: AppDispatch,
    dialogComp: boolean | null,
    setDialogComp: Dispatch<SetStateAction<boolean>> | null,
    setIsFocused: Dispatch<SetStateAction<boolean>>,
    editor: Editor | null,
    setHeaderOne: Dispatch<SetStateAction<boolean>>,
    setHeaderTwo: Dispatch<SetStateAction<boolean>>,
    setNormalText: Dispatch<SetStateAction<boolean>>,
    setBold: Dispatch<SetStateAction<boolean>>,
    setItalic: Dispatch<SetStateAction<boolean>>,
    setUnderline: Dispatch<SetStateAction<boolean>>,
    setUndo: Dispatch<SetStateAction<boolean>>,
    setRedo: Dispatch<SetStateAction<boolean>>,
    setBackgroundToolbarDisplay: Dispatch<SetStateAction<boolean>>
) => {
    setIsFocused(false); // Replace the editor with the placeholder
    dispatch(updateFormattingOptionsBlockState(false)); // Disable the formatting options block
    dispatch(updateFormattingOptionsButton(true)); // Enable the formatting options button but make it inactive
    editor?.destroy(); // Destroy the editor instance

    // Reset formatting options
    setHeaderOne(false);
    setHeaderTwo(false);
    setNormalText(true);
    setBold(false);
    setItalic(false);
    setUnderline(false);
    //--------------------------------
    
    dispatch(updateEditorTitle('')); // Clear the title input field
    setUndo(false); // Reset undo state
    setRedo(false); // Reset redo state
    setBackgroundToolbarDisplay(false); // Hide/disable the background toolbar
    dispatch(updateActiveBgTheme(0)); // Reset the active background theme back to the default theme
    dispatch(updateActiveWallpaper(0)); // Reset the active wallpaper back to default
    dispatch(updateFormattingOptionsBlockTheme('#202124')); // Reset the theme of the formatting options block back to default
    
    if (setDialogComp){
        setDialogComp(false);

        setTimeout(() => {
            dispatch(updateNoteEditorDialog({ value: false })); // Close the note editor dialog
        }, 300);
    }
}

export default closeEditor;