"use client";

import CheckSVG from '../svg-comp/Check';
import note_styles from './NotesLayout.module.css';
import VerticalDotsSVG from '../svg-comp/VerticalDots';
import NotesCardProps from '@/types/notes/notes-card.types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import UnpinnedSVG from '../svg-comp/Unpinned';
import PinnedSVG from '../svg-comp/Pinned';
import AppTooltip from '../AppTooltip';
import wallpapers from '@/utils/note_editor/background_options_toolbar/wallpapers.util';
import backgroundThemes from '@/utils/note_editor/background_options_toolbar/backgroundThemes.util';
import DropdownMenu from './DropdownMenu';
import handleClickOutsideForDropdownMenu from '@/lib/notes/handleClickOutsideForDropdownMenu';
import selectNoteCard from '@/lib/notes/selectNoteCard';

/** This is the card component for each note in the notes masonry layout */
export default function NoteCard({ note, index }: NotesCardProps){
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const moreOptionsButtonRef = useRef<HTMLButtonElement>(null);
    const [noteSelected, setNoteSelected] = useState(false);
    const currentDeselectedNoteID = useAppSelector((state) => state.notes.currentDeselectedNoteID);
    const selectedNotes = useAppSelector((state) => state.notes.notesSelected);
    const theme = useAppSelector((state) => state.theme.theme); // The app theme

    const cardStyle = useMemo(() => {
        if (note.wallpaper !== 0) {
            return {
                backgroundImage: `url(${
                    theme === "dark"
                    ? wallpapers[note.wallpaper - 1].background_dark_url
                    : wallpapers[note.wallpaper - 1].background_light_url
                })`
            };
        }

        if (note.bgColor !== 0) {
            const bgTheme = backgroundThemes[note.bgColor - 1];
            return {
                backgroundColor: theme === "dark" ? bgTheme.theme : bgTheme.lightTheme
            };
        }

        return {};
    }, [theme, note]);

    // This prevents the note from loosing focus after it has been selected
    useEffect(() => {
        if (selectedNotes.find(n => n.noteID === note.noteID)){
            setNoteSelected(true);
        }
    }, [noteSelected]);

    // This removes focus from the note once it has been deselected
    useEffect(() => {
        if (currentDeselectedNoteID === note.noteID){
            setNoteSelected(false);
        }
    }, [currentDeselectedNoteID]);

    // This removes focus from the note if there are no selected notes at all in the redux state
    useEffect(() => {
        if (selectedNotes.length === 0){
            setNoteSelected(false);
        }
    }, [selectedNotes]);

    useEffect(() => {
        // Close the dropdown menu if the user clicks outside of it
        const handleClick = (e: MouseEvent) => {
            handleClickOutsideForDropdownMenu(e, dropdownMenuRef, moreOptionsButtonRef, setDropdownMenu);
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <div 
            style={cardStyle} 
            className={[note_styles.note_card, noteSelected ? note_styles.note_selected : null].join(' ')}
        >
            <div 
                className={note_styles.note_card_top}
            >
                <div className={note_styles.note_card_top_title_div}>
                    <p className={note_styles.note_title}>{note.title}</p>
                </div>

                {
                    note.content ? (
                        <div className={note_styles.note_card_content} dangerouslySetInnerHTML={{ __html: note.content }} />
                    ) : <div className={note_styles.note_card_content} dangerouslySetInnerHTML={{ __html: '<p></p>' }} />
                }
            </div>
            
            <AppTooltip title={noteSelected ? "Deselect note" : "Select note"} >
                <div onClick={() => selectNoteCard(note, noteSelected, setNoteSelected)} className={[note_styles.check_icon_div, noteSelected ? note_styles.check_icon_div_active : ''].join(' ')}>
                    <CheckSVG className={note_styles.check_icon} />
                </div>
            </AppTooltip>
            
            {
                noteSelected ?
                    <AppTooltip title={note.pinned ? "Unpin note" : "Pin note"} >
                        <button className={[note_styles.pinned_and_unpinned_button, note_styles.pinned_and_unpinned_button_active].join(' ')}>
                            {
                                note.pinned ?
                                    <PinnedSVG className={note_styles.pinned_and_unpinned_icon} />
                                :   <UnpinnedSVG className={note_styles.pinned_and_unpinned_icon} />   
                            }
                        </button>
                    </AppTooltip>
                :   <AppTooltip title="More" >
                        <button onClick={() => setDropdownMenu(dropdownMenu ? false : true)} ref={moreOptionsButtonRef} className={note_styles.more_button}>
                            <VerticalDotsSVG className={note_styles.vertical_dots_icon} />
                        </button>
                    </AppTooltip>
            }

            {
                dropdownMenu ?
                    <DropdownMenu
                        dropdownMenuRef={dropdownMenuRef}
                        moreOptionsButtonRef={moreOptionsButtonRef}
                    />
                :   null
            }
        </div>
    );
}