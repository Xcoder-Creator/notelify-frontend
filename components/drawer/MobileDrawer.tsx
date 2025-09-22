"use client";

import Link from "next/link";
import BulbSVG from "../svg-comp/Bulb";
import PencilSVG from "../svg-comp/Pencil";
import ArchiveSVG from "../svg-comp/Archive";
import TrashSVG from "../svg-comp/Trash";
import drawer_styles from './MobileDrawer.module.css';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleMobileDrawer } from "@/store/slices/drawerSlice";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import React from "react";

/**
 * This component is the mobile drawer that is only available when
 * the user switches to a mobile view.
 */
export default function MobileDrawer() {
    const dispatch = useAppDispatch(); // The Redux dispatch function
    const mobileDrawerState = useAppSelector((state) => state.drawer.mobileDrawer); // The state of the mobile drawer

    const touchStartX = React.useRef<number>(0);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const deltaX = e.touches[0].clientX - touchStartX.current;
        if (deltaX < -50) { // swipe left threshold
            dispatch(toggleMobileDrawer(false));
        }
    };

    // This is the list of links in the mobile drawer
    const DrawerList = (
        <Box 
            sx={{ width: 288 }} 
            role="presentation" 
            onClick={() => dispatch(toggleMobileDrawer(false))}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            <div className={drawer_styles.page_drawer}>
                <Link href='/' className={[drawer_styles.page_drawer_link, drawer_styles.active].join(' ')}>
                    <BulbSVG className={drawer_styles.link_icon} />
                    <p className={drawer_styles.link_text}>Notes</p>
                </Link>

                <Link href='/' className={drawer_styles.page_drawer_link}>
                    <PencilSVG className={drawer_styles.link_icon} />
                    <p className={drawer_styles.link_text}>Edit labels</p>
                </Link>

                <Link href='/' className={drawer_styles.page_drawer_link}>
                    <ArchiveSVG className={drawer_styles.link_icon} />
                    <p className={drawer_styles.link_text}>Archive</p>
                </Link>

                <Link href='/' className={drawer_styles.page_drawer_link}>
                    <TrashSVG className={drawer_styles.link_icon} />
                    <p className={drawer_styles.link_text}>Trash</p>
                </Link>
            </div>
        </Box>
    );

    return (
        <SwipeableDrawer
            anchor="left"
            open={mobileDrawerState}
            onClose={() => dispatch(toggleMobileDrawer(false))}
            onOpen={() => dispatch(toggleMobileDrawer(true))}
            disableSwipeToOpen={false}
            swipeAreaWidth={0}
            sx={{
                "& .MuiDrawer-paper": {
                    backgroundColor: "var(--background);", // drawer bg
                    color: "white", // text color
                    width: '288px',
                },
            }}
        >
            {DrawerList}
        </SwipeableDrawer>
    );
}