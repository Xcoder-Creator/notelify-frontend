import { AppDispatch } from "@/store";
import { updateActiveBgTheme, updateActiveWallpaper } from '@/store/slices/backgroundToolbarBottomSheetSlice';
import { updateFormattingOptionsBlockTheme } from "@/store/slices/note-editor/formattingOptionsBlockSlice";
import appTheme from "@/utils/appTheme.util";
import backgroundThemes from "@/utils/background-toolbar/backgroundThemes.util";

/**
 * This method allows the user to pick any theme or wallpaper of their choice
 * @param dispatch - The dispatch method for redux
 * @param type - The type of background (Theme or Wallpaper)
 * @param id - The ID of the theme or wallpaper selected
 * @param value - The value of the theme/wallpaper (For theme its color and for wallpaper its the url)
 * @returns void
 */
const handleThemeAndWallpaperFromBottomSheet = (dispatch: AppDispatch, type: string, id: number) => {
    // Check if the user is selecting a theme or a wallpaper
    if (type === 'theme'){
        dispatch(updateActiveBgTheme(id)); // Make the theme that the user selected to be the active theme
        if (id === 0){
            dispatch(updateFormattingOptionsBlockTheme(0));
        } else {
            let theme = backgroundThemes.find(theme => theme.id === id);
            if (!theme) return;
            dispatch(updateFormattingOptionsBlockTheme(theme.id));   
        }
    } else if (type === 'wallpaper'){
        dispatch(updateActiveWallpaper(id)); // Make the wallpaper that the user selected to be the active wallpaper
    }
}

export default handleThemeAndWallpaperFromBottomSheet;