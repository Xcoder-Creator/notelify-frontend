import { AppDispatch } from "@/store";
import { updateFormattingOptionsButton } from "@/store/slices/note-editor/editorSlice";

/**
 * When the user focuses on the editor, enable
 * the formatting options button but do not make the button active.
 * @returns void
 */
const handleEditorFocus = (dispatch: AppDispatch, formattingOptionsButton: string | boolean) => {
    // Only enable the button when it is not active
    if (formattingOptionsButton !== 'active'){
        dispatch(updateFormattingOptionsButton(true));
    }
}

export default handleEditorFocus;