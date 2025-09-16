import React, { Dispatch, RefObject, SetStateAction } from "react";
import { Editor } from '@tiptap/react';
import { AppDispatch, store } from "@/store";
import { toggleMenuState } from "@/store/slices/note-editor/dropdownMenuSlice";
import { toggleDialogMenuState } from "@/store/slices/notesSlice";
import { updateFormattingOptionsButton } from "@/store/slices/note-editor/editorSlice";
import { updateFormattingOptionsBlockState } from "@/store/slices/note-editor/formattingOptionsBlockSlice";

/**
 * Allow the user to toggle the editor actions
 * @param e - The mouse event for html button element
 * @param dispatch - The dispatch method for redux
 * @param action - The action to be performed on the editor
 * @param fileInputRef - The reference of the file input
 * @param editor - The instance of the editor
 * @param undo - The state of the undo feature for the editor
 * @param redo - The state of the redo feature for the editor
 * @param formattingOptionsButton - The state of the formatting options button
 * @param backgroundToolbarDisplay - The state that controls the visibility of the background toolbar
 * @param setBackgroundToolbarDisplay - The state setter for the background toolbar used to toggle its visibility
 * @return void
 */
const toggleEditorActions = (e: React.MouseEvent<HTMLButtonElement>, dispatch: AppDispatch, action: number, fileInputRef: RefObject<HTMLInputElement | null>, editor: Editor | null, undo: boolean, redo: boolean, formattingOptionsButton: boolean | string, backgroundToolbarDisplay: boolean, setBackgroundToolbarDisplay: Dispatch<SetStateAction<boolean>>) => {
    if (action === 1){ // For toggling formatting options
        if (formattingOptionsButton === true){
            dispatch(updateFormattingOptionsButton('active')); // Enable and make the formatting options button active
            dispatch(updateFormattingOptionsBlockState(true)); // Enable the formatting options block
        } else if (formattingOptionsButton === 'active'){
            dispatch(updateFormattingOptionsButton(true)); // Enable the formatting options button but make it inactive
            dispatch(updateFormattingOptionsBlockState(false)); // Disable the formatting options block
        }
    } else if (action === 2){ // For toggling the background toolbar
        dispatch(toggleDialogMenuState({ value: false })); 

        if (backgroundToolbarDisplay){
            setBackgroundToolbarDisplay(false);
        } else {
            setBackgroundToolbarDisplay(true);
        }
    } else if (action === 3){ // For opening the file browser selector allowing the user to pick an image of their choice
        fileInputRef.current?.click(); // Open file picker
    } else if (action === 4){
        // This is for archiving a note
    } else if (action === 5){ // For displaying the dropdown menu
        let reduxStore = store.getState();
        let dropdownmenu = reduxStore.dropdownMenu.menuState;
        let dialogDropdownMenu = reduxStore.notes.dialogDropdownMenu;

        if (reduxStore.notes.noteEditorDialog){
            dispatch(toggleDialogMenuState({ value: !dialogDropdownMenu }));            
        } else {
            dispatch(toggleMenuState(!dropdownmenu));
        }
    } else if (action === 6){ // For undo action
        if (undo){
            editor?.chain().focus().undo().run();
        }
    } else if (action === 7){ // For redo action
        if (redo){
            editor?.chain().focus().redo().run();
        }
    }
}

export default toggleEditorActions;