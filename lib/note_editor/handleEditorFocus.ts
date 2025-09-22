import { store } from "@/store";
import { updateFormattingOptionsButton } from "@/store/slices/note_editor/actionToolbarSlice";

/**
 * When the user focuses on the editor, enable
 * the formatting options button but do not make the button active.
 * @returns void
 */
const handleEditorFocus = () => {
    // Only enable the button when it is not active
    if (store.getState().actionToolbar.formattingOptionsButton !== 'active'){
        store.dispatch(updateFormattingOptionsButton(true));
    }
}

export default handleEditorFocus;