"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import userAuth from "@/api/auth/userAuth";
import ScreenLoader from "@/components/ScreenLoader";
import handleTheme from "@/lib/theme/handleTheme";
import { updateLoadingScreen } from "@/store/slices/userAuthSlice";
import Header from "@/components/header/Header";
import Drawer from "@/components/drawer/Drawer";
import { useMediaQuery } from "react-responsive";
import MobileDrawer from "@/components/drawer/MobileDrawer";
import note_editor_styles from '@/components/note_editor/NoteEditor.module.css';
import NoteEditorMain from "@/components/note_editor/Main";
import { updateEditorContent, updateEditorTitle } from "@/store/slices/note_editor/editorSlice";
import { Editor } from "@tiptap/react";
import SnackbarComp from "@/components/SnackbarComp";
import NotesLayout from "@/components/notes/NotesLayout";
import note_styles from '@/components/notes/NotesLayout.module.css';
import NoteEditorPlaceholder from "@/components/note_editor/NoteEditorPlaceholder";
import { updateIsAnimatedHeaderVisible } from "@/store/slices/headerSlice";
import { clearSelectedNotes, updateCurrentNoteTheme } from "@/store/slices/notesSlice";
import NoteEditorDialog from "@/components/dialog/NoteEditorDialog";
import BackgroundOptionsToolbarBottomSheet from "@/components/BackgroundOptionsToolbarBottomSheet";
import createNewEditorInstance from "@/lib/note_editor/createNewEditorInstance";
import resetNoteEditorState from "@/lib/note_editor/resetNoteEditorState";
import FabComp from "@/components/notes/FabComp";

/**
 * This is the home page.
 */
