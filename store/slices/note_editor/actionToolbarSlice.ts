import ActionToolbarReduxStateProps from '@/types/note_editor/action-toolbar-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* 
    This redux slice manages the state of the action toolbar in the note editor 
*/
const initialState: ActionToolbarReduxStateProps = {
    formattingOptionsButton: true,
    undo: false,
    redo: false,
    dropdownMenu: false,
    dialogDropdownMenu: false
};

const actionToolbarSlice = createSlice({
    name: 'actionToolbar',
    initialState,
    reducers: {
        /* Update the state of the formatting options button */
        updateFormattingOptionsButton(state, action: PayloadAction<boolean | string>) {
            state.formattingOptionsButton = action.payload;
        },

        /* Update the state of the undo button */
        updateUndoButton(state, action: PayloadAction<boolean>) {
            state.undo = action.payload;
        },

        /* Update the state of the redo button */
        updateRedoButton(state, action: PayloadAction<boolean>) {
            state.redo = action.payload;
        },

        /* Toggle the dropdown menu */
        toggleDropdownMenu(state, action: PayloadAction<boolean>) {
            state.dropdownMenu = action.payload;
        },

        /* Toggle the dialog dropdown menu */
        toggleDialogDropdownMenu(state, action: PayloadAction<boolean>) {
            state.dialogDropdownMenu = action.payload;
        },

        /* Reset the state of the action toolbar to its default */
        resetActionToolbar(state) {
            state.formattingOptionsButton = true;
            state.undo = false;
            state.redo = false;
        },
    },
});

export const { updateFormattingOptionsButton, updateUndoButton, updateRedoButton, toggleDropdownMenu, toggleDialogDropdownMenu, resetActionToolbar } = actionToolbarSlice.actions;
export default actionToolbarSlice.reducer;