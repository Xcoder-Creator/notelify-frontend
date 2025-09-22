/**
 * Interface for each menu list item in the menu list array
 */
interface MenuListProps {
    /** The unique identifier for each list item */
    option: number;

    /** The title of each list item */
    title: string;
}

/** 
 * An array of available list items for the dropdown menu
 */
const menuList: MenuListProps[] = [
    {
        option: 1,
        title: 'Add label',
    },
    {
        option: 2,
        title: 'Add drawing'
    },
    {
        option: 3,
        title: 'Show checkboxes'
    },
    {
        option: 4,
        title: 'Version history'
    }
]

export default menuList;