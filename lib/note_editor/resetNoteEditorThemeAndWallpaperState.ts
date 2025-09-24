import { store } from '@/store';
import { updateActiveBgTheme, updateActiveWallpaper } from '@/store/slices/note_editor/backgroundOptionsToolbarSlice';
import { resetFormattingOptionsToolbar } from '@/store/slices/note_editor/formattingOptionsToolbarSlice';
import { RefObject } from 'react';

/**
 * Reset the editors theme and wallpaper state to its default.
 * @param noteEditorAndTitleInputRef - The reference to the note editor and title input component
 * @param noteEditorPlaceholderRef - The reference to the note editor placeholder component
 * @return void
 */
const resetNoteEditorThemeAndWallpaperState = (noteEditorAndTitleInputRef: RefObject<HTMLDivElement | null> | null, noteEditorPlaceholderRef: RefObject<HTMLDivElement | null> | null) => {
    store.dispatch(resetFormattingOptionsToolbar()); // Reset the state of the formatting options toolbar
    store.dispatch(updateActiveBgTheme({ themeID: 0 })); // Reset the active background theme
    store.dispatch(updateActiveWallpaper({ wallpaperID: 0 })); // Reset the active background wallpaper

    if (noteEditorAndTitleInputRef){
        if (noteEditorAndTitleInputRef.current){
            if (noteEditorAndTitleInputRef.current === null) return;
            noteEditorAndTitleInputRef.current.style.backgroundColor = '#202124';
            noteEditorAndTitleInputRef.current.style.backgroundImage = 'none';
        }
    }

    if (noteEditorPlaceholderRef){
        if (noteEditorPlaceholderRef.current){
            if (noteEditorPlaceholderRef.current === null) return;
            noteEditorPlaceholderRef.current.style.backgroundColor = 'var(--background)';
            noteEditorPlaceholderRef.current.style.borderColor = 'var(--editor-border)';
        }
    }
}

export default resetNoteEditorThemeAndWallpaperState;