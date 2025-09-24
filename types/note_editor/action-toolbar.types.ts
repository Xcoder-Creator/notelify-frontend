import { Editor } from '@tiptap/react';
import { Dispatch, RefObject, SetStateAction } from 'react';

/**
 * Interface for the action toolbar in the note editor
 */
interface NoteEditorActionToolbarProps {
    /** The editor instance */
    editor: Editor | null;

    /** The ref of the note editor placeholder */
    noteEditorPlaceholderRef: RefObject<HTMLDivElement | null>;

    /** The ref of the note editor and title input */
    noteEditorAndTitleInputRef: RefObject<HTMLDivElement | null>;

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

    /** The local dialog state */
    dialogComp: boolean | null;
    
    /** The setter method for the local dialog state */
    setDialogComp: Dispatch<SetStateAction<boolean>> | null;
}

export default NoteEditorActionToolbarProps;