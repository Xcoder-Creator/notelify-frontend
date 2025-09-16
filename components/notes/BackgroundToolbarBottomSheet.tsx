"use client";

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AppTooltip from '../AppTooltip';
import CheckSVG from '../svg-comp/Check';
import DropletOffSVG from '../svg-comp/DropletOff';
import bottomsheet_styles from './BackgroundToolbarBottomSheet.module.css';
import background_toolbar_styles from '@/components/note_editor/BackgroundToolbar.module.css';
import backgroundThemes from '@/utils/background-toolbar/backgroundThemes.util';
import PhotoOffSVG from '../svg-comp/PhotoOff';
import wallpapers from '@/utils/background-toolbar/wallpapers.util';
import { useEffect, useRef } from 'react';
import { toggleDialogBottomSheet } from '@/store/slices/notesSlice';
import handleThemeAndWallpaperFromBottomSheet from '@/lib/notes/handleThemeAndWallpaperFromBottomSheet';

/**
 * This is a bottom sheet for the background toolbar in the note editor dialog.
 */
export default function BackgroundToolbarBottomSheet() {
    const activeBgTheme = useAppSelector((state) => state.backgroundToolbarBottomSheet.activeBgTheme); // The active background theme
    const activeWallpaper = useAppSelector((state) => state.backgroundToolbarBottomSheet.activeWallpaper); // The active wallpaper
    const themeState = useAppSelector((state) => state.theme.theme);
    const dispatch = useAppDispatch();
    const startY = useRef(0);
    const bottomSheet = useRef<HTMLDivElement>(null);

    // Close the bottom sheet
    const closeBottomsheet = () => {
        bottomSheet.current && (bottomSheet.current.style.transform = 'translateY(210px)');
        setTimeout(() => {
            dispatch(toggleDialogBottomSheet({ value: false }));
        }, 300);
    }

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        startY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        const endY = e.changedTouches[0].clientY;
        const diff = endY - startY.current;

        // threshold so small accidental touches don’t count
        if (diff > 50) {
            closeBottomsheet();
        }
    };

    // Anytime the bottomsheet component is rendered, animate the bottomsheet by sliding it up
    useEffect(() => {
        setTimeout(() => {
            bottomSheet.current && (bottomSheet.current.style.transform = 'translateY(0px)');        
        }, 100);
    }, []);

    return (
        <>
            <div
                className={bottomsheet_styles.backdrop}
                onClick={() => closeBottomsheet()}
            />

            <div
                ref={bottomSheet}
                className={bottomsheet_styles.container}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <p className={bottomsheet_styles.color_label}>Color</p>

                <div className={[background_toolbar_styles.theme_section, bottomsheet_styles.theme_section].join(' ')}>
                    <AppTooltip            
                        title="Default"
                    >
                        <button onClick={() => handleThemeAndWallpaperFromBottomSheet(dispatch, 'theme', 0)} className={[background_toolbar_styles.background_selector_small, background_toolbar_styles.default_border, activeBgTheme === 0 ? background_toolbar_styles.active : ''].join(' ')}>
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
                            <AppTooltip key={index} title={theme.name}>
                                <button onClick={() => handleThemeAndWallpaperFromBottomSheet(dispatch, 'theme', theme.id)} className={[background_toolbar_styles.background_selector_small, activeBgTheme === theme.id ? background_toolbar_styles.active : ''].join(' ')} style={{ 
                                    backgroundColor: themeState === "dark" ? theme.theme : theme.lightTheme
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
                
                <div className={bottomsheet_styles.separator}></div>

                <p className={bottomsheet_styles.color_label}>Background</p>

                <div className={[background_toolbar_styles.wallpaper_section, bottomsheet_styles.wallpaper_section].join(' ')}>
                    <AppTooltip title="Default">
                        <button onClick={() => handleThemeAndWallpaperFromBottomSheet(dispatch, 'wallpaper', 0)} className={[background_toolbar_styles.background_selector_large, background_toolbar_styles.default_border, activeWallpaper === 0 ? background_toolbar_styles.active : ''].join(' ')}>
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
                            <AppTooltip 
                                key={index} 
                                title={wallpaper.name}     
                            >
                                {
                                    activeWallpaper === wallpaper.id ?
                                        <button onClick={() => handleThemeAndWallpaperFromBottomSheet(dispatch, 'wallpaper', wallpaper.id)} className={background_toolbar_styles.background_selector_large_active} style={{ 
                                            backgroundImage: themeState === "dark" ? `url(${wallpaper.dark_url})` : `url(${wallpaper.light_url})`
                                        }}>
                                            <div className={background_toolbar_styles.check_icon_div} style={{ left: '24px' }}>
                                                <CheckSVG className={background_toolbar_styles.check_icon} />
                                            </div>
                                        </button>
                                    :   <img onClick={() => handleThemeAndWallpaperFromBottomSheet(dispatch, 'wallpaper', wallpaper.id)} className={background_toolbar_styles.background_selector_large} src={themeState === "dark" ? wallpaper.dark_url : wallpaper.light_url} alt="The wallpaper" />
                                }
                            </AppTooltip>
                        ))
                    }
                </div>
            </div>
        </>
    );
}