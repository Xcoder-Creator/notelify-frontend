import { store } from "@/store";
import { updateActiveBgTheme, updateActiveWallpaper } from "@/store/slices/note_editor/backgroundOptionsToolbarSlice";

/**
 * This method allows the user to pick any theme or wallpaper of their choice
 * which will then be applied to the selected notes.
 * @param type - The type of background (Theme or Wallpaper)
 * @param id - The ID of the theme or wallpaper selected
 * @param value - The value of the theme/wallpaper (For theme its color and for wallpaper its the url)
 * @returns void
 */
const handleBgThemeAndWallpaperSelect = (type: string, id: number, value: string) => {
    // Check if the user is selecting a theme or a wallpaper
    if (type === 'theme'){
        store.dispatch(updateActiveBgTheme({ themeID: id })); // Make the theme that the user selected to be the active theme
    } else if (type === 'wallpaper'){
        store.dispatch(updateActiveWallpaper({ wallpaperID: id })); // Make the wallpaper that the user selected to be the active wallpaper
    }
}

export default handleBgThemeAndWallpaperSelect;