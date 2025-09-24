import { Dispatch, SetStateAction } from "react";
import { Editor } from '@tiptap/react';

/** Interface for the note editor dialog component */
interface NoteEditorDialogProps {
    /** The editor instance */
    editor: Editor | null;

    /** The note editor placeholder ref */
    noteEditorPlaceholderRef: React.RefObject<HTMLDivElement | null>;

    /** The ref of the background options button in the action toolbar */
    backgroundOptionsButtonRef: React.RefObject<HTMLButtonElement | null>;
    
    /** The ref of the background options toolbar */
    backgroundOptionsToolbarRef: React.RefObject<HTMLDivElement | null>;
    
    /** The ref of the dropdown menu */
    dropdownMenuRef: React.RefObject<HTMLDivElement | null>;
    
    /** The ref of the more button */
    moreOptionsButtonRef: React.RefObject<HTMLButtonElement | null>;
    
    /** The ref for the file input */
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    
    /** The state for holding all selected images */
    selectedImages: File[];

    /** The setter for the selected images state */
    setSelectedImages: Dispatch<SetStateAction<File[]>>;

    /** The setter method of the editor instance state */
    setEditor: React.Dispatch<React.SetStateAction<Editor | null>>;
    
    /** The reference to the editor instance */
    editorRef: React.RefObject<Editor | null>;
}

export default NoteEditorDialogProps;