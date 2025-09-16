import { AppDispatch } from "@/store";
import { updateActiveBgTheme, updateActiveWallpaper } from '@/store/slices/note-editor/backgroundToolbarSlice';
import { updateFormattingOptionsBlockTheme } from "@/store/slices/note-editor/formattingOptionsBlockSlice";
import { RefObject } from "react";
import updateNoteEditorDialogThemeAndWallpaper from "./updateNoteEditorDialogThemeAndWallpaper";

/**
 * This method allows the user to pick any theme or wallpaper of their choice
 * @param dispatch - The dispatch method for redux
 * @param type - The type of background (Theme or Wallpaper)
 * @param id - The ID of the theme or wallpaper selected
 * @param value - The value of the theme/wallpaper (For theme its color and for wallpaper its the url)
 * @param noteEditorAndPlaceholderRef - The reference to the note editor and placeholder container
 * @param noteEditorAndTitleInputRef - The reference to the note editor and title input div container
 * @returns void
 */
const handleBgThemeAndWallpaperSelect = (dispatch: AppDispatch, type: string, id: number, value: string, noteEditorAndPlaceholderRef: RefObject<HTMLDivElement | null>, noteEditorAndTitleInputRef: RefObject<HTMLDivElement | null>) => {
    updateNoteEditorDialogThemeAndWallpaper(dispatch, type, id); // Update the theme and wallpaper of the note editor dialog

    // Check if the user is selecting a theme or a wallpaper
    if (type === 'theme'){
        dispatch(updateActiveBgTheme(id)); // Make the theme that the user selected to be the active theme
        
        if (noteEditorAndPlaceholderRef.current){ // Check if the note editor and placeholder ref is available
            if (id === 0){
                noteEditorAndPlaceholderRef.current.style.backgroundColor = '#202124';
                noteEditorAndPlaceholderRef.current.style.borderColor = '#5f6368';
                dispatch(updateFormattingOptionsBlockTheme('#202124'));
            } else {
                noteEditorAndPlaceholderRef.current.style.backgroundColor = value;
                noteEditorAndPlaceholderRef.current.style.borderColor = value;
                dispatch(updateFormattingOptionsBlockTheme(value));
            }
        }
    } else if (type === 'wallpaper'){
        dispatch(updateActiveWallpaper(id)); // Make the wallpaper that the user selected to be the active wallpaper

        if (noteEditorAndTitleInputRef.current){ // Check if the note editor and title input ref is available
            if (id === 0){
                noteEditorAndTitleInputRef.current.style.background = `url()`;
            } else {
                noteEditorAndTitleInputRef.current.style.background = `url(${value})`;                  
            }
        }
    }
}

export default handleBgThemeAndWallpaperSelect;