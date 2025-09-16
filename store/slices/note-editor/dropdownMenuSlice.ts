import DropdownMenuReduxStateProps from '@/types/note-editor/dropdown-menu-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: DropdownMenuReduxStateProps = {
    menuState: false,
    menuList: [
        {
            option: 1,
            title: 'Add label',
            locked: false
        },
        {
            option: 2,
            title: 'Add drawing',
            locked: false
        },
        {
            option: 3,
            title: 'Show checkboxes',
            locked: false
        },
        {
            option: 4,
            title: 'Version history',
            locked: false
        }
    ]
};

const dropdownMenuSlice = createSlice({
    name: 'dropdownmenu',
    initialState,
    reducers: {
        /* Toggle the state of the menu */
        toggleMenuState(state, action: PayloadAction<boolean>) {
            state.menuState = action.payload;
        }
    },
});

export const { toggleMenuState } = dropdownMenuSlice.actions;
export default dropdownMenuSlice.reducer;