"use client";

import dropdown_menu_styles from '../DropdownMenu.module.css';
import { useEffect } from 'react';
import NotesDropdownMenuProps from '@/types/notes/notes-dropdown-menu.types';
import positionDropdownMenu from '@/lib/notes/positionDropdownMenu';
import notesDropdownMenuOptions from '@/utils/notes/notesDropdownMenuOptions.util';

/** Dropdown menu for the note card component */
export default function DropdownMenu({ dropdownMenuRef, moreOptionsButtonRef }: NotesDropdownMenuProps) {
    useEffect(() => {
        // Run on mount
        positionDropdownMenu(dropdownMenuRef, moreOptionsButtonRef);

        window.addEventListener('resize', () => positionDropdownMenu(dropdownMenuRef, moreOptionsButtonRef));
        window.addEventListener('scroll', () => positionDropdownMenu(dropdownMenuRef, moreOptionsButtonRef));

        return () => {
            window.removeEventListener('resize', () => positionDropdownMenu(dropdownMenuRef, moreOptionsButtonRef));
            window.removeEventListener('scroll', () => positionDropdownMenu(dropdownMenuRef, moreOptionsButtonRef));
        };
    }, [moreOptionsButtonRef, dropdownMenuRef]);

    return (
        <div ref={dropdownMenuRef} className={dropdown_menu_styles.container}>
            {notesDropdownMenuOptions.map((option, index) => (
                <div tabIndex={0} key={index} className={dropdown_menu_styles.link}>
                    {option.title}
                </div>
            ))}
        </div>
    );
}