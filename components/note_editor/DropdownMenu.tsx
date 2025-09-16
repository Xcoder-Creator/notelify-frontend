"use client";

import { useAppSelector } from '@/store/hooks';
import dropdown_menu_styles from './DropdownMenu.module.css';
import NoteEditorDropdownMenuProps from '@/types/note-editor/dropdown-menu.types';
import { useEffect } from 'react';

/** This is the dropdown menu component for the note editor */
export default function DropdownMenu({ dropdownMenuRef, moreButtonRef }: NoteEditorDropdownMenuProps){
    const dropdownMenuOptions = useAppSelector((state) => state.dropdownMenu.menuList);

    useEffect(() => {
        /*
            This method gets the current position of the more button relative to the viewport
            and then applies that position to the dropdown menu in such a way that it remains at the bottom
            of the more button but flips above the button if there’s not enough space.
        */
        const positionDropdownMenu = () => {
            // Get the button and dropdown menu elements from refs
            const button = moreButtonRef.current;
            const dropdownMenu = dropdownMenuRef.current;

            // Exit if either the button or the dropdown menu is not mounted yet
            if (!button || !dropdownMenu) return;

            // Get the button's position relative to the viewport
            const buttonRect = button.getBoundingClientRect();

            // Get the height of the dropdown menu (needed to calculate if there's enough space below)
            const dropdownMenuHeight = dropdownMenu.offsetHeight;

            // Calculate how much space is available below the button
            const spaceBelow = window.innerHeight - buttonRect.bottom;

            // If there's not enough space below, flip the dropdown menu upward
            const shouldFlipUp = spaceBelow < dropdownMenuHeight + 10; // +10px for margin

            // Always use absolute positioning
            dropdownMenu.style.position = 'absolute';

            // Horizontally align the dropdown menu with the button (left edge)
            dropdownMenu.style.left = `${buttonRect.left + window.scrollX}px`;

            // If there isn't enough space below, place the dropdown menu above the button
            if (shouldFlipUp) {
                dropdownMenu.style.top = `${buttonRect.top + window.scrollY - dropdownMenuHeight}px`;
            } else { // Otherwise, place it just below the button
                dropdownMenu.style.top = `${buttonRect.bottom + window.scrollY}px`;
            }
        }

        positionDropdownMenu(); // Call the method to run initially

        // Recalculate dropdown position on scroll or resize
        window.addEventListener('resize', positionDropdownMenu);
        window.addEventListener('scroll', positionDropdownMenu);
        //-----------------------------------------------------------------------------------------

        return () => {
            // Clean up event listeners on unmount or ref change to prevent memory leaks
            window.removeEventListener('resize', positionDropdownMenu);
            window.removeEventListener('scroll', positionDropdownMenu);
            //---------------------------------------------------------------------------
        };
    }, [moreButtonRef]);

    return (
        <div ref={dropdownMenuRef} className={dropdown_menu_styles.container}>
            {
                dropdownMenuOptions.map((option, index) => (
                    <div tabIndex={0} key={index} className={dropdown_menu_styles.link}>{option.title}</div>
                ))
            }
        </div>    
    );
}