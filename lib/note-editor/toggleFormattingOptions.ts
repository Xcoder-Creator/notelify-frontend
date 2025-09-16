import { Dispatch, SetStateAction } from "react";
import { Editor } from '@tiptap/react';

/**
 * A method to toggle formatting options for the note editor
 * @param option - The selected option from the formatting options block
 * @param editor - Tiptap editor instance
 * @param bold - The state of the bold formatting option
 * @param italic - The state of the italic formatting option
 * @param underline - The state of the underline formatting option
 * @param setHeaderOne - The state setter for header one formatting option
 * @param setHeaderTwo - The state setter for header two formatting option
 * @param setNormalText - The state setter for normal text formatting option
 * @param setBold - The state setter for bold formatting option
 * @param setItalic - The state setter for italic formatting option
 * @param setUnderline - The state setter for underline formatting option
 * @return void
 */
const toggleFormattingOptions = (
    option: number, 
    editor: Editor | null,
    bold: boolean,
    italic: boolean,
    underline: boolean,
    setHeaderOne: Dispatch<SetStateAction<boolean>>, 
    setHeaderTwo: Dispatch<SetStateAction<boolean>>, 
    setNormalText: Dispatch<SetStateAction<boolean>>,
    setBold: Dispatch<SetStateAction<boolean>>,
    setItalic: Dispatch<SetStateAction<boolean>>,
    setUnderline: Dispatch<SetStateAction<boolean>>,
    ) => {
    if (option === 1){ // For heading 1
        setHeaderOne(true);
        setHeaderTwo(false);
        setNormalText(false);
        if (!editor?.isActive('heading', { level: 1 })) {
            editor?.chain().focus().toggleHeading({ level: 1 }).run();
        }
    } else if (option === 2){ // For heading 2
        setHeaderTwo(true);
        setHeaderOne(false);
        setNormalText(false);
        if (!editor?.isActive('heading', { level: 2 })) {
            editor?.chain().focus().toggleHeading({ level: 2 }).run();
        }
    } else if (option === 3){ // For normal
        setNormalText(true);
        setHeaderOne(false);
        setHeaderTwo(false);
        editor?.chain().focus().setParagraph().run();
    } else if (option === 4){ // For bold
        if (bold){
            setBold(false);
            editor?.chain().focus().unsetBold().run();
        } else {
            setBold(true);
            editor?.chain().focus().setBold().run();
        }
    } else if (option === 5){ // For italic
        if (italic){
            setItalic(false);
            editor?.chain().focus().unsetItalic().run();
        } else {
            setItalic(true);
            editor?.chain().focus().setItalic().run();
        }
    } else if (option === 6){ // For underline
        if (underline){
            setUnderline(false);
            editor?.chain().focus().unsetUnderline().run();
        } else {
            setUnderline(true);
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

        /* Reset the formatting options block back to its default */
        setHeaderOne(false);
        setHeaderTwo(false);
        setNormalText(true);
        setBold(false);
        setItalic(false);
        setUnderline(false);
        /* ------------------------------------------ */

        editor?.commands.setContent(plainParagraphs); // Replace the content of the editor with plain paragraphs
    }
}

export default toggleFormattingOptions;