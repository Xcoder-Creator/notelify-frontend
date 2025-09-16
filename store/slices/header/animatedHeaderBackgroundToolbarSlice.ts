import BackgroundToolbarReduxStateProps from '@/types/note-editor/background-toolbar-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BackgroundToolbarReduxStateProps = {
    activeBgTheme: 0,
    activeWallpaper: 0
};

const animatedHeaderBackgroundToolbarSlice = createSlice({
    name: 'animatedHeaderBackgroundToolbar',
    initialState,
    reducers: {
        /* Update the active background theme */
        updateActiveBgTheme(state, action: PayloadAction<number>) {
            state.activeBgTheme = action.payload;
        },

        /* Update the active wallpaper */
        updateActiveWallpaper(state, action: PayloadAction<number>) {
            state.activeWallpaper = action.payload;
        }
    },
});

export const { updateActiveBgTheme, updateActiveWallpaper } = animatedHeaderBackgroundToolbarSlice.actions;
export default animatedHeaderBackgroundToolbarSlice.reducer;