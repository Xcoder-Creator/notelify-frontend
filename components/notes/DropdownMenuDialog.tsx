"use client";

import { useAppSelector } from '@/store/hooks';
import dropdown_menu_styles from './DropdownMenu.module.css';
import NoteEditorDropdownMenuProps from '@/types/note-editor/dropdown-menu.types';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/** The dropdown menu for the note editor dialog */
export default function DropdownMenuDialog({ dropdownMenuRef, moreButtonRef }: NoteEditorDropdownMenuProps) {
    const dropdownMenuOptions = useAppSelector((state) => state.dropdownMenu.menuList);
    const [isPositioned, setIsPositioned] = useState(false);

    const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    useEffect(() => {
        // This method is used to position the dropdown menu in relations to the more button
        const positionDropdownMenu = () => {
            const button = moreButtonRef.current;
            const dropdownMenu = dropdownMenuRef.current;
            if (!button || !dropdownMenu) return;

            const buttonRect = button.getBoundingClientRect();
            const dropdownMenuHeight = dropdownMenu.offsetHeight;
            const spaceBelow = window.innerHeight - buttonRect.bottom;
            const shouldFlipUp = spaceBelow < dropdownMenuHeight + 10;

            setCoords({
                left: buttonRect.left + window.scrollX,
                top: shouldFlipUp
                    ? buttonRect.top + window.scrollY - dropdownMenuHeight
                    : buttonRect.bottom + window.scrollY,
            });

            setIsPositioned(true);
        };

        positionDropdownMenu();

        window.addEventListener('resize', positionDropdownMenu);
        window.addEventListener('scroll', positionDropdownMenu);

        return () => {
            window.removeEventListener('resize', positionDropdownMenu);
            window.removeEventListener('scroll', positionDropdownMenu);
        };
    }, [moreButtonRef]);

    // Render dropdown menu in a portal so it's always on top
    return createPortal(
        <div
            ref={dropdownMenuRef}
            className={dropdown_menu_styles.container}
            style={{
                position: 'absolute',
                top: coords.top,
                left: coords.left,
                visibility: isPositioned ? 'visible' : 'hidden',
                zIndex: 1300, // High enough to be above tooltips or other overlays
            }}
        >
            {dropdownMenuOptions.map((option, index) => (
                <div tabIndex={0} key={index} className={dropdown_menu_styles.link}>
                    {option.title}
                </div>
            ))}
        </div>,
        document.body
    );
}