import { Editor } from "@tiptap/react";
import { updateEditorContent } from "@/store/slices/note_editor/editorSlice";
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import { updateFormattingOptions } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";
import { updateRedoButton, updateUndoButton } from "@/store/slices/note_editor/actionToolbarSlice";
import { store } from "@/store";

/**
 * This method creates a new editor instance.
 * @param editorContent - This is the content of the editor
 * @returns Editor
 */
const createNewEditorInstance = (editorContent: string) => {
    const newEditor = new Editor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: 'Take a note...' })
        ],
        content: editorContent,
        onSelectionUpdate: ({ editor }) => {
            store.dispatch(updateFormattingOptions({
                headerOne: editor.isActive('heading', { level: 1 }),
                headerTwo: editor.isActive('heading', { level: 2 }),
                normalText: editor.isActive('paragraph'),
                bold: editor.isActive('bold'),
                italic: editor.isActive('italic'),
                underline: editor.isActive('underline'),
            }));
        },
        onTransaction: ({ editor }) => {
            store.dispatch(updateUndoButton(editor.can().undo()));
            store.dispatch(updateRedoButton(editor.can().redo()));
        },
        onCreate: ({ editor }) => {
            if (store.getState().editor.isFocused) {
                editor.commands.focus('end');
            } 
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            store.dispatch(updateEditorContent(html));
        }
    });

    return newEditor;
}

export default createNewEditorInstance;