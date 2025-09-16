"use client";

import Link from 'next/link';
import drawer_styles from './Drawer.module.css';
import BulbSVG from '../svg-comp/Bulb';
import PencilSVG from '../svg-comp/Pencil';
import ArchiveSVG from '../svg-comp/Archive';
import TrashSVG from '../svg-comp/Trash';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';

/**
 * This is the navigation drawer component
 */
export default function Drawer() {
    const breakPointForDrawer = useMediaQuery({ query: '(max-width: 1500px)' });
    const isCollapsed = useAppSelector((state) => state.drawer.isCollapsed);
    const [drawerShadow, setDrawerShadow] = useState(false);
    
    /* 
        This method is called when the user hovers on the collapsed drawer
        and then we apply a shadow to the drawer
    */
    const addCollapsedDrawerShadow = () => {
        if (isCollapsed){
            setDrawerShadow(true);
            return;
        }

        setDrawerShadow(false);
    }

    /* 
        This method is called when the user stops hovering on the collapsed drawer
        and then we remove the shadow from the drawer
    */
    const removeCollapsedDrawerShadow = () => {
        if (isCollapsed){
            setDrawerShadow(false);
            return;
        }

        setDrawerShadow(false);
    }

    return (
        <>
            {
                // Don't render the drawer until the width of the screen is beyond 1500px
                breakPointForDrawer === false ? 
                    <div className={drawer_styles.container}>
                        <div className={[drawer_styles.wage, isCollapsed ? drawer_styles.collapsed_wage : ''].join(' ')}></div>
                        <div onMouseEnter={() => addCollapsedDrawerShadow()} onMouseLeave={() => removeCollapsedDrawerShadow()} className={[drawer_styles.page_drawer, isCollapsed ? drawer_styles.collapsed_drawer : '', drawerShadow ? drawer_styles.drawer_shadow : ''].join(' ')}>
                            <Link href='/' className={[drawer_styles.page_drawer_link, isCollapsed ? drawer_styles.collapsed_drawer_link : '', drawer_styles.active].join(' ')}>
                                <BulbSVG className={[drawer_styles.link_icon, isCollapsed ? drawer_styles.adjust_link_icon : '', drawer_styles.active_icon].join(' ')} />
                                <p className={drawer_styles.link_text}>Notes</p>
                            </Link>

                            <Link href='/' className={[drawer_styles.page_drawer_link, isCollapsed ? drawer_styles.collapsed_drawer_link : ''].join(' ')}>
                                <PencilSVG className={[drawer_styles.link_icon, isCollapsed ? drawer_styles.adjust_link_icon : ''].join(' ')} />
                                <p className={drawer_styles.link_text}>Edit labels</p>
                            </Link>

                            <Link href='/' className={[drawer_styles.page_drawer_link, isCollapsed ? drawer_styles.collapsed_drawer_link : ''].join(' ')}>
                                <ArchiveSVG className={[drawer_styles.link_icon, isCollapsed ? drawer_styles.adjust_link_icon : ''].join(' ')} />
                                <p className={drawer_styles.link_text}>Archive</p>
                            </Link>

                            <Link href='/' className={[drawer_styles.page_drawer_link, isCollapsed ? drawer_styles.collapsed_drawer_link : ''].join(' ')}>
                                <TrashSVG className={[drawer_styles.link_icon, isCollapsed ? drawer_styles.adjust_link_icon : ''].join(' ')} />
                                <p className={drawer_styles.link_text}>Trash</p>
                            </Link>
                        </div>
                    </div>
                :   null
            }
        </>
    );
}