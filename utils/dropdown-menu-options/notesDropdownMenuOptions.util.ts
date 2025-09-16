/**
 * Interface for each menu option
 */
interface MenuOptions {
    /** The ID of the menu option */
    id: number;

    /** The title of the menu option */
    title: string;
}

/** 
 * An array of menu options for the dropdown menu
 */
const notesDropdownMenuOptions: Array<MenuOptions> = [
    {
        id: 1,
        title: 'Delete note'
    },

    {
        id: 2,
        title: 'Edit note'
    },

    {
        id: 3,
        title: 'Make a copy'
    }
]

export default notesDropdownMenuOptions;