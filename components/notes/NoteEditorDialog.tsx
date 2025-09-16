"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleDialogMenuState, updateNoteEditorDialog } from "@/store/slices/notesSlice";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import closeEditor from "@/lib/note-editor/closeEditor";
import NoteEditor from "../note_editor/NoteEditor";
import { useMediaQuery } from "react-responsive";
import { updateEditorContent } from "@/store/slices/note-editor/editorSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),

    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiDialog-paper': {
        backgroundColor: '#202124',
        overflow: 'unset',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.6), 0 4px 8px 3px rgba(0, 0, 0, 0.3)'
    }
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/** The note editor dialog for the note cards */
export default function NoteEditorDialog() {
    const [isFocused, setIsFocused] = useState(false);
    const [headerOne, setHeaderOne] = useState(false);
    const [headerTwo, setHeaderTwo] = useState(false);
    const [normalText, setNormalText] = useState(true);
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [undo, setUndo] = useState(false);
    const [redo, setRedo] = useState(false);
    const [backgroundToolbarDisplay, setBackgroundToolbarDisplay] = useState(false);
    const [dialogComp, setDialogComp] = useState(false);
    const titleInput = useRef<HTMLInputElement>(null);
    const noteEditorAndPlaceholderRef = useRef<HTMLDivElement>(null);
    const backgroundToolbarRef = useRef<HTMLDivElement>(null);
    const backgroundOptionsButtonRef = useRef<HTMLButtonElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const moreButtonRef = useRef<HTMLButtonElement>(null);
    const dispatch = useAppDispatch();
    const editorContent = useAppSelector((state) => state.editor.content);
    const formattingOptionsButton = useAppSelector((state) => state.editor.formattingOptionsButton); // The state of the formatting options button
    const breakPointForFullscreenDialog = useMediaQuery({ query: '(max-width: 675px)' });
    const dialogRef = useRef<HTMLDivElement>(null);
    const themeState = useAppSelector((state) => state.theme.theme);

    // Initialize the Tiptap editor
    // This is where the editor instance is created with the necessary extensions and configurations
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Take a note...'
            })
        ],
        content: editorContent,
        immediatelyRender: false, // Don't render immediately on the server to avoid SSR issues
        onSelectionUpdate: ({ editor }) => {
            // Called whenever the cursor/selection changes
            setHeaderOne(editor.isActive('heading', { level: 1 }));
            setHeaderTwo(editor.isActive('heading', { level: 2 }));
            setNormalText(editor.isActive('paragraph'));
            setBold(editor.isActive('bold'));
            setItalic(editor.isActive('italic'));
            setUnderline(editor.isActive('underline'));
        },
        onTransaction: ({ editor }) => {
            setUndo(editor.can().undo());
            setRedo(editor.can().redo());
        },
        onCreate: ({ editor }) => {
            // Safe to focus here
            editor.commands.focus("end");
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            dispatch(updateEditorContent(html));
        }
    });

    useEffect(() => {
        if (!editor) return; // Ensure the editor is initialized before adding event listeners

        editor.commands.focus("end");

        // Close the editor when the user clicks outside it
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Don't close if the click is inside the toolbar OR the background options button
            if (
                backgroundToolbarRef.current?.contains(target) ||
                backgroundOptionsButtonRef.current?.contains(target)
            ) {
                return;
            }

            setBackgroundToolbarDisplay(false);

            // Close dropdown menu
            if (
                !dropdownMenuRef.current?.contains(target) &&
                !moreButtonRef.current?.contains(target)
            ) {
                dispatch(toggleDialogMenuState({ value: false }));
            }
        };

        // Handle the Escape key to close the editor
        // This will allow users to close the editor by pressing the Escape key
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeEditor(
                    dispatch, 
                    dialogComp,
                    setDialogComp,
                    setIsFocused,
                    editor, 
                    setHeaderOne, 
                    setHeaderTwo, 
                    setNormalText, 
                    setBold, 
                    setItalic, 
                    setUnderline, 
                    setUndo, 
                    setRedo,
                    setBackgroundToolbarDisplay
                );
            }
        }

        window.addEventListener('keydown', handleEsc); // Listen for the Escape key to close the editor
        document.addEventListener('mousedown', handleClickOutside); // Listen for mouse clicks outside the background toolbar

        return () => {
            // Cleanup event listeners when the component unmounts or the editor changes
            // This prevents memory leaks and ensures the listeners are removed when no longer needed
            window.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editor]); // Only run when the editor instance changes

    // When the component has been mounted, display the dialog
    useEffect(() => {
        setDialogComp(true);
        dialogRef.current?.focus();
    }, []);

    // Close the dialog when the user clicks outside of it
    const onClose = () => {
        setDialogComp(false);

        setTimeout(() => {
            dispatch(updateNoteEditorDialog({ value: false }));   
        }, 300);
    }

    return (
            <BootstrapDialog
                ref={dialogRef}
                onClose={onClose}
                scroll="body"
                aria-labelledby="customized-dialog-title"
                open={dialogComp}
                fullScreen={breakPointForFullscreenDialog}
                slots={{
                    transition: Transition,
                }}
                slotProps={{
                    backdrop: {
                        sx: { backgroundColor: 'var(--note-editor-dialog-backdrop)', opacity: themeState === "light" ? '0.6 !important' : 'inherit' }
                    },
                }}
            >
                <NoteEditor
                    editor={editor}
                    dialogComp={dialogComp}
                    setDialogComp={setDialogComp}
                    noteEditorAndPlaceholderRef={noteEditorAndPlaceholderRef}
                    titleInput={titleInput}
                    formattingOptionsButton={formattingOptionsButton}
                    headerOne={headerOne}
                    headerTwo={headerTwo}
                    normalText={normalText}
                    bold={bold}
                    italic={italic}
                    underline={underline}
                    setBold={setBold}
                    setItalic={setItalic}
                    setUnderline={setUnderline}
                    setIsFocused={setIsFocused}
                    undo={undo}
                    redo={redo}
                    setHeaderOne={setHeaderOne}
                    setHeaderTwo={setHeaderTwo}
                    setNormalText={setNormalText}
                    setUndo={setUndo}
                    setRedo={setRedo}
                    backgroundToolbarDisplay={backgroundToolbarDisplay}
                    setBackgroundToolbarDisplay={setBackgroundToolbarDisplay}
                    backgroundToolbarRef={backgroundToolbarRef}
                    backgroundOptionsButtonRef={backgroundOptionsButtonRef}
                    dropdownMenuRef={dropdownMenuRef}
                    moreButtonRef={moreButtonRef}
                />
            </BootstrapDialog>
    );
}