"use client";

import animated_header_styles from './AnimatedHeader.module.css';
import AnimatedHeaderProps from '@/types/header/animated-header.types';
import header_styles from './Header.module.css';
import CloseSVG from '../svg-comp/Close';
import VerticalDotsSVG from '../svg-comp/VerticalDots';
import UnpinnedSVG from '../svg-comp/Unpinned';
import PaletteSVG from '../svg-comp/Palette';
import ArchiveSVG from '../svg-comp/Archive';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearSelectedNotes } from '@/store/slices/notesSlice';
import { useEffect, useRef, useState } from 'react';
import PinnedSVG from '../svg-comp/Pinned';
import BackgroundToolbar from './BackgroundToolbar';
import toggleAnimatedHeaderActions from '@/lib/notes/toggleAnimatedHeaderActions';
import { updateActiveBgTheme, updateActiveWallpaper } from '@/store/slices/header/animatedHeaderBackgroundToolbarSlice';
import { resetToolbar } from '@/store/slices/note-editor/backgroundToolbarSlice';
import AppTooltip from '../AppTooltip';
import { useMediaQuery } from 'react-responsive';

/** The animated header */
export default function AnimatedHeader({ hideAnimatedHeader, animatingOut, scrollDirection }: AnimatedHeaderProps){
    const dispatch = useAppDispatch();
    const notesSelected = useAppSelector((state) => state.notes.notesSelected);
    const notes = useAppSelector((state) => state.notes.notes);
    const dialogBottomsheet = useAppSelector((state) => state.notes.dialogBottomSheet);
    const [recentNoOfNotesSelected, setRecentNoOfNotesSelected] = useState(0); // This state tracks the recent number of notes selected
    const [pinAndUnpinState, setpinAndUnpinState] = useState('pin');
    const [backgroundToolbarDisplay, setBackgroundToolbarDisplay] = useState(false);
    const backgroundToolbarRef = useRef<HTMLDivElement>(null);
    const backgroundOptionsButtonRef = useRef<HTMLButtonElement>(null);
    const breakPointForBottomSheet = useMediaQuery({ query: '(max-width: 490px)' });
    backgroundToolbarRef.current

    // This method closes the header
    const closeHeader = () => {
        hideAnimatedHeader();
        dispatch(clearSelectedNotes());
        dispatch(resetToolbar());
    }

    useEffect(() => {
        // Handle clicks outside the background toolbar to close it
        // This will close the background toolbar when the user clicks outside of it
        const handleClickOutsideForBackgroundToolbar = (event: MouseEvent) => {
            const target = event.target as Node;

            // Don't close if the click is inside the toolbar OR the background options button
            if (
                backgroundToolbarRef.current?.contains(target) ||
                backgroundOptionsButtonRef.current?.contains(target)
            ) {
                return;
            }

            setBackgroundToolbarDisplay(false);
        }

        document.addEventListener('mousedown', handleClickOutsideForBackgroundToolbar); // Listen for mouse clicks outside the background toolbar

        return () => {
            // Cleanup event listener when the component unmounts
            // This prevents memory leaks and ensures the listener is removed when no longer needed
            document.removeEventListener('mousedown', handleClickOutsideForBackgroundToolbar);
        }
    }, []);

    useEffect(() => {
        if (notesSelected.length !== 0){
            setRecentNoOfNotesSelected(notesSelected.length);

            let mostRecentSelectedNoteIndex = notesSelected.length - 1; // Get the most recent selected note index
            let noteID = notesSelected[mostRecentSelectedNoteIndex].id; // Get the ID of the most recent selected note
            const extractedNoteData = notes.find(note => note.id === noteID); // Extract the most recent selected note data
            
            // Check if the extracted note data is available
            if (extractedNoteData){
                dispatch(updateActiveBgTheme(extractedNoteData.bgThemeID));
                dispatch(updateActiveWallpaper(extractedNoteData.wallpaperID));

                if (extractedNoteData.isPinned){
                    setpinAndUnpinState('unpin');
                } else {
                    setpinAndUnpinState('pin');
                }
            }
        }
    }, [notesSelected]);

    return (
        <header
            className={[animated_header_styles.page_header, animatingOut ? animated_header_styles.fadeOut : animated_header_styles.fadeIn, scrollDirection === 'down' ? header_styles.page_header_scrolled_down : ''].join(' ')}
        >
            <div className={header_styles.page_header_left}>
                <AppTooltip title="Clear selection" >
                    <button onClick={() => closeHeader()} className={header_styles.menu_button}>
                        <CloseSVG className={header_styles.menu_icon} />
                    </button>
                </AppTooltip>

                <div className={header_styles.selected_text}>
                    <h1 className={header_styles.title2}>{recentNoOfNotesSelected} selected</h1>
                </div>
            </div>

            <div className={header_styles.page_header_right}>
                <div className={header_styles.header_actions}>
                    {
                        pinAndUnpinState === 'pin' ?
                            <AppTooltip title="Pin" >
                                <button className={header_styles.header_action_button}>
                                    <UnpinnedSVG className={animated_header_styles.animated_header_icon} />
                                </button>
                            </AppTooltip>
                        :   pinAndUnpinState === 'unpin' ?
                                <AppTooltip title="Unpin" >
                                    <button className={header_styles.header_action_button}>
                                        <PinnedSVG className={animated_header_styles.animated_header_icon} />
                                    </button>
                                </AppTooltip>
                        :   null
                    }

                    <AppTooltip title="Background options" >
                        <button ref={backgroundOptionsButtonRef} onClick={() => toggleAnimatedHeaderActions(2, backgroundToolbarDisplay, setBackgroundToolbarDisplay, breakPointForBottomSheet, dispatch, dialogBottomsheet)} className={[header_styles.header_action_button, header_styles.mlr_6].join(' ')}>
                            <PaletteSVG className={animated_header_styles.animated_header_icon} />
                        </button>
                    </AppTooltip>

                    {
                        backgroundToolbarDisplay && backgroundOptionsButtonRef.current && breakPointForBottomSheet === false ?
                            <BackgroundToolbar 
                                backgroundToolbarDisplay={backgroundToolbarDisplay}
                                setBackgroundToolbarDisplay={setBackgroundToolbarDisplay}
                                backgroundToolbarRef={backgroundToolbarRef}
                                backgroundOptionsButtonRef={backgroundOptionsButtonRef}
                            />
                        :   null
                    }

                    <AppTooltip title="Archive" >
                        <button className={header_styles.header_action_button}>
                            <ArchiveSVG className={animated_header_styles.animated_header_icon} />
                        </button>
                    </AppTooltip>

                    <AppTooltip title="More" >
                        <button className={[header_styles.header_action_button, header_styles.ml_6].join(' ')}>
                            <VerticalDotsSVG className={animated_header_styles.animated_header_icon} />
                        </button>
                    </AppTooltip>
                </div>
            </div>
        </header>
    );
}