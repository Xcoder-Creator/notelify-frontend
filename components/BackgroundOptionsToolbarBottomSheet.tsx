"use client";

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AppTooltip from './AppTooltip';
import CheckSVG from './svg-comp/Check';
import DropletOffSVG from './svg-comp/DropletOff';
import bottomsheet_styles from './BackgroundOptionsToolbarBottomSheet.module.css';
import background_options_toolbar_styles from '@/components/note_editor/BackgroundOptionsToolbar.module.css';
import PhotoOffSVG from './svg-comp/PhotoOff';
import { useEffect, useRef } from 'react';
import handleThemeAndWallpaperFromBottomSheet from '@/lib/notes/handleThemeAndWallpaperFromBottomSheet';
import backgroundThemes from '@/utils/note_editor/background_options_toolbar/backgroundThemes.util';
import wallpapers from '@/utils/note_editor/background_options_toolbar/wallpapers.util';
import { toggleBottomSheet } from '@/store/slices/bottomSheetSlice';

/**
 * This is a bottom sheet for the background options toolbar.
 */
export default function BackgroundOptionsToolbarBottomSheet() {
    const activeBgTheme = useAppSelector((state) => state.backgroundOptionsToolbar.activeBgTheme); // The active background theme
    const activeWallpaper = useAppSelector((state) => state.backgroundOptionsToolbar.activeWallpaper); // The active wallpaper
    const themeState = useAppSelector((state) => state.theme.theme);
    const dispatch = useAppDispatch();
    const startY = useRef(0);
    const bottomSheet = useRef<HTMLDivElement>(null);

    // Close the bottom sheet
    const closeBottomsheet = () => {
        bottomSheet.current && (bottomSheet.current.style.transform = 'translateY(210px)');
        setTimeout(() => {
            dispatch(toggleBottomSheet(false));
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

                <div className={[background_options_toolbar_styles.theme_section, bottomsheet_styles.theme_section].join(' ')}>
                    <AppTooltip            
                        title="Default"
                    >
                        <button onClick={() => handleThemeAndWallpaperFromBottomSheet('theme', 0)} className={[background_options_toolbar_styles.background_selector_small, background_options_toolbar_styles.default_border, activeBgTheme === 0 ? background_options_toolbar_styles.active : ''].join(' ')}>
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
                                <button onClick={() => handleThemeAndWallpaperFromBottomSheet('theme', theme.id)} className={[background_options_toolbar_styles.background_selector_small, activeBgTheme === theme.id ? background_options_toolbar_styles.active : ''].join(' ')} style={{ 
                                    backgroundColor: themeState === "dark" ? theme.theme : theme.lightTheme
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
                
                <div className={bottomsheet_styles.separator}></div>

                <p className={bottomsheet_styles.color_label}>Background</p>

                <div className={[background_options_toolbar_styles.wallpaper_section, bottomsheet_styles.wallpaper_section].join(' ')}>
                    <AppTooltip title="Default">
                        <button onClick={() => handleThemeAndWallpaperFromBottomSheet('wallpaper', 0)} className={[background_options_toolbar_styles.background_selector_large, background_options_toolbar_styles.default_border, activeWallpaper === 0 ? background_options_toolbar_styles.active : ''].join(' ')}>
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
                                        <button onClick={() => handleThemeAndWallpaperFromBottomSheet('wallpaper', wallpaper.id)} className={background_options_toolbar_styles.background_selector_large_active} style={{ 
                                            backgroundImage: themeState === "dark" ? `url(${wallpaper.dark_url})` : `url(${wallpaper.light_url})`
                                        }}>
                                            <div className={background_options_toolbar_styles.check_icon_div} style={{ left: '24px' }}>
                                                <CheckSVG className={background_options_toolbar_styles.check_icon} />
                                            </div>
                                        </button>
                                    :   <img onClick={() => handleThemeAndWallpaperFromBottomSheet('wallpaper', wallpaper.id)} className={background_options_toolbar_styles.background_selector_large} src={themeState === "dark" ? wallpaper.dark_url : wallpaper.light_url} alt="The wallpaper" />
                                }
                            </AppTooltip>
                        ))
                    }
                </div>
            </div>
        </>
    );
}