import { Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Editor } from '@tiptap/react';

/**
 * This method captures key presses in the note editor and applies formatting based on the pressed keys.
 * It supports bold, italic, and underline formatting using Ctrl/Cmd + B/I/U shortcuts
 * @param e - Keyboard event to capture key presses
 * @param editor - Tiptap editor instance
 * @param bold - Current bold formatting state
 * @param italic - Current italic formatting state
 * @param underline - Current underline formatting state
 * @param setBold - Setter function to update bold formatting state
 * @param setItalic - Setter function to update italic formatting state
 * @param setUnderline - Setter function to update underline formatting state
 * @return void
 */
const captureKeyPressesInEditor = (e: KeyboardEvent<HTMLDivElement>, editor: Editor | null, bold: boolean, italic: boolean, underline: boolean, setBold: Dispatch<SetStateAction<boolean>>, setItalic: Dispatch<SetStateAction<boolean>>, setUnderline: Dispatch<SetStateAction<boolean>>) => {
    if (e.key === 'b' && (e.ctrlKey || e.metaKey)) { // Check for Ctrl/Cmd + B (bold)
        e.preventDefault();

        if (bold) {
            setBold(false);
            editor?.chain().focus().unsetBold().run();
        } else {
            setBold(true);
            editor?.chain().focus().setBold().run();
        }
    } else if (e.key === 'i' && (e.ctrlKey || e.metaKey)) { // Check for Ctrl/Cmd + I (italic)
        e.preventDefault();

        if (italic) {
            setItalic(false);
            editor?.chain().focus().unsetItalic().run();
        } else {
            setItalic(true);
            editor?.chain().focus().setItalic().run();
        }
    } else if (e.key === 'u' && (e.ctrlKey || e.metaKey)) { // Check for Ctrl/Cmd + U (underline)
        e.preventDefault();

        if (underline) {
            setUnderline(false);
            editor?.chain().focus().unsetUnderline().run();
        } else {
            setUnderline(true);
            editor?.chain().focus().setUnderline().run();
        }
    }
}

export default captureKeyPressesInEditor;