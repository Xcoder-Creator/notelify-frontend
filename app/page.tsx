"use client";

import Drawer from "@/components/drawer/Drawer";
import Header from "@/components/header/Header";
import NoteEditorMain from "@/components/note_editor/Main";
import note_editor_styles from "@/components/note_editor/NoteEditor.module.css";
import React, { useEffect, useRef } from "react";
import note_styles from '../components/notes/Notes.module.css';
import NotesGrid from "@/components/notes/NotesGrid";
import SnackbarComp from "@/components/SnackbarComp";
import ClientComp2 from "@/components/home/ClientComp2";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import userAuth from "@/api/auth/userAuth";
import ScreenLoader from "@/components/ScreenLoader";
import handleTheme from "@/lib/handleTheme";
import { useMediaQuery } from "react-responsive";
import MobileDrawer from "@/components/drawer/MobileDrawer";
import { updateLoadingScreen } from "@/store/slices/userAuthSlice";

/**
 * This is the home page
 */
export default function Home() {
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.userAuth.userData);
    const loadingScreen = useAppSelector((state) => state.userAuth.loadingScreen);
    const router = useRouter();
    const controllerRef = useRef<AbortController | null>(null);
    const breakPointForDrawer = useMediaQuery({ query: '(max-width: 1500px)' }); // This breakpoint defines when the mobile drawer can become visible/rendered

    useEffect(() => {
        handleTheme(dispatch); // Handle app theme

        // Check if the user is logged in the redux state
        if (userData){
            dispatch(updateLoadingScreen({ loadingScreen: false }));
        } else {
            dispatch(updateLoadingScreen({ loadingScreen: true }));

            const run = async () => {
                await userAuth(dispatch, router, "main", controllerRef);
            }

            run();
        }

        return () => {
            // Cancel any pending requests
            controllerRef.current?.abort();
            controllerRef.current = null;
        }
    }, []);

    if (loadingScreen) return <ScreenLoader />;

    return (
        <div className="page_root">
            {/* ----Render the mobile drawer---- */}
            {breakPointForDrawer && <MobileDrawer />}

            <Header />

            <div className="page_body">
                <Drawer />

                <div className="page_content">
                    <div className={note_editor_styles.container}>
                        <NoteEditorMain />
                    </div>

                    <div className={note_styles.container}>
                        <NotesGrid />
                    </div>
                </div>
            </div>

            <ClientComp2 />

            <SnackbarComp autoHideDuration={3000} vertical="bottom" horizontal="left" undoBtn={true} />
        </div>
    );
}