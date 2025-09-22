import { RefObject } from "react";

/**
 * Interface for the dropdown menu
 */
interface DropdownMenuProps {
    /** The reference to the dropdown menu */
    dropdownMenuRef: RefObject<HTMLDivElement | null>; 
    
    /** The reference to the more button */
    moreOptionsButtonRef: RefObject<HTMLButtonElement | null>;
}

export default DropdownMenuProps;