export default function Home() {
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.userAuth.userData);
    const loadingScreen = useAppSelector((state) => state.userAuth.loadingScreen);
    const router = useRouter();
    const controllerRef = useRef<AbortController | null>(null);
    const isFocused = useAppSelector((state) => state.editor.isFocused); // A redux state to track if the editor is focused or not
    const breakPointToRenderMobileDrawer = useMediaQuery({ query: '(max-width: 1500px)' }); // This breakpoint defines when the mobile drawer can become visible/rendered
    const noteEditorPlaceholderRef = useRef<HTMLDivElement>(null); // The note editor placeholder ref
    const backgroundOptionsButtonRef = useRef<HTMLButtonElement>(null); // The ref of the background options button in the action toolbar
    const backgroundOptionsToolbarRef = useRef<HTMLDivElement>(null); // The ref of the background options toolbar
    const noteEditorAndTitleInputRef = useRef<HTMLDivElement>(null); // The ref of the note editor and title input
    const dropdownMenuRef = useRef<HTMLDivElement>(null); // The ref of the dropdown menu
    const moreOptionsButtonRef = useRef<HTMLButtonElement>(null); // The ref of the more button
    const fileInputRef = useRef<HTMLInputElement | null>(null); //  The ref for the file input
    const [selectedImages, setSelectedImages] = useState<File[]>([]); // The state for holding all selected images
    const noteEditorDialogState = useAppSelector((state) => state.notes.noteEditorDialog); // The state of the note editor dialog
    const breakPointForBottomSheet = useMediaQuery({ query: '(max-width: 490px)' }); // This breakpoint defines when the dialog bottom sheet can become visible/rendered
    const backgroundOptionsToolbarBottomSheet = useAppSelector((state) => state.bottomSheet.state); // The state of the bottomsheet
    const noteEditorDialog = useAppSelector((state) => state.notes.noteEditorDialog); // The state of the note editor dialog
    const editorRef = useRef<Editor | null>(null); // The note editor reference
    const [editor, setEditor] = useState<Editor | null>(null); // The note ediitor reference
    const breakPointForFab = useMediaQuery({ query: '(max-width: 820px)' }); // This is the break point to render the FAB component

    useEffect(() => {
        /* 
            If the editor is visible, hide the animated 
            header and clear all selected notes
        */
        if (isFocused){
            let newInstance = createNewEditorInstance('');
            editorRef.current = newInstance;
            setEditor(newInstance);
            dispatch(updateIsAnimatedHeaderVisible(false));
            dispatch(clearSelectedNotes());
        } else {
            // Reset the state of the entire note editor to its default
            resetNoteEditorState(editorRef, setEditor, setSelectedImages, noteEditorAndTitleInputRef, noteEditorPlaceholderRef);
        }
    }, [isFocused]);

    useEffect(() => {
        handleTheme(); // Handle app theme

        // Check if the user is logged in the redux state
        if (userData){
            dispatch(updateLoadingScreen({ loadingScreen: false }));
        } else {
            dispatch(updateLoadingScreen({ loadingScreen: true }));

            const run = async () => {
                await userAuth(router, "main", controllerRef);
            }

            run();
        }

        return () => {
            // Cancel any pending requests
            controllerRef.current?.abort();
            controllerRef.current = null;
        }
    }, []);

    // When the editor closes, reset the state of the dialog
    useEffect(() => {
        if (!noteEditorDialog){
            editorRef.current?.destroy();
            editorRef.current = null;
            setEditor(null);
            dispatch(updateEditorTitle(""));
            dispatch(updateEditorContent(""));
            setSelectedImages([]);
        }
    }, [noteEditorDialog]);

    //if (loadingScreen) return <ScreenLoader />;

    return (
        <div className="page_root">
            {breakPointToRenderMobileDrawer && <MobileDrawer />}

            <Header />

            <div className="page_body">
                <Drawer />

                <div className="page_content">
                    <div className={note_editor_styles.container}>
                        {
                            isFocused ?
                                <NoteEditorMain 
                                    editor={editor} 
                                    noteEditorPlaceholderRef={noteEditorPlaceholderRef}
                                    backgroundOptionsButtonRef={backgroundOptionsButtonRef}
                                    backgroundOptionsToolbarRef={backgroundOptionsToolbarRef}
                                    dropdownMenuRef={dropdownMenuRef}
                                    moreOptionsButtonRef={moreOptionsButtonRef}
                                    fileInputRef={fileInputRef}
                                    selectedImages={selectedImages} 
                                    setSelectedImages={setSelectedImages}
                                    noteEditorAndTitleInputRef={noteEditorAndTitleInputRef}
                                />
                            :   <NoteEditorPlaceholder
                                    editor={editor}
                                    noteEditorPlaceholderRef={noteEditorPlaceholderRef}
                                />
                        }
                    </div>

                    <div className={note_styles.container}>
                        <NotesLayout />
                    </div>
                </div>
            </div>

            {
                noteEditorDialogState ?
                    <NoteEditorDialog
                        editor={editor} 
                        noteEditorPlaceholderRef={noteEditorPlaceholderRef}
                        backgroundOptionsButtonRef={backgroundOptionsButtonRef}
                        backgroundOptionsToolbarRef={backgroundOptionsToolbarRef}
                        dropdownMenuRef={dropdownMenuRef}
                        moreOptionsButtonRef={moreOptionsButtonRef}
                        fileInputRef={fileInputRef}
                        selectedImages={selectedImages} 
                        setSelectedImages={setSelectedImages}
                        setEditor={setEditor}
                        editorRef={editorRef}
                    />
                :   null
            }

            {
                breakPointForBottomSheet ?
                    <>
                        {
                            backgroundOptionsToolbarBottomSheet ?
                                <BackgroundOptionsToolbarBottomSheet />
                            :   null
                        }
                    </>
                :   null
            }

            {/* ----Render the fab component---- */}
            {breakPointForFab && <FabComp />}

            <SnackbarComp 
                autoHideDuration={3000} 
                vertical="bottom" 
                horizontal="left" 
                undoBtn={true} 
            />
        </div>
    );
}