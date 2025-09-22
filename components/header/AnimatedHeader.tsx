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
import AppTooltip from '../AppTooltip';
import { useMediaQuery } from 'react-responsive';
import { resetBackgroundOptionsToolbar, toggleBackgroundOptionsToolbarState, updateActiveBgTheme, updateActiveWallpaper } from '@/store/slices/note_editor/backgroundOptionsToolbarSlice';
import BackgroundOptionsToolbar from './BackgroundOptionsToolbar';
import toggleAnimatedHeaderActions from '@/lib/notes/toggleAnimatedHeaderActions';

/** The animated header */
export default function AnimatedHeader({ hideAnimatedHeader, animatingOut, scrollDirection }: AnimatedHeaderProps){
    const dispatch = useAppDispatch();
    const notesSelected = useAppSelector((state) => state.notes.notesSelected);
    const pinnedNotes = useAppSelector((state) => state.notes.pinnedNotes);
    const othersNotes = useAppSelector((state) => state.notes.othersNotes);
    const backgroundOptionsToolbar = useAppSelector((state) => state.backgroundOptionsToolbar.state); // The state of the background options toolbar
    const [recentNoOfNotesSelected, setRecentNoOfNotesSelected] = useState(0); // This state tracks the recent number of notes selected
    const [pinAndUnpinState, setpinAndUnpinState] = useState('pin');
    const backgroundOptionsToolbarRef = useRef<HTMLDivElement>(null);
    const backgroundOptionsButtonRef = useRef<HTMLButtonElement>(null);
    const breakPointForBottomSheet = useMediaQuery({ query: '(max-width: 490px)' });

    // This method closes the header
    const closeHeader = () => {
        hideAnimatedHeader();
        dispatch(clearSelectedNotes());
        dispatch(resetBackgroundOptionsToolbar());
    }

    useEffect(() => {
        // Handle clicks outside the background toolbar to close it
        // This will close the background toolbar when the user clicks outside of it
        const handleClickOutsideForBackgroundToolbar = (event: MouseEvent) => {
            const target = event.target as Node;

            // Don't close if the click is inside the toolbar OR the background options button
            if (
                backgroundOptionsToolbarRef.current?.contains(target) ||
                backgroundOptionsButtonRef.current?.contains(target)
            ) {
                return;
            }

            dispatch(toggleBackgroundOptionsToolbarState(false));
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
            let noteID = notesSelected[mostRecentSelectedNoteIndex].noteID; // Get the ID of the most recent selected note
            const extractedPinnedNoteData = pinnedNotes.find(note => note.noteID === noteID); // Extract the most recent selected  note data
            const extractedOthersNoteData = othersNotes.find(note => note.noteID === noteID); // Extract the most recent selected note data

            if (extractedPinnedNoteData){
                // Check if the extracted note data is available
                if (extractedPinnedNoteData){
                    dispatch(updateActiveBgTheme({ themeID: extractedPinnedNoteData.bgColor }));
                    dispatch(updateActiveWallpaper({ wallpaperID: extractedPinnedNoteData.wallpaper }));

                    if (extractedPinnedNoteData.pinned){
                        setpinAndUnpinState('unpin');
                    } else {
                        setpinAndUnpinState('pin');
                    }
                }
            }

            if (extractedOthersNoteData){
                // Check if the extracted note data is available
                if (extractedOthersNoteData){
                    dispatch(updateActiveBgTheme({ themeID: extractedOthersNoteData.bgColor }));
                    dispatch(updateActiveWallpaper({ wallpaperID: extractedOthersNoteData.wallpaper }));

                    if (extractedOthersNoteData.pinned){
                        setpinAndUnpinState('unpin');
                    } else {
                        setpinAndUnpinState('pin');
                    }
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
                        <button ref={backgroundOptionsButtonRef} onClick={() => toggleAnimatedHeaderActions(2, breakPointForBottomSheet)} className={[header_styles.header_action_button, header_styles.mlr_6].join(' ')}>
                            <PaletteSVG className={animated_header_styles.animated_header_icon} />
                        </button>
                    </AppTooltip>

                    {
                        backgroundOptionsToolbar && backgroundOptionsButtonRef.current && breakPointForBottomSheet === false ?
                            <BackgroundOptionsToolbar
                                backgroundOptionsToolbarRef={backgroundOptionsToolbarRef}
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