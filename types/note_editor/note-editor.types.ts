import { Dispatch, RefObject, SetStateAction } from "react";
import { Editor } from '@tiptap/react';

/**
 * Interface for the note editor component
 */
interface NoteEditorProps {
    /** The editor instance */
    editor: Editor | null;

    /** The reference to the note editor placeholder container */
    noteEditorPlaceholderRef: RefObject<HTMLDivElement | null>;

    /** The reference to the background options button */
    backgroundOptionsButtonRef: RefObject<HTMLButtonElement | null>;

    /** The reference to the background options toolbar */
    backgroundOptionsToolbarRef: RefObject<HTMLDivElement | null>;

    /** The reference to the dropdown menu */
    dropdownMenuRef: RefObject<HTMLDivElement | null>;

    /** The reference to the more button */
    moreOptionsButtonRef: RefObject<HTMLButtonElement | null>;

    /** The reference to the file input for selecting files in the note editor */
    fileInputRef: RefObject<HTMLInputElement | null>;

    /** The array of selected images */
    selectedImages: File[];
    
    /** The setter method for updating the contents of the selected images array */
    setSelectedImages: Dispatch<SetStateAction<File[]>>;
}

export default NoteEditorProps;