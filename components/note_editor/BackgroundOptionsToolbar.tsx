"use client";

import { useEffect, useRef, useState } from 'react';
import CheckSVG from '../svg-comp/Check';
import DropletOffSVG from '../svg-comp/DropletOff';
import background_options_toolbar_styles from './BackgroundOptionsToolbar.module.css';
import { useAppSelector } from '@/store/hooks';
import PhotoOffSVG from '../svg-comp/PhotoOff';
import AppTooltip from '../AppTooltip';
import backgroundThemes from '@/utils/note_editor/background_options_toolbar/backgroundThemes.util';
import wallpapers from '@/utils/note_editor/background_options_toolbar/wallpapers.util';
import NoteEditorBackgroundOptionsToolbarProps from '@/types/note_editor/background-options-toolbar.types';
import handleBgThemeAndWallpaperSelect from '@/lib/note_editor/handleBgThemeAndWallpaperSelect';

/**
 * This is the background options toolbar that contains background colors/themes and wallpapers
 */
export default function BackgroundOptionsToolbar({ backgroundOptionsButtonRef, backgroundOptionsToolbarRef, noteEditorPlaceholderRef, noteEditorAndTitleInputRef }: NoteEditorBackgroundOptionsToolbarProps){
    const activeBgTheme = useAppSelector((state) => state.backgroundOptionsToolbar.activeBgTheme); // The active background theme
    const activeWallpaper = useAppSelector((state) => state.backgroundOptionsToolbar.activeWallpaper); // The active wallpaper
    const themeState = useAppSelector((state) => state.theme.theme);
    const [isPositioned, setIsPositioned] = useState(false);
   
    useEffect(() => {
        /*
            This method gets the current position of the background options button relative to the viewport
            and then applies that position to the background toolbar in such a way that it remains at the bottom
            of the background options button always
        */
        const positionBackgroundToolbar = () => {
            // Get the button and toolbar elements from refs
            const button = backgroundOptionsButtonRef.current;
            const toolbar = backgroundOptionsToolbarRef.current;

            // Exit if either the button or the toolbar is not mounted yet
            if (!button || !toolbar) return;

            // Get the button's position relative to the viewport
            const buttonRect = button.getBoundingClientRect();

            // Get the height of the toolbar (needed to calculate if there's enough space below)
            const toolbarHeight = toolbar.offsetHeight;

            // Calculate how much space is available below the button
            const spaceBelow = window.innerHeight - buttonRect.bottom;

            // If there's not enough space below, flip the toolbar upward
            const shouldFlipUp = spaceBelow < toolbarHeight + 10; // +10px for margin

            // Always use absolute positioning
            toolbar.style.position = 'absolute';

            // Horizontally align the toolbar with the button (left edge)
            toolbar.style.left = `${buttonRect.left + window.scrollX}px`;

            // If there isn't enough space below, place the toolbar above the button
            if (shouldFlipUp) {
                toolbar.style.top = `${buttonRect.top + window.scrollY - toolbarHeight}px`;
            } else { // Otherwise, place it just below the button
                toolbar.style.top = `${buttonRect.bottom + window.scrollY}px`;
            }

            setIsPositioned(true);
        }

        positionBackgroundToolbar(); // Call the method to run initially

        // Call the position toolbar method to recalculate the positioning of the toolbar each time the page scrolls or resizes
        window.addEventListener('resize', positionBackgroundToolbar);
        window.addEventListener('scroll', positionBackgroundToolbar);
        //-----------------------------------------------------------------------------------------

        return () => {
            // Clear the event listeners each time the background options button ref changes to prevent memory leak
            window.removeEventListener('resize', positionBackgroundToolbar);
            window.removeEventListener('scroll', positionBackgroundToolbar);
            //---------------------------------------------------------------------------
        };
    }, [backgroundOptionsButtonRef]);

    return (
        <div ref={backgroundOptionsToolbarRef} style={{ zIndex: 1, visibility: isPositioned ? 'visible' : 'hidden' }} className={background_options_toolbar_styles.toolbar}>
            <div className={background_options_toolbar_styles.theme_section}>
                <AppTooltip 
                    title="Default"
                >
                    <button onClick={() => handleBgThemeAndWallpaperSelect('theme', 0, backgroundThemes[0].theme, noteEditorPlaceholderRef, noteEditorAndTitleInputRef)} className={[background_options_toolbar_styles.background_selector_small, background_options_toolbar_styles.default_border, activeBgTheme === 0 ? background_options_toolbar_styles.active : ''].join(' ')}>
                        <DropletOffSVG className={background_options_toolbar_styles.small_icon} />
                        {
                            activeBgTheme === 0 ?
                                <div className={background_options_toolbar_styles.check_icon_div}>
                                    <CheckSVG className={background_options_toolbar_styles.check_icon} />
                                </div>
                            :   null
                        }
                    </button>
                </AppTooltip>

                {
                    backgroundThemes.map((theme, index) => (
                        <AppTooltip key={index} title={theme.name}>
                            <button onClick={() => handleBgThemeAndWallpaperSelect('theme', theme.id, theme.theme, noteEditorPlaceholderRef, noteEditorAndTitleInputRef)} className={[background_options_toolbar_styles.background_selector_small, activeBgTheme === theme.id ? background_options_toolbar_styles.active : ''].join(' ')} style={{
                                backgroundColor: themeState === "dark" ? backgroundThemes.find(ftheme => ftheme.id === theme.id)?.theme : backgroundThemes.find(ftheme => ftheme.id === theme.id)?.lightTheme 
                            }}>
                                {
                                    activeBgTheme === theme.id ?
                                        <div className={background_options_toolbar_styles.check_icon_div}>
                                            <CheckSVG className={background_options_toolbar_styles.check_icon} />
                                        </div>
                                    :   null
                                }
                            </button>
                        </AppTooltip>
                    ))
                }
            </div>

            <div className={background_options_toolbar_styles.wallpaper_section}>
                <AppTooltip title="Default">
                    <button onClick={() => handleBgThemeAndWallpaperSelect('wallpaper', 0, themeState === "dark" ? wallpapers[0].background_dark_url : wallpapers[0].background_light_url, noteEditorPlaceholderRef, noteEditorAndTitleInputRef)} className={[background_options_toolbar_styles.background_selector_large, background_options_toolbar_styles.default_border, activeWallpaper === 0 ? background_options_toolbar_styles.active : ''].join(' ')}>
                        <PhotoOffSVG className={background_options_toolbar_styles.large_icon} />
                        {
                            activeWallpaper === 0 ?
                                <div className={background_options_toolbar_styles.wallpaper_section_check_icon_div}>
                                    <CheckSVG className={background_options_toolbar_styles.check_icon} />
                                </div>
                            :   null
                        }
                    </button>
                </AppTooltip>

                {
                    wallpapers.map((wallpaper, index) => (
                        <AppTooltip 
                            key={index} 
                            title={wallpaper.name} 
                        >
                            {
                                activeWallpaper === wallpaper.id ?
                                    <button onClick={() => handleBgThemeAndWallpaperSelect('wallpaper', wallpaper.id, themeState === "dark" ? wallpaper.background_dark_url : wallpaper.background_light_url, noteEditorPlaceholderRef, noteEditorAndTitleInputRef)} className={background_options_toolbar_styles.background_selector_large_active} style={{ backgroundImage: `url(${themeState === "dark" ? wallpaper.dark_url : wallpaper.light_url})` }}>
                                        <div className={background_options_toolbar_styles.check_icon_div} style={{ left: '24px' }}>
                                            <CheckSVG className={background_options_toolbar_styles.check_icon} />
                                        </div>
                                    </button>
                                :   <img onClick={() => handleBgThemeAndWallpaperSelect('wallpaper', wallpaper.id, themeState === "dark" ? wallpaper.background_dark_url : wallpaper.background_light_url, noteEditorPlaceholderRef, noteEditorAndTitleInputRef)} className={background_options_toolbar_styles.background_selector_large} src={themeState === "dark" ? wallpaper.dark_url : wallpaper.light_url} alt="The wallpaper" />
                            }
                        </AppTooltip>
                    ))
                }
            </div>
        </div>
    );
}