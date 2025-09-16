import { configureStore } from '@reduxjs/toolkit';
import backgroundToolbarReducer from './slices/note-editor/backgroundToolbarSlice';
import formattingOptionsBlockReducer from './slices/note-editor/formattingOptionsBlockSlice';
import editorReducer from './slices/note-editor/editorSlice';
import snackbarReducer from './slices/snackbarSlice';
import dropdownMenuReducer from './slices/note-editor/dropdownMenuSlice';
import notesReducer from './slices/notesSlice';
import headerReducer from './slices/header/headerSlice';
import animatedHeaderBackgroundToolbarReducer from './slices/header/animatedHeaderBackgroundToolbarSlice';
import drawerReducer from './slices/drawerSlice';
import backgroundToolbarBottomSheetReducer from './slices/backgroundToolbarBottomSheetSlice';
import userAuthReducer from './slices/userAuthSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
    reducer: {
        backgroundToolbar: backgroundToolbarReducer,
        formattingOptionsBlock: formattingOptionsBlockReducer,
        editor: editorReducer,
        snackbar: snackbarReducer,
        dropdownMenu: dropdownMenuReducer,
        notes: notesReducer,
        header: headerReducer,
        animatedHeaderBackgroundToolbar: animatedHeaderBackgroundToolbarReducer,
        drawer: drawerReducer,
        backgroundToolbarBottomSheet: backgroundToolbarBottomSheetReducer,
        userAuth: userAuthReducer,
        theme: themeReducer
    }
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;