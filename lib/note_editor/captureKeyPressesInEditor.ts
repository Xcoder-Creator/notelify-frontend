import { KeyboardEvent } from "react";
import { Editor } from '@tiptap/react';
import { store } from "@/store";
import { updateFormattingOptions } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";

/**
 * This method captures key presses in the note editor and applies formatting based on the pressed keys.
 * It supports bold, italic, and underline formatting using Ctrl/Cmd + B/I/U shortcuts.
 * @param e - Keyboard event to capture key presses
 * @param editor - Tiptap editor instance
 * @return void
 */
const captureKeyPressesInEditor = (e: KeyboardEvent<HTMLDivElement>, editor: Editor | null) => {
    if (e.key === 'b' && (e.ctrlKey || e.metaKey)) { // Check for Ctrl/Cmd + B (bold)
        e.preventDefault();

        if (store.getState().formattingOptionsToolbar.bold) {
            store.dispatch(updateFormattingOptions({ bold: false }));
            editor?.chain().focus().unsetBold().run();
        } else {
            store.dispatch(updateFormattingOptions({ bold: true }));
            editor?.chain().focus().setBold().run();
        }
    } else if (e.key === 'i' && (e.ctrlKey || e.metaKey)) { // Check for Ctrl/Cmd + I (italic)
        e.preventDefault();

        if (store.getState().formattingOptionsToolbar.italic) {
            store.dispatch(updateFormattingOptions({ italic: false }));
            editor?.chain().focus().unsetItalic().run();
        } else {
            store.dispatch(updateFormattingOptions({ italic: true }));
            editor?.chain().focus().setItalic().run();
        }
    } else if (e.key === 'u' && (e.ctrlKey || e.metaKey)) { // Check for Ctrl/Cmd + U (underline)
        e.preventDefault();

        if (store.getState().formattingOptionsToolbar.underline) {
            store.dispatch(updateFormattingOptions({ underline: false }));
            editor?.chain().focus().unsetUnderline().run();
        } else {
            store.dispatch(updateFormattingOptions({ underline: true }));
            editor?.chain().focus().setUnderline().run();
        }
    }
}

export default captureKeyPressesInEditor;