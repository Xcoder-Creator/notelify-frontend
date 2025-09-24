import { Editor } from "@tiptap/react";
import resetNoteEditorThemeAndWallpaperState from "./resetNoteEditorThemeAndWallpaperState";
import { store } from "@/store";
import { resetActionToolbar } from "@/store/slices/note_editor/actionToolbarSlice";
import { resetBackgroundOptionsToolbar } from "@/store/slices/note_editor/backgroundOptionsToolbarSlice";
import { resetFormattingOptionsToolbar } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";
import { updateCurrentNoteTheme } from "@/store/slices/notesSlice";

/**
 * Reset the state of the entire note editor to its default.
 * @param editorRef - The reference to the editor instance
 * @param setEditor - The setter method for the editor instance
 * @param setSelectedImages - The setter method for the selected images state
 * @param noteEditorAndTitleInputRef - The reference to the noteEditorAndTitleInput
 * @param noteEditorPlaceholderRef - The reference to the noteEditorPlaceholder
 * @return void
 */
const resetNoteEditorState = (editorRef: React.RefObject<Editor | null>, setEditor: React.Dispatch<React.SetStateAction<Editor | null>>, setSelectedImages: React.Dispatch<React.SetStateAction<File[]>>, noteEditorAndTitleInputRef: React.RefObject<HTMLDivElement | null>, noteEditorPlaceholderRef: React.RefObject<HTMLDivElement | null>) => {
    editorRef.current?.destroy();
    editorRef.current = null;
    setEditor(null);
    setSelectedImages([]);
    resetNoteEditorThemeAndWallpaperState(noteEditorAndTitleInputRef, noteEditorPlaceholderRef);
    store.dispatch(resetActionToolbar());
    store.dispatch(resetBackgroundOptionsToolbar());
    store.dispatch(resetFormattingOptionsToolbar());
    store.dispatch(updateCurrentNoteTheme({ themeID: 0 }));
}

export default resetNoteEditorState;