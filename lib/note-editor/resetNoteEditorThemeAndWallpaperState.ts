import { AppDispatch } from '@/store';
import { updateActiveBgTheme, updateActiveWallpaper } from '@/store/slices/backgroundToolbarBottomSheetSlice';
import { resetFormattingOptionsBlock } from '@/store/slices/note-editor/formattingOptionsBlockSlice';
import { constants } from 'buffer';
import { RefObject } from 'react';

/**
 * Reset the editors theme and wallpaper state to its default.
 * @param dispatch - The dispatch method for redux
 * @param noteEditorAndTitleInputRef - The reference to the note editor and title input component
 * @param noteEditorAndPlaceholderRef - The reference to the note editor and placeholder component
 * @return void
 */
const resetNoteEditorThemeAndWallpaperState = (dispatch: AppDispatch, noteEditorAndTitleInputRef: RefObject<HTMLDivElement | null> | null, noteEditorAndPlaceholderRef: RefObject<HTMLDivElement | null> | null) => {
    dispatch(resetFormattingOptionsBlock()); // Reset the formatting options block theme
    dispatch(updateActiveBgTheme(0)); // Reset the active background theme
    dispatch(updateActiveWallpaper(0)); // Reset the active background wallpaper

    if (noteEditorAndTitleInputRef){
        if (noteEditorAndTitleInputRef.current){
            if (noteEditorAndTitleInputRef.current === null) return;
            noteEditorAndTitleInputRef.current.style.backgroundColor = '#202124';
            noteEditorAndTitleInputRef.current.style.backgroundImage = 'none';
        }
    }

    if (noteEditorAndPlaceholderRef){
        if (noteEditorAndPlaceholderRef.current){
            if (noteEditorAndPlaceholderRef.current === null) return;
            noteEditorAndPlaceholderRef.current.style.backgroundColor = 'var(--background)';
            noteEditorAndPlaceholderRef.current.style.borderColor = 'var(--editor-border)';
        }
    }
}

export default resetNoteEditorThemeAndWallpaperState;