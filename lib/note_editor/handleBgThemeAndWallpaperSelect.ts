import { store } from "@/store";
import { updateActiveBgTheme, updateActiveWallpaper } from "@/store/slices/note_editor/backgroundOptionsToolbarSlice";
import { updateFormattingOptionsToolbarTheme } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";
import { updateCurrentNoteTheme } from "@/store/slices/notesSlice";
import { RefObject } from "react";

/**
 * This method allows the user to pick any theme or wallpaper of their choice.
 * @param type - The type of background (Theme or Wallpaper)
 * @param id - The ID of the theme or wallpaper selected
 * @param value - The value of the theme/wallpaper (For theme its color and for wallpaper its the url)
 * @param noteEditorPlaceholderRef - The reference to the note editor and placeholder container
 * @param noteEditorAndTitleInputRef - The reference to the note editor and title input div container
 * @returns void
 */
const handleBgThemeAndWallpaperSelect = (type: string, id: number, value: string, noteEditorPlaceholderRef: RefObject<HTMLDivElement | null>, noteEditorAndTitleInputRef: RefObject<HTMLDivElement | null>) => {
    // Check if the user is selecting a theme or a wallpaper
    if (type === 'theme'){
        store.dispatch(updateActiveBgTheme({ themeID: id })); // Make the theme that the user selected to be the active theme
        store.dispatch(updateCurrentNoteTheme({ themeID: id })); // Update the theme of the current note in the editor
        
        if (noteEditorPlaceholderRef.current){ // Check if the note editor and placeholder ref is available
            if (id === 0){
                noteEditorPlaceholderRef.current.style.backgroundColor = '#202124';
                noteEditorPlaceholderRef.current.style.borderColor = '#5f6368';
                store.dispatch(updateFormattingOptionsToolbarTheme(0)); // Update the theme of the formatting options toolbar
            } else {
                noteEditorPlaceholderRef.current.style.backgroundColor = value;
                noteEditorPlaceholderRef.current.style.borderColor = value;
                store.dispatch(updateFormattingOptionsToolbarTheme(id)); // Update the theme of the formatting options toolbar
            }
        }
    } else if (type === 'wallpaper'){
        store.dispatch(updateActiveWallpaper({ wallpaperID: id })); // Make the wallpaper that the user selected to be the active wallpaper

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