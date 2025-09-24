"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import { useMediaQuery } from "react-responsive";
import { resetBackgroundOptionsToolbar, toggleBackgroundOptionsToolbarState } from "@/store/slices/note_editor/backgroundOptionsToolbarSlice";
import { resetActionToolbar, toggleDialogDropdownMenu } from "@/store/slices/note_editor/actionToolbarSlice";
import closeEditor from "@/lib/note_editor/closeEditor";
import { toggleNoteEditorDialog, updateCurrentNoteTheme, updateCurrentViewedNote, updateNoteTheme } from "@/store/slices/notesSlice";
import NoteEditor from "../note_editor/NoteEditor";
import NoteEditorDialogProps from "@/types/note-editor-dialog.types";
import createNewEditorInstance from "@/lib/note_editor/createNewEditorInstance";
import resetNoteEditorThemeAndWallpaperState from "@/lib/note_editor/resetNoteEditorThemeAndWallpaperState";
import { resetFormattingOptionsToolbar } from "@/store/slices/note_editor/formattingOptionsToolbarSlice";
import resetNoteEditorState from "@/lib/note_editor/resetNoteEditorState";

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

/** The note editor dialog */
export default function NoteEditorDialog({ editor, noteEditorPlaceholderRef, backgroundOptionsButtonRef, backgroundOptionsToolbarRef, dropdownMenuRef, moreOptionsButtonRef, fileInputRef, selectedImages, setSelectedImages, setEditor, editorRef }: NoteEditorDialogProps) {
    const [dialogComp, setDialogComp] = useState(false);
    const dispatch = useAppDispatch();
    const breakPointForFullscreenDialog = useMediaQuery({ query: '(max-width: 675px)' }); // The breakpoint at which the dialog goes into fullscreen mode
    const dialogRef = useRef<HTMLDivElement>(null);
    const themeState = useAppSelector((state) => state.theme.theme);
    const editorContent = useAppSelector((state) => state.editor.content); // The editors content
    const noteEditorAndTitleInputRef = useRef<HTMLDivElement>(null); // The ref of the note editor and title input

    useEffect(() => {
        if (!editor) return; // Ensure the editor is initialized before adding event listeners

        editor?.commands.focus("end");

        // Close the editor when the user clicks outside it
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Don't close if the click is inside the toolbar OR the background options button
            if (
                backgroundOptionsToolbarRef.current?.contains(target) ||
                backgroundOptionsButtonRef.current?.contains(target)
            ) {
                return;
            }

            dispatch(toggleBackgroundOptionsToolbarState(false));

            // Close dropdown menu
            if (
                !dropdownMenuRef.current?.contains(target) &&
                !moreOptionsButtonRef.current?.contains(target)
            ) {
                dispatch(toggleDialogDropdownMenu(false));
            }
        };

        // Handle the Escape key to close the editor
        // This will allow users to close the editor by pressing the Escape key
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeEditor(editor, dialogComp, setDialogComp);
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

    /* 
        When the component has been mounted, create 
        a new editor instance and display the dialog
    */
    useEffect(() => {
        let newInstance = createNewEditorInstance(editorContent);
        editorRef.current = newInstance;
        setEditor(newInstance);
        setDialogComp(true);
        dialogRef.current?.focus();

        return () => {
            // Reset the state of the entire note editor to its default
            resetNoteEditorState(editorRef, setEditor, setSelectedImages, noteEditorAndTitleInputRef, noteEditorPlaceholderRef);
            dispatch(updateCurrentViewedNote({ note: null })); // Update the current viewed note
        }
    }, []);

    // Close the dialog when the user clicks outside of it
    const onClose = () => {
        editor?.destroy(); // Destroy the editor instance
        dispatch(resetBackgroundOptionsToolbar());
        dispatch(toggleDialogDropdownMenu(false));
        setDialogComp(false);

        setTimeout(() => {
            dispatch(toggleNoteEditorDialog(false));   
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
                noteEditorPlaceholderRef={noteEditorPlaceholderRef} 
                backgroundOptionsButtonRef={backgroundOptionsButtonRef}
                backgroundOptionsToolbarRef={backgroundOptionsToolbarRef}
                dropdownMenuRef={dropdownMenuRef}
                moreOptionsButtonRef={moreOptionsButtonRef}
                fileInputRef={fileInputRef}
                selectedImages={selectedImages} 
                setSelectedImages={setSelectedImages}
                dialogComp={dialogComp}
                setDialogComp={setDialogComp}
                noteEditorAndTitleInputRef={noteEditorAndTitleInputRef}
            />
        </BootstrapDialog>
    );
}