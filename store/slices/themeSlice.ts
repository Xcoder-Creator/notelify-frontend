import { ThemeReduxStateProps } from '@/types/theme-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ThemeReduxStateProps = {
    theme: 'dark'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        /* Update the theme of the web app */
        updateTheme(state, action: PayloadAction<"dark" | "light">) {
            state.theme = action.payload;
        }
    },
});

export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;