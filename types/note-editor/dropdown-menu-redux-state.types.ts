/**
 * Interface for the menu list
 */
interface MenuListProps {
    /** The ID of the dropdown menu option that the user selected/clicked on */ 
    option: number;

    /** The title of the dropdown menu option */
    title: string;
    
    /** The locked state of the dropdown menu option */
    locked: boolean;
}

/**
 * Interface for the dropdown menu redux state
 */
interface DropdownMenuReduxStateProps {
    /** The state of the menu dropdown wether its opened or closed */ 
    menuState: boolean;

    /** The list of menu options */
    menuList: Array<MenuListProps>;
}

export default DropdownMenuReduxStateProps;