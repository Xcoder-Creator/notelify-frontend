/**
 * Interface for the background options toolbar redux state
 */
interface BackgroundOptionsToolbarReduxStateProps {
    /** The state of the background options toolbar */
    state: boolean;

    /** The active background theme/color */ 
    activeBgTheme: number;

    /** The active wallpaper */
    activeWallpaper: number;
}

export default BackgroundOptionsToolbarReduxStateProps;