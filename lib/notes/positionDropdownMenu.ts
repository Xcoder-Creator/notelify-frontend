import { RefObject } from "react";

/**
 * This method positions the dropdown menu vertically and horizontally.
 * @param dropdownMenuRef - The reference to the dropdown menu.
 * @param moreOptionsButtonRef - The reference to the more button.
 * @return void
 */
const positionDropdownMenu = (
    dropdownMenuRef: RefObject<HTMLDivElement | null>,
    moreOptionsButtonRef: RefObject<HTMLButtonElement | null>
) => {
    const button = moreOptionsButtonRef.current;
    const dropdown = dropdownMenuRef.current;

    if (!button || !dropdown) return;

    const buttonRect = button.getBoundingClientRect();

    // Reset styles before measuring
    dropdown.style.position = 'fixed';
    dropdown.style.top = '0';
    dropdown.style.left = '0';
    dropdown.style.right = 'auto';

    const dropdownRect = dropdown.getBoundingClientRect();

    // -------- Vertical positioning --------
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
        dropdown.style.top = `${buttonRect.top - dropdownRect.height}px`;
    } else {
        dropdown.style.top = `${buttonRect.bottom}px`;
    }

    // -------- Horizontal positioning --------
    const spaceOnRight = window.innerWidth - buttonRect.left;
    
    if (spaceOnRight < dropdownRect.width) {
        // Not enough space on the right → align to the button's right edge
        dropdown.style.left = `${buttonRect.right - dropdownRect.width}px`;
    } else {
        // Default → align to button's left edge
        dropdown.style.left = `${buttonRect.left}px`;
    }
}

export default positionDropdownMenu;