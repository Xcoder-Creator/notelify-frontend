import BackgroundOptionsToolbarReduxStateProps from '@/types/note_editor/background-options-toolbar-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* 
    This redux slice manages the state of the background options toolbar in the note editor 
*/
const initialState: BackgroundOptionsToolbarReduxStateProps = {
    state: false,
    activeBgTheme: 0,
    activeWallpaper: 0
};

const backgroundOptionsToolbarSlice = createSlice({
    name: 'backgroundOptionsToolbar',
    initialState,
    reducers: {
        /* Toggle the state of the background options toolbar */
        toggleBackgroundOptionsToolbarState(state, action: PayloadAction<boolean>) {
            state.state = action.payload;
        },

        /* Update the active background theme/color */
        updateActiveBgTheme(state, action: PayloadAction<{
            /** The ID of the background theme/color */
            themeID: number;
        }>) {   
            state.activeBgTheme = action.payload.themeID;
        },

        /* Update the active wallpaper */
        updateActiveWallpaper(state, action: PayloadAction<{
            /** The ID of the wallpaper */
            wallpaperID: number;
        }>) {
            state.activeWallpaper = action.payload.wallpaperID;
        },

        /** Reset the state of the background options toolbar */
        resetBackgroundOptionsToolbar(state) {
            state.state = false;
            state.activeBgTheme = 0;
            state.activeWallpaper = 0;
        }
    },
});

export const { toggleBackgroundOptionsToolbarState, updateActiveBgTheme, updateActiveWallpaper, resetBackgroundOptionsToolbar } = backgroundOptionsToolbarSlice.actions;
export default backgroundOptionsToolbarSlice.reducer;