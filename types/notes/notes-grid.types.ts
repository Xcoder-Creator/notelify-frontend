import { RefObject } from "react";

/**
 * Interface for the notes grid component
 */
interface NotesGridProps {
    /** The reference to the dropdown menu */
    dropdownMenuRef: RefObject<HTMLDivElement | null>; 
    
    /** The reference to the more button */
    moreOptionsButtonRef: RefObject<HTMLButtonElement | null>;
}

export default NotesGridProps;