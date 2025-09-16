"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CheckSVG from '../svg-comp/Check';
import DropletOffSVG from '../svg-comp/DropletOff';
import background_toolbar_styles from '../note_editor/BackgroundToolbar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import PhotoOffSVG from '../svg-comp/PhotoOff';
import backgroundThemes from '@/utils/background-toolbar/backgroundThemes.util';
import wallpapers from '@/utils/background-toolbar/wallpapers.util';
import AppTooltip from '../AppTooltip';
import handleThemeAndWallpaperFromBottomSheet from '@/lib/notes/handleThemeAndWallpaperFromBottomSheet';
import DialogBackgroundToolbarProps from '@/types/note-editor/dialog-background-toolbar.types';

/**
 * This is the background toolbar dialog that only
 * appears when the user clicks on any note to view it.
 */
export default function BackgroundToolbarForDialog({
    backgroundToolbarRef,
    backgroundOptionsButtonRef
}: DialogBackgroundToolbarProps) {

    const activeBgTheme = useAppSelector((state) => state.backgroundToolbarBottomSheet.activeBgTheme); // The active background theme
    const activeWallpaper = useAppSelector((state) => state.backgroundToolbarBottomSheet.activeWallpaper); // The active wallpaper
    const dispatch = useAppDispatch();
    const themeState = useAppSelector((state) => state.theme.theme);
    const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    useEffect(() => {
        // This method keeps track pf the position of the background toolbar 
        const updatePosition = () => {
            const button = backgroundOptionsButtonRef.current;
            if (!button) return;

            const rect = button.getBoundingClientRect();
            const toolbarHeight = backgroundToolbarRef.current?.offsetHeight ?? 0;
            const spaceBelow = window.innerHeight - rect.bottom;
            const shouldFlipUp = spaceBelow < toolbarHeight + 10;

            setCoords({
                left: rect.left,
                top: shouldFlipUp ? rect.top - toolbarHeight : rect.bottom
            });
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [backgroundOptionsButtonRef]);

    // Render toolbar in a portal to <body> so it’s never clipped
    return createPortal(
        <div
            ref={backgroundToolbarRef}
            className={background_toolbar_styles.toolbar}
            style={{
                position: 'fixed',
                top: coords.top,
                left: coords.left,
                zIndex: 1300
            }}
        >
            <div className={background_toolbar_styles.theme_section}>
                <AppTooltip 
                    title="Default"
                    PopperProps={{ disablePortal: true }}
                >
                    <button
                       onClick={() => handleThemeAndWallpaperFromBottomSheet(dispatch, 'theme', 0)}
                        className={[
                            background_toolbar_styles.background_selector_small,
                            background_toolbar_styles.default_border,
                            activeBgTheme === 0 ? background_toolbar_styles.active : ''
                        ].join(' ')}
                    >
                        <DropletOffSVG className={background_toolbar_styles.small_icon} />
                        {activeBgTheme === 0 && (
                            <div className={background_toolbar_styles.check_icon_div}>
                                <CheckSVG className={background_toolbar_styles.check_icon} />
                            </div>
                        )}
                    </button>
                </AppTooltip>

                {backgroundThemes.map((theme) => (
                    <AppTooltip 
                        key={theme.id}  
                        title={theme.name} 
                        PopperProps={{ disablePortal: true }}
                    >
                        <button
                            onClick={() => handleThemeAndWallpaperFromBottomSheet(dispatch, 'theme', theme.id)}
                            className={[
                                background_toolbar_styles.background_selector_small,
                                activeBgTheme === theme.id ? background_toolbar_styles.active : ''
                            ].join(' ')}
                            style={{ 
                                backgroundColor: themeState === "dark" ? backgroundThemes.find(ftheme => ftheme.id === theme.id)?.theme : backgroundThemes.find(ftheme => ftheme.id === theme.id)?.lightTheme
                            }}
                        >
                            {activeBgTheme === theme.id && (
                                <div className={background_toolbar_styles.check_icon_div}>
                                    <CheckSVG className={background_toolbar_styles.check_icon} />
                                </div>
                            )}
                        </button>
                    </AppTooltip>
                ))}
            </div>

            <div className={background_toolbar_styles.wallpaper_section}>
                <AppTooltip title="Default" PopperProps={{ disablePortal: true }}>
                    <button
                        onClick={() => handleThemeAndWallpaperFromBottomSheet(dispatch, 'wallpaper', 0)}
                        className={[
                            background_toolbar_styles.background_selector_large,
                            background_toolbar_styles.default_border,
                            activeWallpaper === 0 ? background_toolbar_styles.active : ''
                        ].join(' ')}
                    >
                        <PhotoOffSVG className={background_toolbar_styles.large_icon} />

                        {activeWallpaper === 0 && (
                            <div className={background_toolbar_styles.wallpaper_section_check_icon_div}>
                                <CheckSVG className={background_toolbar_styles.check_icon} />
                            </div>
                        )}
                    </button>
                </AppTooltip>

                {wallpapers.map((wallpaper) => (
                    <AppTooltip 
                        key={wallpaper.id} 
                        title={wallpaper.name}
                        PopperProps={{ disablePortal: true }}
                    >
                        {activeWallpaper === wallpaper.id ? (
                            <button
                                onClick={() => handleThemeAndWallpaperFromBottomSheet(dispatch, 'wallpaper', wallpaper.id)}
                                className={background_toolbar_styles.background_selector_large_active}
                                style={{ backgroundImage: themeState === "dark" ? `url(${wallpaper.dark_url})` : `url(${wallpaper.light_url})` }}
                            >
                                <div className={background_toolbar_styles.check_icon_div} style={{ left: '24px' }}>
                                    <CheckSVG className={background_toolbar_styles.check_icon} />
                                </div>
                            </button>
                        ) : (
                            <img
                                onClick={() => handleThemeAndWallpaperFromBottomSheet(dispatch, 'wallpaper', wallpaper.id)}
                                className={background_toolbar_styles.background_selector_large}
                                src={themeState === "dark" ? wallpaper.dark_url : wallpaper.light_url}
                                alt="The wallpaper"
                            />
                        )}
                    </AppTooltip>
                ))}
            </div>
        </div>,
        document.body
    );
}