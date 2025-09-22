import FormattingOptionsToolbarReduxStateProps from '@/types/note_editor/formatting-options-toolbar-redux-state.types';
import FormattingOptions from '@/types/note_editor/formatting-options.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* 
    This redux slice manages the state of the formatting options toolbar in the note editor 
*/
const initialState: FormattingOptionsToolbarReduxStateProps = {
    state: false,
    theme: 0,
    headerOne: false,
    headerTwo: false,
    normalText: true,
    bold: false,
    italic: false,
    underline: false
};

const formattingOptionsToolbarSlice = createSlice({
    name: 'formattingOptionsToolbar',
    initialState,
    reducers: {
        /* Update the state of the formatting options toolbar */
        updateFormattingOptionsToolbarState(state, action: PayloadAction<boolean>) {
            state.state = action.payload;
        },

        /* Update the theme of the formatting options toolbar */
        updateFormattingOptionsToolbarTheme(state, action: PayloadAction<number>) {
            state.theme = action.payload;
        },

        /** Update the formatting options */
        updateFormattingOptions(state, action: PayloadAction<Partial<FormattingOptions>>) {
            for (const key in action.payload) {
                const value = action.payload[key as keyof FormattingOptions];
                if (value !== undefined) {
                    state[key as keyof FormattingOptions] = value as boolean;
                }
            }
        },

        /* Reset the state of the formatting options toolbar to its default */
        resetFormattingOptionsToolbar(state) {
            state.theme = 0;
            state.state = false;
            state.headerOne = false;
            state.headerTwo = false;
            state.normalText = true;
            state.bold = false;
            state.italic = false;
            state.underline = false;
        },
    },
});

export const { updateFormattingOptionsToolbarState, updateFormattingOptionsToolbarTheme, updateFormattingOptions, resetFormattingOptionsToolbar } = formattingOptionsToolbarSlice.actions;
export default formattingOptionsToolbarSlice.reducer;