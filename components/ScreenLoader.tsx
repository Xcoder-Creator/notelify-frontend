"use client";

import LogoSVG from "./svg-comp/Logo";
import screen_loader_styles from './ScreenLoader.module.css';
import AnimatedLoaderSVG from "./svg-comp/AnimatedLoader";
import SnackbarComp from "./SnackbarComp";

/**
 * This is the screen loader component
 */
export default function ScreenLoader() {
    
    return (
        <>
            <div className={screen_loader_styles.container}>
                <LogoSVG className={screen_loader_styles.logo} />
                <AnimatedLoaderSVG className={screen_loader_styles.animated_loader} />
            </div>
            <SnackbarComp autoHideDuration={null} vertical="bottom" horizontal="center" undoBtn={false} />
        </>
    );
}