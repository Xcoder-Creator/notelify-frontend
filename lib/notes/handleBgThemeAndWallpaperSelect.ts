import { AppDispatch } from "@/store";
import { updateActiveBgTheme, updateActiveWallpaper } from "@/store/slices/header/animatedHeaderBackgroundToolbarSlice";
import { updateNoteTheme, updateNoteWallpaper } from "@/store/slices/notesSlice";

/**
 * This method allows the user to pick any theme or wallpaper of their choice
 * which will then be applied to the selected notes
 * @param dispatch - The dispatch method for redux
 * @param type - The type of background (Theme or Wallpaper)
 * @param id - The ID of the theme or wallpaper selected
 * @param value - The value of the theme/wallpaper (For theme its color and for wallpaper its the url)
 * @returns void
 */
const handleBgThemeAndWallpaperSelect = (dispatch: AppDispatch, type: string, id: number, value: string) => {
    console.log(id)
    // Check if the user is selecting a theme or a wallpaper
    if (type === 'theme'){
        dispatch(updateActiveBgTheme(id)); // Make the theme that the user selected to be the active theme
        dispatch(updateNoteTheme({ themeID: id })); // Update the theme of the selected notes
    } else if (type === 'wallpaper'){
        dispatch(updateActiveWallpaper(id)); // Make the wallpaper that the user selected to be the active wallpaper
        dispatch(updateNoteWallpaper({ wallpaperID: id })); // Update the wallpaper of the selected notes
    }
}

export default handleBgThemeAndWallpaperSelect;