import { Editor } from '@tiptap/react';
import { store } from "@/store";
import { updateIsFocused } from '@/store/slices/note_editor/editorSlice';

/**
 * When the user focuses on the placeholder input, we render the editor and hide the editor placeholder.
 * @param editor - Tiptap editor instance
 * @return void
 */
const handlePlaceholderInputFocus = (editor: Editor | null) => {
    store.dispatch(updateIsFocused(true)); // Setting true will replace the placeholder with the actual editor

    try {
        if (editor && editor.view && editor.commands.focus) { // Check if the editor instance is available
            editor.commands.focus(); // Focus on the editor immediately after it has been rendered
        }
    } catch (error) {
        // Don't throw any errors
    }
}

export default handlePlaceholderInputFocus;