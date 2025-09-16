import { AppDispatch } from "@/store";
import { updateFormattingOptionsButton } from "@/store/slices/note-editor/editorSlice";
import { updateFormattingOptionsBlockState } from "@/store/slices/note-editor/formattingOptionsBlockSlice";

/**
 * When the user focuses on the title input, disable the formatting options feature temporarily
 * @param dispatch - The Redux dispatch function
 * @return void
 */
const handleTitleInputFocus = (dispatch: AppDispatch) => {
    dispatch(updateFormattingOptionsBlockState(false)); // Disable the formatting options block
    dispatch(updateFormattingOptionsButton(false)); // Disable the formatting options button
}

export default handleTitleInputFocus;