"use client";

import { useEffect } from 'react';
import CheckSVG from '../svg-comp/Check';
import DropletOffSVG from '../svg-comp/DropletOff';
import background_toolbar_styles from '@/components/note_editor/BackgroundToolbar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import PhotoOffSVG from '../svg-comp/PhotoOff';
import AnimatedHeaderBackgroundToolbarProps from '@/types/header/backgroud-toolbar.types';
import backgroundThemes from '@/utils/background-toolbar/backgroundThemes.util';
import wallpapers from '@/utils/background-toolbar/wallpapers.util';
import handleBgThemeAndWallpaperSelect from '@/lib/notes/handleBgThemeAndWallpaperSelect';
import AppTooltip from '../AppTooltip';

/**
 * This is the background toolbar that contains background colors/themes and wallpapers for the animated header
 */
export default function BackgroundToolbar({ backgroundToolbarDisplay, setBackgroundToolbarDisplay, backgroundToolbarRef, backgroundOptionsButtonRef }: AnimatedHeaderBackgroundToolbarProps){
    const activeBgTheme = useAppSelector((state) => state.animatedHeaderBackgroundToolbar.activeBgTheme); // The active background theme
    const activeWallpaper = useAppSelector((state) => state.animatedHeaderBackgroundToolbar.activeWallpaper); // The active wallpaper
    const themeState = useAppSelector((state) => state.theme.theme); // The apps theme
    const dispatch = useAppDispatch();
   
    useEffect(() => {
        /*
            Positions the background toolbar so that:
            1. It stays below or above the background options button depending on space.
            2. It shifts horizontally if it's close to the viewport edges.
            3. It works correctly while scrolling.
        */
        const positionBackgroundToolbar = () => {
            const button = backgroundOptionsButtonRef.current;
            const toolbar = backgroundToolbarRef.current;

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
    }, [backgroundOptionsButtonRef, backgroundToolbarRef]);

    return (
        <div ref={backgroundToolbarRef} className={background_toolbar_styles.toolbar}>
            <div className={background_toolbar_styles.theme_section}>
                <AppTooltip  title="Default">
                    <button onClick={() => handleBgThemeAndWallpaperSelect(dispatch, 'theme', 0, backgroundThemes[0].theme)} className={[background_toolbar_styles.background_selector_small, background_toolbar_styles.default_border, activeBgTheme === 0 ? background_toolbar_styles.active : ''].join(' ')}>
                        <DropletOffSVG className={background_toolbar_styles.small_icon} />
                        {
                            activeBgTheme === 0 ?
                                <div className={background_toolbar_styles.check_icon_div}>
                                    <CheckSVG className={background_toolbar_styles.check_icon} />
                                </div>
                            :   null
                        }
                    </button>
                </AppTooltip>

                {
                    backgroundThemes.map((theme, index) => (
                        <AppTooltip key={index}  title={theme.name}>
                            <button onClick={() => handleBgThemeAndWallpaperSelect(dispatch, 'theme', theme.id, theme.theme)} className={[background_toolbar_styles.background_selector_small, activeBgTheme === theme.id ? background_toolbar_styles.active : ''].join(' ')} style={{ 
                                backgroundColor: themeState === "dark" ? backgroundThemes.find(ftheme => ftheme.id === theme.id)?.theme : backgroundThemes.find(ftheme => ftheme.id === theme.id)?.lightTheme
                            }}>
                                {
                                    activeBgTheme === theme.id ?
                                        <div className={background_toolbar_styles.check_icon_div}>
                                            <CheckSVG className={background_toolbar_styles.check_icon} />
                                        </div>
                                    :   null
                                }
                            </button>
                        </AppTooltip>
                    ))
                }
            </div>

            <div className={background_toolbar_styles.wallpaper_section}>
                <AppTooltip  title="Default">
                    <button onClick={() => handleBgThemeAndWallpaperSelect(dispatch, 'wallpaper', 0, wallpapers[0].background_dark_url)} className={[background_toolbar_styles.background_selector_large, background_toolbar_styles.default_border, activeWallpaper === 0 ? background_toolbar_styles.active : ''].join(' ')}>
                        <PhotoOffSVG className={background_toolbar_styles.large_icon} />
                        {
                            activeWallpaper === 0 ?
                                <div className={background_toolbar_styles.wallpaper_section_check_icon_div}>
                                    <CheckSVG className={background_toolbar_styles.check_icon} />
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
                                    <button onClick={() => handleBgThemeAndWallpaperSelect(dispatch, 'wallpaper', wallpaper.id, themeState === "dark" ? wallpaper.background_dark_url : wallpaper.background_light_url)} className={background_toolbar_styles.background_selector_large_active} style={{ 
                                        backgroundImage: `url(${themeState === "dark" ? wallpaper.dark_url : wallpaper.light_url})`  
                                    }}>
                                        <div className={background_toolbar_styles.check_icon_div} style={{ left: '24px' }}>
                                            <CheckSVG className={background_toolbar_styles.check_icon} />
                                        </div>
                                    </button>
                                :   <img onClick={() => handleBgThemeAndWallpaperSelect(dispatch, 'wallpaper', wallpaper.id, themeState === "dark" ? wallpaper.background_dark_url : wallpaper.background_light_url)} className={background_toolbar_styles.background_selector_large} src={themeState === "dark" ? wallpaper.dark_url : wallpaper.light_url} alt="The wallpaper" />
                            }
                        </AppTooltip>
                    ))
                }
            </div>
        </div>
    );
}