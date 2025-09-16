import { AppDispatch } from "@/store";
import { updateActiveBgTheme, updateActiveWallpaper } from "@/store/slices/backgroundToolbarBottomSheetSlice";

/**
 * This method updates the theme and wallpaper of the note editor dialog
 * @param dispatch - The dispatch method for redux
 * @param type - The type of background (Theme or Wallpaper)
 * @param id - The ID of the theme or wallpaper selected
 * @returns void
 */
const updateNoteEditorDialogThemeAndWallpaper = (dispatch: AppDispatch, type: string, id: number) => {
    // Check if the user is selecting a theme or a wallpaper
    if (type === 'theme'){
        if (id === 0){
            dispatch(updateActiveBgTheme(0)); // Make the theme that the user selected to be the active theme
        } else {
            dispatch(updateActiveBgTheme(id)); // Make the theme that the user selected to be the active theme
        }
    } else if (type === 'wallpaper'){
        if (id === 0){
            dispatch(updateActiveWallpaper(0)); // Make the wallpaper that the user selected to be the active wallpaper
        } else {
            dispatch(updateActiveWallpaper(id)); // Make the wallpaper that the user selected to be the active wallpaper                    
        }
    }
}

export default updateNoteEditorDialogThemeAndWallpaper;