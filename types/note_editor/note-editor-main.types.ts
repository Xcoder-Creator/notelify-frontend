import { Dispatch, SetStateAction } from "react";
import { Editor } from '@tiptap/react';

/** Interface for the main note editor component */
interface NoteEditorMainProps {
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

    /** The ref of the note editor and title input */
    noteEditorAndTitleInputRef: React.RefObject<HTMLDivElement | null>;
}

export default NoteEditorMainProps;