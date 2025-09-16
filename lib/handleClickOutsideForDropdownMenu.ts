import { Dispatch, RefObject, SetStateAction } from "react";

/**
 * Handle clicks outside the dropdown menu to close it.
 * This will close the dropdown menu when the user clicks outside of it
 * @param dispatch - The dispatch method for redux
 * @param dropdownMenuRef - The reference to the dropdown menu
 * @param moreButtonRef - The reference to the more button
 * @param setDropdownMenu - The setter method to update the state of the dropdown menu
 * @return void
 */
const handleClickOutsideForDropdownMenu = (
    event: MouseEvent,
    dropdownMenuRef: RefObject<HTMLDivElement | null>,
    moreButtonRef: RefObject<HTMLButtonElement | null>,
    setDropdownMenu: Dispatch<SetStateAction<boolean>>
) => {
    const target = event.target as Node;

    // Don't close if the click is inside the dropdown menu OR the more button
    if (
        dropdownMenuRef.current?.contains(target) ||
        moreButtonRef.current?.contains(target)
    ) {
        return;
    }

    setDropdownMenu(false);
}

export default handleClickOutsideForDropdownMenu;