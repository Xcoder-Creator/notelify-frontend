import { RefObject } from "react";

/**
 * Interface for each menu option
 */
interface MenuOptionsProps {
    /** The ID of the menu option */
    id: number;

    /** The title of each menu option */
    title: string;
}

/**
 * Interface for the notes dropdown menu component
 */
interface NotesDropdownMenuProps {
    /** The reference to the dropdown menu */
    dropdownMenuRef: RefObject<HTMLDivElement | null>; 
        
    /** The reference to the more button */
    moreOptionsButtonRef: RefObject<HTMLButtonElement | null>;

    /** An array of options to display in the dropdown menu */
    menuOptions: Array<MenuOptionsProps>;
}

export default NotesDropdownMenuProps;