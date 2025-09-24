import { store } from "@/store";
import { toggleBottomSheet } from "@/store/slices/bottomSheetSlice";
import { toggleBackgroundOptionsToolbarState } from "@/store/slices/note_editor/backgroundOptionsToolbarSlice";

/**
 * Allow the user to toggle the animated header actions
 * @param action - The action to be performed on the editor
 * @param breakPointForBottomSheet - The CSS media query breakpoint for when the bottom sheet should be rendered/displayed
 * @return void
 */
const toggleAnimatedHeaderActions = (action: number, breakPointForBottomSheet: boolean) => {
    if (action === 1){ // For toggling formatting options
        
    } else if (action === 2){ // For toggling the background toolbar or bottom sheet
        /*  
            If we reach the css media query breakpoint for the 
            bottom sheet, then toggle the bottom sheet only
        */
        if (breakPointForBottomSheet){
            if (store.getState().bottomSheet.state){
                store.dispatch(toggleBottomSheet(false));
            } else {
                store.dispatch(toggleBottomSheet(true));
            }

            return;
        }

        // Toggle the visibility of the background options toolbar
        if (store.getState().backgroundOptionsToolbar.state){
            store.dispatch(toggleBackgroundOptionsToolbarState(false));
        } else {
            store.dispatch(toggleBackgroundOptionsToolbarState(true));
        }
    }
}

export default toggleAnimatedHeaderActions;