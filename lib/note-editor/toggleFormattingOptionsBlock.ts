import { AppDispatch } from "@/store";
import { updateFormattingOptionsButton } from "@/store/slices/note-editor/editorSlice";
import { updateFormattingOptionsBlockState } from "@/store/slices/note-editor/formattingOptionsBlockSlice";

/**
 * Allow the user to toggle the formatting options block
 * @param action - The action to be performed on the editor
 * @param backgroundToolbarDisplay - The state that controls the visibility of the background toolbar
 * @param setBackgroundToolbarDisplay - The state setter for the background toolbar used to toggle its visibility
 * @param breakPointForBottomSheet - The CSS media query breakpoint for when the bottom sheet should be rendered/displayed
 * @param dispatch - Redux app dispatch method
 * @param dialogBottomsheet - The state of the bottom sheet for the note editor dialog
 * @return void
 */
const toggleFormattingOptionsBlock = (dispatch: AppDispatch, formattingOptionsButton: boolean | string) => {
    if (formattingOptionsButton === true){
        dispatch(updateFormattingOptionsButton('active')); // Enable and make the formatting options button active
        dispatch(updateFormattingOptionsBlockState(true)); // Enable the formatting options block
    } else if (formattingOptionsButton === 'active'){
        dispatch(updateFormattingOptionsButton(true)); // Enable the formatting options button but make it inactive
        dispatch(updateFormattingOptionsBlockState(false)); // Disable the formatting options block
    } 
}

export default toggleFormattingOptionsBlock;