import { Dispatch, SetStateAction } from "react";
import { AppDispatch } from "@/store";
import { toggleDialogBottomSheet } from "@/store/slices/notesSlice";

/**
 * Allow the user to toggle the animated header actions
 * @param action - The action to be performed on the editor
 * @param backgroundToolbarDisplay - The state that controls the visibility of the background toolbar
 * @param setBackgroundToolbarDisplay - The state setter for the background toolbar used to toggle its visibility
 * @param breakPointForBottomSheet - The CSS media query breakpoint for when the bottom sheet should be rendered/displayed
 * @param dispatch - Redux app dispatch method
 * @param dialogBottomsheet - The state of the bottom sheet for the note editor dialog
 * @return void
 */
const toggleAnimatedHeaderActions = (action: number, backgroundToolbarDisplay: boolean, setBackgroundToolbarDisplay: Dispatch<SetStateAction<boolean>>, breakPointForBottomSheet: boolean, dispatch: AppDispatch, dialogBottomsheet: boolean) => {
    if (action === 1){ // For toggling formatting options
        
    } else if (action === 2){ // For toggling the background toolbar or bottom sheet
        /*  
            If we reach the css media query breakpoint for the 
            bottom sheet, then render the bottom sheet
        */
        if (breakPointForBottomSheet){
            dispatch(toggleDialogBottomSheet({ value: true }));
            return;
        }
        
        // Toggle the visibility of the background toolbar
        if (backgroundToolbarDisplay){
            setBackgroundToolbarDisplay(false);
        } else {
            setBackgroundToolbarDisplay(true);
        }
    }
}

export default toggleAnimatedHeaderActions;