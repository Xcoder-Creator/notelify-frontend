import { RefObject } from "react";
import { Editor } from '@tiptap/react';
import { store } from "@/store";
import { toggleDropdownMenu, updateFormattingOptionsButton } from "@/store/slices/note_editor/actionToolbarSlice";
import { updateFormattingOptionsToolbarState } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";
import { toggleBackgroundOptionsToolbarState } from "@/store/slices/note_editor/backgroundOptionsToolbarSlice";

/**
 * Allow the user to toggle the editor actions.
 * @param action - The action to be performed on the editor
 * @param fileInputRef - The reference of the file input
 * @param editor - The instance of the editor
 * @return void
 */
const toggleEditorActions = (action: number, fileInputRef: RefObject<HTMLInputElement | null>, editor: Editor | null) => {
    if (action === 1){ // For toggling formatting options
        if (store.getState().actionToolbar.formattingOptionsButton === true){
            store.dispatch(updateFormattingOptionsButton('active')); // Enable and make the formatting options button active
            store.dispatch(updateFormattingOptionsToolbarState(true)); // Enable the formatting options toolbar
        } else if (store.getState().actionToolbar.formattingOptionsButton === 'active'){
            store.dispatch(updateFormattingOptionsButton(true)); // Enable the formatting options button but make it inactive
            store.dispatch(updateFormattingOptionsToolbarState(false)); // Disable the formatting options toolbar
        }
    } else if (action === 2){ // For toggling the background toolbar
        store.dispatch(toggleDropdownMenu(false)); // Close the dropdown menu if its opened

        if (store.getState().backgroundOptionsToolbar.state){
            store.dispatch(toggleBackgroundOptionsToolbarState(false));
        } else {
            store.dispatch(toggleBackgroundOptionsToolbarState(true));
        }
    } else if (action === 3){ // For opening the file browser selector allowing the user to pick an image of their choice
        fileInputRef.current?.click(); // Open file picker
    } else if (action === 4){
        // This is for archiving a note
    } else if (action === 5){ // For toggling the dropdown menu
        let dropdownmenu = store.getState().actionToolbar.dropdownMenu;
        store.dispatch(toggleDropdownMenu(!dropdownmenu));
    } else if (action === 6){ // For undo action
        if (store.getState().actionToolbar.undo){
            editor?.chain().focus().undo().run();
        }
    } else if (action === 7){ // For redo action
        if (store.getState().actionToolbar.redo){
            editor?.chain().focus().redo().run();
        }
    }
}

export default toggleEditorActions;