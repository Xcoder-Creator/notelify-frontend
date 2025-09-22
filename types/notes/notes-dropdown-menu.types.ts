import { RefObject } from "react";

/**
 * Interface for the notes dropdown menu component
 */
interface NotesDropdownMenuProps {
    /** The reference to the dropdown menu */
    dropdownMenuRef: RefObject<HTMLDivElement | null>; 
        
    /** The reference to the more button */
    moreOptionsButtonRef: RefObject<HTMLButtonElement | null>;
}

export default NotesDropdownMenuProps;