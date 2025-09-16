import { RefObject } from "react";

/**
 * Interface for the dropdown menu in the note editor
 */
interface NoteEditorDropdownMenuProps {
    /** The reference to the dropdown menu */
    dropdownMenuRef: RefObject<HTMLDivElement | null>; 
    
    /** The reference to the more button */
    moreButtonRef: RefObject<HTMLButtonElement | null>;
}

export default NoteEditorDropdownMenuProps;