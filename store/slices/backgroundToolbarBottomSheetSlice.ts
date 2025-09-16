import BackgroundToolbarReduxStateProps from '@/types/note-editor/background-toolbar-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * The initial state for the background toolbar bottom sheet
 */
const initialState: BackgroundToolbarReduxStateProps = {
    activeBgTheme: 0,
    activeWallpaper: 0
};

const backgroundToolbarBottomSheetSlice = createSlice({
    name: 'backgroundToolbarBottomSheet',
    initialState,
    reducers: {
        /* Update the active background theme */
        updateActiveBgTheme(state, action: PayloadAction<number>) {
            state.activeBgTheme = action.payload;
        },

        /* Update the active wallpaper */
        updateActiveWallpaper(state, action: PayloadAction<number>) {
            state.activeWallpaper = action.payload;
        },

        resetToolbar(state, action: PayloadAction<void>) {
            state.activeBgTheme = 0;
            state.activeWallpaper = 0;
        }
    },
});

export const { updateActiveBgTheme, updateActiveWallpaper, resetToolbar } = backgroundToolbarBottomSheetSlice.actions;
export default backgroundToolbarBottomSheetSlice.reducer;