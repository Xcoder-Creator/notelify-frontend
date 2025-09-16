"use client";

import { useEffect, useRef, useState } from 'react';
import header_styles from '../header/Header.module.css';
import BackArrowSVG from '../svg-comp/BackArrow';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateNoteEditorDialog } from '@/store/slices/notesSlice';
import AppTooltip from '../AppTooltip';
import UnpinnedSVG from '../svg-comp/Unpinned';
import PinnedSVG from '../svg-comp/Pinned';
import ArchiveSVG from '../svg-comp/Archive';
import UndoSVG from '../svg-comp/Undo';
import RedoSVG from '../svg-comp/Redo';
import wallpapers from '@/utils/background-toolbar/wallpapers.util';
import backgroundThemes from '@/utils/background-toolbar/backgroundThemes.util';
import NoteEditorDialogHeaderProps from '@/types/note-editor/note-editor-dialog-header.types';
import note_editor_styles from '../note_editor/NoteEditor.module.css';

/**
 * This component is the header for the note editor dialog.
 */
export default function NoteEditorDialogHeader({ editor, dialogComp, setDialogComp, undo, redo, setUndo, setRedo }: NoteEditorDialogHeaderProps) {
    const [scrollDirection, setScrollDirection] = useState<string | null>(null);
    const activeBgTheme = useAppSelector((state) => state.backgroundToolbarBottomSheet.activeBgTheme); // The active background theme
    const activeWallpaper = useAppSelector((state) => state.backgroundToolbarBottomSheet.activeWallpaper); // The active wallpaper
    const themeState = useAppSelector((state) => state.theme.theme);
    const lastScrollY = useRef(0);
    const [pinAndUnpinState, setpinAndUnpinState] = useState('pin');
    const headerRef = useRef<HTMLElement | null>(null);
    const dispatch = useAppDispatch();

    // Update the theme and wallpaper of the dialog header
    useEffect(() => {
        if (headerRef.current){
            if (headerRef.current === null) return;
            headerRef.current.style.backgroundColor = activeBgTheme === 0 ? 'var(--background)' : themeState === "dark" ? `${backgroundThemes.find(theme => theme.id === activeBgTheme)?.theme}` : `${backgroundThemes.find(theme => theme.id === activeBgTheme)?.lightTheme}`;
            headerRef.current.style.backgroundImage = activeWallpaper === 0 ? 'none' : themeState === "dark" ? `url(${wallpapers.find(wallpaper => wallpaper.id === activeWallpaper)?.dark_url})` : `url(${wallpapers.find(wallpaper => wallpaper.id === activeWallpaper)?.light_url})`;
        }
    }, [activeBgTheme, activeWallpaper]);

    // Close the dialog
    const closeDialog = () => {
        if (dialogComp === null || !setDialogComp) return;
        setDialogComp(false);
        setTimeout(() => {
            dispatch(updateNoteEditorDialog({ value: false }));
        }, 300);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY === 0) {
                setScrollDirection('top');
            } else if (currentScrollY > lastScrollY.current) {
                setScrollDirection('down');
            }

            lastScrollY.current = currentScrollY;
        };

        handleScroll(); // Initial check to set the scroll direction

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    /**
     * Toggle the undo and redo actions.
     * @param action - The action to perform (1 for undo, 2 for redo)
     */
    const toggleUndoAndRedoActions = (action: number) => {
        if (action === 1){ // For undo action
            if (undo){
                editor?.chain().focus().undo().run();
            }
        } else if (action === 2){ // For redo action
            if (redo){
                editor?.chain().focus().redo().run();
            }
        }
    }

    return (
        <header ref={headerRef} style={{ zIndex: '888' }} className={[header_styles.page_header, header_styles.page_header_scrolled_down].join(' ')}>
            <AppTooltip title="Back">
                <button onClick={closeDialog} className={header_styles.menu_button}>
                    <BackArrowSVG className={header_styles.menu_icon} />
                </button>
            </AppTooltip>

            <div className={header_styles.page_header_right}>
                <div className={header_styles.header_actions}>
                    <AppTooltip title="Undo" >
                        <button onClick={() => toggleUndoAndRedoActions(1)} className={[header_styles.header_action_button, undo === false ? note_editor_styles.disabled : ''].join(' ')}>
                            <UndoSVG className={[header_styles.menu_icon, undo === false ? note_editor_styles.editor_action_icon_disabled : ''].join(' ')} />
                        </button>
                    </AppTooltip>

                    <AppTooltip title="Redo" >
                        <button onClick={() => toggleUndoAndRedoActions(2)} className={[header_styles.header_action_button, header_styles.mlr_6, redo === false ? note_editor_styles.disabled : ''].join(' ')}>
                            <RedoSVG className={[header_styles.menu_icon, redo === false ? note_editor_styles.editor_action_icon_disabled : ''].join(' ')} />
                        </button>
                    </AppTooltip>

                    {
                        pinAndUnpinState === 'pin' ?
                            <AppTooltip title="Pin" >
                                <button className={header_styles.header_action_button}>
                                    <UnpinnedSVG className={header_styles.menu_icon} />
                                </button>
                            </AppTooltip>
                        :   pinAndUnpinState === 'unpin' ?
                                <AppTooltip title="Unpin" >
                                    <button className={header_styles.header_action_button}>
                                        <PinnedSVG className={header_styles.menu_icon} />
                                    </button>
                                </AppTooltip>
                        :   null
                    }

                    <AppTooltip title="Archive" >
                        <button className={[header_styles.header_action_button, header_styles.mlr_6].join(' ')}>
                            <ArchiveSVG className={header_styles.menu_icon} />
                        </button>
                    </AppTooltip>
                </div>
            </div>
        </header>
    );
}