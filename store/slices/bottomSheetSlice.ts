import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** The bottom sheet props */
interface BottomSheetReduxStateProps {
    /** The state of the bottomsheet */
    state: boolean;
}

/* 
    This redux slice manages the state of the bottomsheet
*/
const initialState: BottomSheetReduxStateProps = {
    state: false
};

const bottomSheetSlice = createSlice({
    name: 'bottomsheet',
    initialState,
    reducers: {
        /* Toggle the state of the bottomsheet */
        toggleBottomSheet(state, action: PayloadAction<boolean>) {
            state.state = action.payload;
        }
    },
});

export const { toggleBottomSheet } = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;