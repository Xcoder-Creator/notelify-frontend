"use client";

import dropdown_menu_styles from './DropdownMenu.module.css';
import { useEffect } from 'react';
import NotesDropdownMenuProps from '@/types/notes/notes-dropdown-menu.types';
import positionDropdownMenu from '@/lib/positionDropdownMenu';

/** Dropdown menu for the notes grid */
export default function DropdownMenu({ dropdownMenuRef, moreButtonRef, menuOptions }: NotesDropdownMenuProps) {
    useEffect(() => {
        // Run on mount
        positionDropdownMenu(dropdownMenuRef, moreButtonRef);

        window.addEventListener('resize', () => positionDropdownMenu(dropdownMenuRef, moreButtonRef));
        window.addEventListener('scroll', () => positionDropdownMenu(dropdownMenuRef, moreButtonRef));

        return () => {
            window.removeEventListener('resize', () => positionDropdownMenu(dropdownMenuRef, moreButtonRef));
            window.removeEventListener('scroll', () => positionDropdownMenu(dropdownMenuRef, moreButtonRef));
        };
    }, [moreButtonRef, dropdownMenuRef]);

    return (
        <div ref={dropdownMenuRef} className={dropdown_menu_styles.container}>
            {menuOptions.map((option, index) => (
                <div tabIndex={0} key={index} className={dropdown_menu_styles.link}>
                    {option.title}
                </div>
            ))}
        </div>
    );
}