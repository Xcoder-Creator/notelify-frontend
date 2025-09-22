import { Editor } from '@tiptap/react';
import { store } from "@/store";
import { resetNoteEditorState, updateEditorTitle } from '@/store/slices/note_editor/editorSlice';
import { resetActionToolbar } from '@/store/slices/note_editor/actionToolbarSlice';
import { resetFormattingOptionsToolbar } from '@/store/slices/note_editor/formattingOptionsToolbarSlice';
import { resetBackgroundOptionsToolbar } from '@/store/slices/note_editor/backgroundOptionsToolbarSlice';

/**
 * Close the editor and replace it with the placeholder.
 * @param editor - Tiptap editor instance
 * @return void
 */
const closeEditor = (editor: Editor | null) => {
    store.dispatch(resetNoteEditorState()); // Reset the note editor state in redux
    editor?.destroy(); // Destroy the editor instance
    store.dispatch(resetActionToolbar()); // Reset the action toolbar state
    store.dispatch(resetBackgroundOptionsToolbar()); // Reset the state of the background options toolbar to default
    store.dispatch(resetFormattingOptionsToolbar()); // Reset the state of the formatting options toolbar back to default
}

export default closeEditor;