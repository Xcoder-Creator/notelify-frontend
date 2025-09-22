import { Editor } from '@tiptap/react';
import { store } from "@/store";
import { updateFormattingOptions } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";

/**
 * A method to toggle formatting options for the note editor.
 * @param option - The selected option from the formatting options block
 * @param editor - Tiptap editor instance
 * @return void
 */
const toggleFormattingOptions = (option: number, editor: Editor | null) => {
    if (option === 1){ // For heading 1
        store.dispatch(updateFormattingOptions({ headerOne: true, headerTwo: false, normalText: false }));
        
        if (!editor?.isActive('heading', { level: 1 })) {
            editor?.chain().focus().toggleHeading({ level: 1 }).run();
        }
    } else if (option === 2){ // For heading 2
        store.dispatch(updateFormattingOptions({ headerOne: false, headerTwo: true, normalText: false }));

        if (!editor?.isActive('heading', { level: 2 })) {
            editor?.chain().focus().toggleHeading({ level: 2 }).run();
        }
    } else if (option === 3){ // For normal
        store.dispatch(updateFormattingOptions({ headerOne: false, headerTwo: false, normalText: true }));

        editor?.chain().focus().setParagraph().run();
    } else if (option === 4){ // For bold
        if (store.getState().formattingOptionsToolbar.bold){
            store.dispatch(updateFormattingOptions({ bold: false }));
            editor?.chain().focus().unsetBold().run();
        } else {
            store.dispatch(updateFormattingOptions({ bold: true }));
            editor?.chain().focus().setBold().run();
        }
    } else if (option === 5){ // For italic
        if (store.getState().formattingOptionsToolbar.italic){
            store.dispatch(updateFormattingOptions({ italic: false }));
            editor?.chain().focus().unsetItalic().run();
        } else {
            store.dispatch(updateFormattingOptions({ italic: true }));
            editor?.chain().focus().setItalic().run();
        }
    } else if (option === 6){ // For underline
        if (store.getState().formattingOptionsToolbar.underline){
            store.dispatch(updateFormattingOptions({ underline: false }));
            editor?.chain().focus().unsetUnderline().run();
        } else {
            store.dispatch(updateFormattingOptions({ underline: true }));
            editor?.chain().focus().setUnderline().run();
        }
    } else if (option === 7){ // Clear the formatting of contents within the editor
        if (!editor) return;

        const docJson = editor.state.doc.toJSON();

        if (!docJson.content || !Array.isArray(docJson.content)) return;

        const plainParagraphs = docJson.content.map((node: any) => {
            const textNodes = (node.content ?? []).map((child: any) => {
                return {
                    type: 'text',
                    text: child.text ?? '',
                };
            });

            return {
                type: 'paragraph',
                content: textNodes,
            };
        });

        /* Reset the formatting options toolbar back to its default */
        store.dispatch(updateFormattingOptions({ 
            headerOne: false, 
            headerTwo: false, 
            normalText: true, 
            bold: false, 
            italic: false, 
            underline: false 
        }));
        /* ------------------------------------------ */

        editor?.commands.setContent(plainParagraphs); // Replace the content of the editor with plain paragraphs
    }
}

export default toggleFormattingOptions;