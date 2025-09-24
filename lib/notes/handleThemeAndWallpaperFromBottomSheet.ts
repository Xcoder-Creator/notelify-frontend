import { store } from "@/store";
import { updateActiveBgTheme, updateActiveWallpaper } from "@/store/slices/note_editor/backgroundOptionsToolbarSlice";
import { updateFormattingOptionsToolbarTheme } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";
import { updateCurrentNoteTheme, updateNoteTheme, updateNoteWallpaper, updateThemeOrWallpaperOfCurrentViewedNote } from "@/store/slices/notesSlice";
import backgroundThemes from "@/utils/note_editor/background_options_toolbar/backgroundThemes.util";

/**
 * This method allows the user to pick any theme or wallpaper of their choice.
 * @param type - The type of background (Theme or Wallpaper)
 * @param id - The ID of the theme or wallpaper selected
 * @returns void
 */
const handleThemeAndWallpaperFromBottomSheet = (type: string, id: number) => {
    // Check if the user is selecting a theme or a wallpaper
    if (type === 'theme'){
        store.dispatch(updateActiveBgTheme({ themeID: id })); // Make the theme that the user selected to be the active theme
        store.dispatch(updateNoteTheme({ bgColor: id })); // Update the theme of the selected notes
        store.dispatch(updateCurrentNoteTheme({ themeID: id })); // Update the theme of the current note in the editor
        store.dispatch(updateThemeOrWallpaperOfCurrentViewedNote({ type: "theme", themeID: id, wallpaperID: 0 })); // Update the theme of the current viewed note

        if (id === 0){
            store.dispatch(updateFormattingOptionsToolbarTheme(id));
        } else {
            let theme = backgroundThemes.find(theme => theme.id === id);
            if (!theme) return;
            store.dispatch(updateFormattingOptionsToolbarTheme(theme.id));   
        }
    } else if (type === 'wallpaper'){
        store.dispatch(updateActiveWallpaper({ wallpaperID: id })); // Make the wallpaper that the user selected to be the active wallpaper
        store.dispatch(updateNoteWallpaper({ wallpaper: id })); // Update the wallpaper of the selected notes
        store.dispatch(updateThemeOrWallpaperOfCurrentViewedNote({ type: "wallpaper", themeID: 0, wallpaperID: id })); // Update the wallpaper of the current viewed note
    }
}

export default handleThemeAndWallpaperFromBottomSheet;