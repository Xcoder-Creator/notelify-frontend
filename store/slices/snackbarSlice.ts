import SnackbarReduxStateProps from '@/types/snackbar-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* 
    This redux slice manages the state of the snackbar
*/
const initialState: SnackbarReduxStateProps = {
    open: false,
    msg: ''
};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        /* Update the open state of the snackbar */
        updateOpen(state, action: PayloadAction<boolean>) {
            state.open = action.payload;
        },

        /* Update the message text to be displayed in the snackbar */
        updateMsg(state, action: PayloadAction<string>) {
            state.msg = action.payload;
        }
    },
});

export const { updateOpen, updateMsg } = snackbarSlice.actions;
export default snackbarSlice.reducer;