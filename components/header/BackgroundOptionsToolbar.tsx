"use client";

import { useEffect } from 'react';
import CheckSVG from '../svg-comp/Check';
import DropletOffSVG from '../svg-comp/DropletOff';
import background_options_toolbar_styles from '@/components/note_editor/BackgroundOptionsToolbar.module.css';
import { useAppSelector } from '@/store/hooks';
import PhotoOffSVG from '../svg-comp/PhotoOff';
import AnimatedHeaderBackgroundOptionsToolbarProps from '@/types/header/backgroud-options-toolbar.types';
import AppTooltip from '../AppTooltip';
import backgroundThemes from '@/utils/note_editor/background_options_toolbar/backgroundThemes.util';
import wallpapers from '@/utils/note_editor/background_options_toolbar/wallpapers.util';
import handleBgThemeAndWallpaperSelect from '@/lib/notes/handleBgThemeAndWallpaperSelect';

/**
 * This is the background options toolbar that contains background colors/themes and wallpapers for the animated header.
 */
export default function BackgroundOptionsToolbar({ backgroundOptionsToolbarRef, backgroundOptionsButtonRef }: AnimatedHeaderBackgroundOptionsToolbarProps){
    const activeBgTheme = useAppSelector((state) => state.backgroundOptionsToolbar.activeBgTheme); // The active background theme
    const activeWallpaper = useAppSelector((state) => state.backgroundOptionsToolbar.activeWallpaper); // The active wallpaper
    const themeState = useAppSelector((state) => state.theme.theme); // The apps theme
   
    useEffect(() => {
        /*
            Positions the background toolbar so that:
            1. It stays below or above the background options button depending on space.
            2. It shifts horizontally if it's close to the viewport edges.
            3. It works correctly while scrolling.
        */
        const positionBackgroundToolbar = () => {
            const button = backgroundOptionsButtonRef.current;
            const toolbar = backgroundOptionsToolbarRef.current;

            if (!button || !toolbar) return;

            const buttonRect = button.getBoundingClientRect();
            const toolbarHeight = toolbar.offsetHeight;
            const toolbarWidth = toolbar.offsetWidth;

            const spaceBelow = window.innerHeight - buttonRect.bottom;
            const shouldFlipUp = spaceBelow < toolbarHeight + 10;

            // Fixed positioning — relative to viewport
            toolbar.style.position = 'fixed';

            // Default horizontal alignment with button
            let left = buttonRect.left;

            // Prevent overflow right
            if (left + toolbarWidth > window.innerWidth - 10) {
                left = window.innerWidth - toolbarWidth - 140;
            }

            // Prevent overflow left
            if (left < 10) {
                left = 10;
            }

            toolbar.style.left = `${left}px`;

            // Vertical positioning
            if (shouldFlipUp) {
                toolbar.style.top = `${buttonRect.top - toolbarHeight}px`;
            } else {
                toolbar.style.top = `${buttonRect.bottom}px`;
            }
        };

        positionBackgroundToolbar();

        window.addEventListener('resize', positionBackgroundToolbar);
        window.addEventListener('scroll', positionBackgroundToolbar);

        return () => {
            window.removeEventListener('resize', positionBackgroundToolbar);
            window.removeEventListener('scroll', positionBackgroundToolbar);
        };
    }, [backgroundOptionsButtonRef, backgroundOptionsToolbarRef]);

    return (
        <div ref={backgroundOptionsToolbarRef} className={background_options_toolbar_styles.toolbar}>
            <div className={background_options_toolbar_styles.theme_section}>
                <AppTooltip  title="Default">
                    <button onClick={() => handleBgThemeAndWallpaperSelect('theme', 0, backgroundThemes[0].theme)} className={[background_options_toolbar_styles.background_selector_small, background_options_toolbar_styles.default_border, activeBgTheme === 0 ? background_options_toolbar_styles.active : ''].join(' ')}>
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
                        <AppTooltip key={index}  title={theme.name}>
                            <button onClick={() => handleBgThemeAndWallpaperSelect('theme', theme.id, theme.theme)} className={[background_options_toolbar_styles.background_selector_small, activeBgTheme === theme.id ? background_options_toolbar_styles.active : ''].join(' ')} style={{ 
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
                <AppTooltip  title="Default">
                    <button onClick={() => handleBgThemeAndWallpaperSelect('wallpaper', 0, wallpapers[0].background_dark_url)} className={[background_options_toolbar_styles.background_selector_large, background_options_toolbar_styles.default_border, activeWallpaper === 0 ? background_options_toolbar_styles.active : ''].join(' ')}>
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
                        <AppTooltip key={index} title={wallpaper.name} >
                            {
                                activeWallpaper === wallpaper.id ?
                                    <button onClick={() => handleBgThemeAndWallpaperSelect('wallpaper', wallpaper.id, themeState === "dark" ? wallpaper.background_dark_url : wallpaper.background_light_url)} className={background_options_toolbar_styles.background_selector_large_active} style={{ 
                                        backgroundImage: `url(${themeState === "dark" ? wallpaper.dark_url : wallpaper.light_url})`  
                                    }}>
                                        <div className={background_options_toolbar_styles.check_icon_div} style={{ left: '24px' }}>
                                            <CheckSVG className={background_options_toolbar_styles.check_icon} />
                                        </div>
                                    </button>
                                :   <img onClick={() => handleBgThemeAndWallpaperSelect('wallpaper', wallpaper.id, themeState === "dark" ? wallpaper.background_dark_url : wallpaper.background_light_url)} className={background_options_toolbar_styles.background_selector_large} src={themeState === "dark" ? wallpaper.dark_url : wallpaper.light_url} alt="The wallpaper" />
                            }
                        </AppTooltip>
                    ))
                }
            </div>
        </div>
    );
}