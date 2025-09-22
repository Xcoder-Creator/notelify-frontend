"use client";

import React, { useEffect, useRef } from "react";
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
import { updateEditorContent } from "@/store/slices/note_editor/editorSlice";
import { useEditor } from "@tiptap/react";
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import { updateFormattingOptions } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";
import { updateRedoButton, updateUndoButton } from "@/store/slices/note_editor/actionToolbarSlice";
import SnackbarComp from "@/components/SnackbarComp";
import NotesLayout from "@/components/notes/NotesLayout";
import note_styles from '@/components/notes/NotesLayout.module.css';
import NoteEditorPlaceholder from "@/components/note_editor/NoteEditorPlaceholder";

/**
 * This is the home page.
 */
export default function Home() {
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.userAuth.userData);
    const loadingScreen = useAppSelector((state) => state.userAuth.loadingScreen);
    const router = useRouter();
    const controllerRef = useRef<AbortController | null>(null);
    const editorContent = useAppSelector((state) => state.editor.content);
    const isFocused = useAppSelector((state) => state.editor.isFocused); // A redux state to track if the editor is focused or not
    const breakPointToRenderMobileDrawer = useMediaQuery({ query: '(max-width: 1500px)' }); // This breakpoint defines when the mobile drawer can become visible/rendered
    const noteEditorPlaceholderRef = useRef<HTMLDivElement>(null); // The note editor placeholder ref

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

    // The editor instance
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: 'Take a note...' })
        ],
        content: editorContent,
        immediatelyRender: false,
        onSelectionUpdate: ({ editor }) => {
            dispatch(updateFormattingOptions({
                headerOne: editor.isActive('heading', { level: 1 }),
                headerTwo: editor.isActive('heading', { level: 2 }),
                normalText: editor.isActive('paragraph'),
                bold: editor.isActive('bold'),
                italic: editor.isActive('italic'),
                underline: editor.isActive('underline'),
            }));
        },
        onTransaction: ({ editor }) => {
            dispatch(updateUndoButton(editor.can().undo()));
            dispatch(updateRedoButton(editor.can().redo()));
        },
        onCreate: ({ editor }) => {
            if (isFocused) {
                editor.commands.focus('end');
            }
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            dispatch(updateEditorContent(html));
        }
    });

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

            <SnackbarComp 
                autoHideDuration={3000} 
                vertical="bottom" 
                horizontal="left" 
                undoBtn={true} 
            />
        </div>
    );
}