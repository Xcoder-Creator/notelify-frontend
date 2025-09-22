"use client";

import Image from 'next/image';
import MenuSVG from '../../components/svg-comp/Menu';
import header_styles from './Header.module.css';
import Link from 'next/link';
import SearchSVG from '../svg-comp/Search';
import CloseSVG from '../svg-comp/Close';
import RefreshSVG from '../svg-comp/Refresh';
import ListSVG from '../svg-comp/List';
import SettingsSVG from '../svg-comp/Settings';
import { useMediaQuery } from 'react-responsive';
import AppTooltip from '../AppTooltip';
import { toggleCollapsedDrawer, toggleMobileDrawer } from '@/store/slices/drawerSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useRef, useState } from 'react';
import { updateIsAnimatedHeaderVisible } from '@/store/slices/headerSlice';
import AnimatedHeader from './AnimatedHeader';
import { resetBackgroundOptionsToolbar } from '@/store/slices/note_editor/backgroundOptionsToolbarSlice';

/**
 * This is the header component.
 */
export default function Header() {
    const dispatch = useAppDispatch();
    const [scrollDirection, setScrollDirection] = useState<string | null>(null);
    const lastScrollY = useRef(0);
    const [isVisible, setIsVisible] = useState(false);
    const [animatingOut, setAnimatingOut] = useState(false); // Track animation of the header
    const notesSelected = useAppSelector((state) => state.notes.notesSelected);
    const isFirstRender = useRef(true);
    const isAnimatedHeaderVisible = useAppSelector((state) => state.header.isAnimatedHeaderVisible); // Visibility of the animated header
    const isMobileScreen = useMediaQuery({ query: '(max-width: 611px)' });
    const breakPointToHideSearchContainer = useMediaQuery({ query: '(max-width: 1059.9px)' });
    const breakPointToRenderMobileDrawer = useMediaQuery({ query: '(max-width: 1500px)' });

    // Toggle the drawers
    const toggleDrawer = () => {
        if (breakPointToRenderMobileDrawer){
            dispatch(toggleMobileDrawer(true));
        } else {
            dispatch(toggleCollapsedDrawer());
        }
    }

    // Show the animated header
    const showAnimatedHeader = () => {
        setAnimatingOut(false);
        dispatch(updateIsAnimatedHeaderVisible(true));
        setIsVisible(true);
    };

    // Hide the animated header
    const hideAnimatedHeader = () => {
        setAnimatingOut(true);
        setTimeout(() => { 
            dispatch(updateIsAnimatedHeaderVisible(false));
            setIsVisible(false);
        }, 400); // Wait for animation to finish before removing the element (400ms = animation duration)
    };

    useEffect(() => {
        // If there are any selected notes, make the animated header visible
        if (notesSelected.length > 0){
            dispatch(updateIsAnimatedHeaderVisible(true));
        } else {
            /* 
                If not, hide the animated header and reset 
                the state of the background options toolbar
            */ 
            dispatch(resetBackgroundOptionsToolbar());
            dispatch(updateIsAnimatedHeaderVisible(false));
        }
    }, [notesSelected]);

    useEffect(() => {
        /* 
            This block of code here will prevent the animated header from displaying
            on initial render/load of the page
        */
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        //---------------------------------------------------------------

        if (isAnimatedHeaderVisible) {
            showAnimatedHeader();
        } else {
            hideAnimatedHeader();
        }
    }, [isAnimatedHeaderVisible]); // Keep track of when the state of the animated header changes

    useEffect(() => {
        /* 
            Detect scroll direction to know when to apply border to 
            the bottom of the header (top) and when to apply shadow (down)
        */
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY === 0) {
                setScrollDirection('top');
            } else if (currentScrollY > lastScrollY.current) {
                setScrollDirection('down');
            }

            lastScrollY.current = currentScrollY;
        };

        handleScroll(); // Initial check to set the scroll direction

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <AnimatedHeader
                    hideAnimatedHeader={hideAnimatedHeader}
                    animatingOut={animatingOut}
                    scrollDirection={scrollDirection}
                />
            )}

            <header className={[header_styles.page_header, scrollDirection === 'down' ? isAnimatedHeaderVisible === false ? header_styles.page_header_scrolled_down : '' : ''].join(' ')}>
                <div className={header_styles.page_header_left}>
                    <AppTooltip title="Main menu" >
                        <button onClick={() => toggleDrawer()} className={header_styles.menu_button}>
                            <MenuSVG className={header_styles.menu_icon} />
                        </button>
                    </AppTooltip>
                    
                    <Link href="/" className={header_styles.logo_link}>
                        <Image
                            className={header_styles.logo}
                            src="/app.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <h1 className={header_styles.title}>Notelify</h1>
                    </Link>

                    {   
                        // Don't render the search container until the width of the screen is beyond 1059px 
                        breakPointToHideSearchContainer === false ? 
                            <div className={header_styles.search_note_container}>
                                <button className={header_styles.search_button}>
                                    <SearchSVG className={header_styles.search_icon} />
                                </button>

                                <input className={header_styles.search_input} type="text" placeholder='Search' />

                                <button className={header_styles.close_button}>
                                    <CloseSVG className={header_styles.close_icon} />
                                </button>
                            </div>
                        :   null
                    }
                </div>

                <div className={header_styles.page_header_right}>
                    <div className={header_styles.header_actions}>
                        {
                            isMobileScreen === false && 
                                <>
                                    <AppTooltip className={header_styles.refresh_btn_tooltip} title="Refresh" >
                                        <button className={header_styles.header_action_button}>
                                            <RefreshSVG className={header_styles.refresh_icon} />
                                        </button>
                                    </AppTooltip> 

                                     <AppTooltip className={header_styles.view_btn_tooltip} title="List view" >
                                        <button className={[header_styles.header_action_button, header_styles.mlr_6].join(' ')}>
                                            <ListSVG className={header_styles.list_icon} />
                                        </button>
                                    </AppTooltip>

                                    <AppTooltip className={header_styles.settings_btn_tooltip} title="Settings" >
                                        <button className={header_styles.header_action_button}>
                                            <SettingsSVG className={header_styles.settings_icon} />
                                        </button>
                                    </AppTooltip>
                                </>
                        }
                    </div>

                    <div className={header_styles.profile_container}>
                        <AppTooltip title="Profile" >
                            <div className={header_styles.profile_image_container}>
                                <Image 
                                    className={header_styles.profile_image}
                                    src="/dummy_profile.jpg"
                                    alt="Profile image"
                                    width={32}
                                    height={32}
                                />
                            </div>
                        </AppTooltip>
                    </div>
                </div>
            </header>
        </>
    );
}