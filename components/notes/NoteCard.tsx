"use client";

import CheckSVG from '../svg-comp/Check';
import note_styles from './Notes.module.css';
import VerticalDotsSVG from '../svg-comp/VerticalDots';
import DropdownMenu from './DropdownMenu';
import NotesCardProps from '@/types/notes/notes-card.types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import selectNoteCard from '@/lib/notes/selectNoteCard';
import handleClickOutsideForDropdownMenu from '@/lib/handleClickOutsideForDropdownMenu';
import notesDropdownMenuOptions from '@/utils/dropdown-menu-options/notesDropdownMenuOptions.util';
import UnpinnedSVG from '../svg-comp/Unpinned';
import PinnedSVG from '../svg-comp/Pinned';
import backgroundThemes from '@/utils/background-toolbar/backgroundThemes.util';
import wallpapers from '@/utils/background-toolbar/wallpapers.util';
import { updateNoteEditorDialog } from '@/store/slices/notesSlice';
import AppTooltip from '../AppTooltip';
import { updateActiveBgTheme, updateActiveWallpaper } from '@/store/slices/backgroundToolbarBottomSheetSlice';
import { updateFormattingOptionsBlockTheme } from '@/store/slices/note-editor/formattingOptionsBlockSlice';
import { updateEditorContent, updateEditorTitle, updateNoteEditedTimestamp } from '@/store/slices/note-editor/editorSlice';

/** This is the card component for each note in the notes masonry grid */
export default function NoteCard({ note, index, theme }: NotesCardProps){
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const moreButtonRef = useRef<HTMLButtonElement>(null);
    const [noteSelected, setNoteSelected] = useState(false);
    const currentDeselectedNoteID = useAppSelector((state) => state.notes.currentDeselectedNoteID);
    const selectedNotes = useAppSelector((state) => state.notes.notesSelected);
    const isAnimatedHeaderVisible = useAppSelector((state) => state.header.isAnimatedHeaderVisible); // Visibility of the animated header
    const dispatch = useAppDispatch();

    const cardStyle = useMemo(() => {
        if (note.wallpaperID !== 0) {
            return {
                backgroundImage: `url(${
                    theme === "dark"
                    ? wallpapers[note.wallpaperID - 1].background_dark_url
                    : wallpapers[note.wallpaperID - 1].background_light_url
                })`
            };
        }

        if (note.bgThemeID !== 0) {
            const bgTheme = backgroundThemes[note.bgThemeID - 1];
            return {
                backgroundColor: theme === "dark" ? bgTheme.theme : bgTheme.lightTheme
            };
        }

        return {};
    }, [theme, note]);

    // This prevents the note from loosing focus after it has been selected
    useEffect(() => {
        if (selectedNotes.find(n => n.id === note.id)){
            setNoteSelected(true);
        }
    }, [noteSelected]);

    // This removes focus from the note once it has been deselected
    useEffect(() => {
        if (currentDeselectedNoteID === note.id){
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
            handleClickOutsideForDropdownMenu(e, dropdownMenuRef, moreButtonRef, setDropdownMenu);
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    /**
     * This method opens the note editor dialog.
     * @returns void
     */
    const openNoteEditorDialog = () => {
        if (selectedNotes.length === 0){ // If there are no selected notes, open the note editor dialog
            dispatch(updateEditorTitle(note.title));
            dispatch(updateEditorContent(note.notecontent));
            dispatch(updateActiveBgTheme(note.bgThemeID));
            dispatch(updateActiveWallpaper(note.wallpaperID));
            dispatch(updateNoteEditedTimestamp(note.editedTimestamp));
            dispatch(updateNoteEditorDialog({ value: true }));
            let activeBgTheme = backgroundThemes.find(theme => theme.id === note.bgThemeID);
            if (!activeBgTheme) return;
            dispatch(updateFormattingOptionsBlockTheme(activeBgTheme.id));
        } else { // If there are any selected notes, set the focus on the exact note card
            selectNoteCard(dispatch, note, noteSelected, setNoteSelected, index)
        }
    }

    return (
        <div 
            style={cardStyle} 
            className={[note_styles.note_card, noteSelected ? note_styles.note_selected : null].join(' ')}
        >
            <div 
                className={note_styles.note_card_top}
                onClick={() => openNoteEditorDialog()}
            >
                <div className={note_styles.note_card_top_title_div}>
                    <p className={note_styles.note_title}>{note.title}</p>
                </div>

                {
                    note.notecontent ? (
                        <div className={note_styles.note_card_content} dangerouslySetInnerHTML={{ __html: note.notecontent }} />
                    ) : <div className={note_styles.note_card_content} dangerouslySetInnerHTML={{ __html: '<p></p>' }} />
                }
            </div>
            
            <AppTooltip title={noteSelected ? "Deselect note" : "Select note"} >
                <div onClick={() => selectNoteCard(dispatch, note, noteSelected, setNoteSelected, index)} className={[note_styles.check_icon_div, noteSelected ? note_styles.check_icon_div_active : ''].join(' ')}>
                    <CheckSVG className={note_styles.check_icon} />
                </div>
            </AppTooltip>
            
            {
                noteSelected ?
                    <AppTooltip title={note.isPinned ? "Unpin note" : "Pin note"} >
                        <button className={[note_styles.pinned_and_unpinned_button, note_styles.pinned_and_unpinned_button_active].join(' ')}>
                            {
                                note.isPinned ?
                                    <PinnedSVG className={note_styles.pinned_and_unpinned_icon} />
                                :   <UnpinnedSVG className={note_styles.pinned_and_unpinned_icon} />   
                            }
                        </button>
                    </AppTooltip>
                :   <>
                        {
                            isAnimatedHeaderVisible ?
                                <AppTooltip title={note.isPinned ? "Unpin note" : "Pin note"} >
                                    <button className={note_styles.pinned_and_unpinned_button}>
                                        {
                                            note.isPinned ?
                                                <PinnedSVG className={note_styles.pinned_and_unpinned_icon} />
                                            :   <UnpinnedSVG className={note_styles.pinned_and_unpinned_icon} />   
                                        }
                                    </button>
                                </AppTooltip>
                            :   <AppTooltip title="More" >
                                    <button onClick={() => setDropdownMenu(dropdownMenu ? false : true)} ref={moreButtonRef} className={note_styles.more_button}>
                                        <VerticalDotsSVG className={note_styles.vertical_dots_icon} />
                                    </button>
                                </AppTooltip>
                        }
                    </>
            }

            {
                dropdownMenu ?
                    <DropdownMenu
                        dropdownMenuRef={dropdownMenuRef}
                        moreButtonRef={moreButtonRef} 
                        menuOptions={notesDropdownMenuOptions}
                    />
                :   null
            }
        </div>
    );
}