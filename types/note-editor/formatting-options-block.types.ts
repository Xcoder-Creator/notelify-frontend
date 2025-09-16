import { Dispatch, SetStateAction } from "react";
import { Editor } from '@tiptap/react';

/**
 * Interface for the formatting options block in the note editor
 */
interface FormattingOptionsBlockProps {
    /** The editor instance */
    editor: Editor | null;

    /** The state for the header one formatting option */
    headerOne: boolean;

    /** The state for the header two formatting option */
    headerTwo: boolean;

    /** The state for the normal text formatting option */
    normalText: boolean;

    /** The state for the bold formatting option */
    bold: boolean;

    /** The state for the italic formatting option */
    italic: boolean;

    /** The state for the underline formatting option */
    underline: boolean;

    /** The state setter for the header one formatting option */
    setHeaderOne: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the header two formatting option */
    setHeaderTwo: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the normal text formatting option */
    setNormalText: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the bold formatting option */
    setBold: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the italic formatting option */
    setItalic: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the underline formatting option */
    setUnderline: Dispatch<SetStateAction<boolean>>;
}

export default FormattingOptionsBlockProps;