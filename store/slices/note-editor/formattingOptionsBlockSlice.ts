import FormattingOptionsBlockReduxStateProps from '@/types/note-editor/formatting-options-block-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FormattingOptionsBlockReduxStateProps = {
    state: false,
    theme: 0
};

const formattingOptionsBlockSlice = createSlice({
    name: 'formattingOptionsBlock',
    initialState,
    reducers: {
        /* Update the state of the formatting options block */
        updateFormattingOptionsBlockState(state, action: PayloadAction<boolean>) {
            state.state = action.payload;
        },

        /* Update the theme of the formatting options block */
        updateFormattingOptionsBlockTheme(state, action: PayloadAction<number>) {
            state.theme = action.payload;
        },

        /* Reset the theme of the formatting options block to its default */
        resetFormattingOptionsBlock(state, action: PayloadAction<void>) {
            state.theme = 0;
            state.state = false;
        }
    },
});

export const { updateFormattingOptionsBlockState, updateFormattingOptionsBlockTheme, resetFormattingOptionsBlock } = formattingOptionsBlockSlice.actions;
export default formattingOptionsBlockSlice.reducer;