import { store } from "@/store";
import { updateFormattingOptionsButton } from "@/store/slices/note_editor/actionToolbarSlice";
import { updateFormattingOptionsToolbarState } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";

/**
 * Toggle the formatting options toolbar.
 * @return void
 */
const toggleFormattingOptionsToolbar = () => {
    if (store.getState().actionToolbar.formattingOptionsButton === true){
        store.dispatch(updateFormattingOptionsButton('active')); // Enable and make the formatting options button active
        store.dispatch(updateFormattingOptionsToolbarState(true)); // Enable the formatting options toolbar
    } else if (store.getState().actionToolbar.formattingOptionsButton === 'active'){
        store.dispatch(updateFormattingOptionsButton(true)); // Enable the formatting options button but make it inactive
        store.dispatch(updateFormattingOptionsToolbarState(false)); // Disable the formatting options toolbar
    } 
}

export default toggleFormattingOptionsToolbar;