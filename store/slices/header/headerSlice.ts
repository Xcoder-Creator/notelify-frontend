import { HeaderReduxStateProps } from '@/types/header/header-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: HeaderReduxStateProps = {
    isAnimatedHeaderVisible: false
};

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        /* Update the visibility of the animated header */
        updateIsAnimatedHeaderVisible(state, action: PayloadAction<boolean>) {
            state.isAnimatedHeaderVisible = action.payload;
        }
    },
});

export const { updateIsAnimatedHeaderVisible } = headerSlice.actions;
export default headerSlice.reducer;