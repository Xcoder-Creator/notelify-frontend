import { Dispatch, RefObject, SetStateAction } from "react";
import { Editor } from '@tiptap/react';

/**
 * Interface for the action toolbar in the note editor
 */
interface NoteEditorActionToolbarProps {
    /** The editor instance */
    editor: Editor | null;

    /** The state of the note editor dialog wether its opened(true) or closed(false) */
    dialogComp: boolean | null;

    /** The state setter for the note editor dialog */
    setDialogComp: Dispatch<SetStateAction<boolean>> | null;

    /** The formatting options button state */
    formattingOptionsButton: boolean | string;

    /** The state setter for the bold formatting option */
    setBold: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the italic formatting option */
    setItalic: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the underline formatting option */
    setUnderline: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the focused state that indicates if the editor is focused */
    setIsFocused: Dispatch<SetStateAction<boolean>>;

    /** The state of the undo action */
    undo: boolean;

    /** The state of the redo action */
    redo: boolean;

    /** The state setter for the header one formatting option */
    setHeaderOne: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the header two formatting option */
    setHeaderTwo: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the normal text formatting option */
    setNormalText: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the undo action */
    setUndo: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the redo action */
    setRedo: Dispatch<SetStateAction<boolean>>;

    /** The state that controls the visibility of the background toolbar */
    backgroundToolbarDisplay: boolean;

    /** The state setter for the background toolbar used to toggle its visibility */
    setBackgroundToolbarDisplay: Dispatch<SetStateAction<boolean>>;

    /** The reference to the background toolbar */
    backgroundToolbarRef: RefObject<HTMLDivElement | null>;

    /** The reference to the background options button */
    backgroundOptionsButtonRef: RefObject<HTMLButtonElement | null>;

    /** The reference to the note editor and placeholder container */
    noteEditorAndPlaceholderRef: RefObject<HTMLDivElement | null>;

    /** The reference to the note editor and title input div container */
    noteEditorAndTitleInputRef: RefObject<HTMLDivElement | null>;

    /** The array of selected images */
    selectedImages: File[];
    
    /** The setter method for updating the contents of the selected images array */
    setSelectedImages: Dispatch<SetStateAction<File[]>>;

    /** The reference to the dropdown menu */
    dropdownMenuRef: RefObject<HTMLDivElement | null>; 
    
    /** The reference to the more button */
    moreButtonRef: RefObject<HTMLButtonElement | null>;
}

export default NoteEditorActionToolbarProps;