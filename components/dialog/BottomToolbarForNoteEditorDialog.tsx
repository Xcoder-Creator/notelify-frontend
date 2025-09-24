"use client";

import { useEffect, useRef } from 'react';
import toolbar_styles from './BottomToolbarForNoteEditorDialog.module.css';
import note_editor_styles from '../note_editor/NoteEditor.module.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AppTooltip from '../AppTooltip';
import header_styles from '../header/Header.module.css';
import PaletteSVG from '../svg-comp/Palette';
import VerticalDotsSVG from '../svg-comp/VerticalDots';
import backgroundThemes from '@/utils/note_editor/background_options_toolbar/backgroundThemes.util';
import wallpapers from '@/utils/note_editor/background_options_toolbar/wallpapers.util';
import BaselineSVG from '../svg-comp/Baseline';
import toggleFormattingOptionsToolbar from '@/lib/note_editor/toggleFormattingOptionsToolbar';
import { toggleBottomSheet } from '@/store/slices/bottomSheetSlice';

/**
 * This component is the bottom toolbar for the note editor dialog.
 */
export default function BottomToolbarForNoteEditorDialog() {
    const dispatch = useAppDispatch();
    const toolbarRef = useRef<HTMLDivElement>(null);
    const activeBgTheme = useAppSelector((state) => state.backgroundOptionsToolbar.activeBgTheme); // The active background theme
    const activeWallpaper = useAppSelector((state) => state.backgroundOptionsToolbar.activeWallpaper); // The active wallpaper
    const formattingOptionsButton = useAppSelector((state) => state.actionToolbar.formattingOptionsButton); // The state of the formatting options button
    const formatedTimestampForNote = useAppSelector((state) => state.notes.currentNoteTimestamp); // The formated timestamp of the current viewed note in the note editor dialog
    const themeState = useAppSelector((state) => state.theme.theme); // The theme of the app

    // Update the theme and wallpaper of the bottom toolbar
    useEffect(() => {
        if (toolbarRef.current){
            if (toolbarRef.current === null) return;
                toolbarRef.current.style.backgroundColor = activeBgTheme === 0 ? 'var(--background)' : themeState === "dark" ? `${backgroundThemes.find(theme => theme.id === activeBgTheme)?.theme}` : `${backgroundThemes.find(theme => theme.id === activeBgTheme)?.lightTheme}`;
                toolbarRef.current.style.backgroundImage = activeWallpaper === 0 ? 'none' : themeState === "dark" ? `url(${wallpapers.find(wallpaper => wallpaper.id === activeWallpaper)?.dark_url})` : `url(${wallpapers.find(wallpaper => wallpaper.id === activeWallpaper)?.light_url})`;
        }
    }, [activeBgTheme, activeWallpaper]);

    return (
        <div ref={toolbarRef} className={toolbar_styles.toolbar}>
            <div className={toolbar_styles.toolbar_left}>
                <AppTooltip title="Formatting options">
                    <button onClick={() => toggleFormattingOptionsToolbar()} className={[header_styles.menu_button, formattingOptionsButton === 'active' ? note_editor_styles.active : formattingOptionsButton === false ? note_editor_styles.disabled : ''].join(' ')}>
                        <BaselineSVG className={[header_styles.menu_icon, formattingOptionsButton === false ? header_styles.menu_icon_disabled : ''].join(' ')} />
                    </button>
                </AppTooltip>

                <AppTooltip title="Background options" >
                    <button onClick={() => dispatch(toggleBottomSheet(true))} className={header_styles.menu_button}>
                        <PaletteSVG className={header_styles.menu_icon} />
                    </button>
                </AppTooltip>
            </div>

            <p className={toolbar_styles.toolbar_center}>{formatedTimestampForNote}</p>

            <div className={toolbar_styles.toolbar_right}>
                <AppTooltip title="More" >
                    <button className={header_styles.header_action_button}>
                        <VerticalDotsSVG className={header_styles.menu_icon} />
                    </button>
                </AppTooltip>
            </div>
        </div>
    );
}