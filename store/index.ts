import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './slices/snackbarSlice';
import userAuthReducer from './slices/userAuthSlice';
import themeReducer from './slices/themeSlice';
import drawerReducer from './slices/drawerSlice';
import editorReducer from './slices/note_editor/editorSlice';
import actionToolbarReducer from './slices/note_editor/actionToolbarSlice';
import formattingOptionsToolbarReducer from './slices/note_editor/formattingOptionsToolbarSlice';
import backgroundOptionsToolbarReducer from './slices/note_editor/backgroundOptionsToolbarSlice';
import notesReducer from './slices/notesSlice';
import headerReducer from './slices/headerSlice';
import bottomSheetReducer from './slices/bottomSheetSlice';

// The configured redux data store
export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
        userAuth: userAuthReducer,
        theme: themeReducer,
        drawer: drawerReducer,
        editor: editorReducer,
        actionToolbar: actionToolbarReducer,
        formattingOptionsToolbar: formattingOptionsToolbarReducer,
        backgroundOptionsToolbar: backgroundOptionsToolbarReducer,
        notes: notesReducer,
        header: headerReducer,
        bottomSheet: bottomSheetReducer
    }
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;