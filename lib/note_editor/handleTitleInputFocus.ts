import { store } from "@/store";
import { updateFormattingOptionsButton } from "@/store/slices/note_editor/actionToolbarSlice";
import { updateFormattingOptionsToolbarState } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";

/**
 * When the user focuses on the title input, disable the formatting options feature temporarily.
 * @return void
 */
const handleTitleInputFocus = () => {
    store.dispatch(updateFormattingOptionsToolbarState(false)); // Disable the formatting options block
    store.dispatch(updateFormattingOptionsButton(false)); // Disable the formatting options button
}

export default handleTitleInputFocus;