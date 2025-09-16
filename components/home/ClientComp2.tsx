"use client";

import React, { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useMediaQuery } from 'react-responsive';
import { toggleDialogBottomSheet } from '@/store/slices/notesSlice';
import BackgroundToolbarBottomSheet from '../notes/BackgroundToolbarBottomSheet';
import NoteEditorDialog from '../notes/NoteEditorDialog';
import { resetFormattingOptionsBlock } from "@/store/slices/note-editor/formattingOptionsBlockSlice";
import { updateEditorContent, updateEditorTitle, updateFormattingOptionsButton, updateNoteEditedTimestamp } from "@/store/slices/note-editor/editorSlice";
import Fab from "@mui/material/Fab";
import PlusSVG from "../svg-comp/Plus";
import FabComponent from "./FabComp";
import FabComp from "./FabComp";
import { updateActiveBgTheme, updateActiveWallpaper } from "@/store/slices/backgroundToolbarBottomSheetSlice";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

/**
 * The client component for the home page containing the note editor 
 * dialog and the background toolbar bottom sheet.
 */
export default function ClientComp2() {
    const dispatch = useAppDispatch(); // The Redux dispatch function
    const noteEditorDialogState = useAppSelector((state) => state.notes.noteEditorDialog); // The state of the note editor dialog
    const breakPointForBottomSheet = useMediaQuery({ query: '(max-width: 490px)' }); // This breakpoint defines when the dialog bottom sheet can become visible/rendered
    const dialogBottomsheet = useAppSelector((state) => state.notes.dialogBottomSheet); // The state of the dialog bottom sheet
    const breakPointForNoteEditor = useMediaQuery({ query: '(max-width: 820px)' }); // This breakpoint defines when the note editor becomes visible/rendered in the home page

    /* 
        When the breakpoint for the bottom sheet is false, 
        disable/hide the bottom sheet
    */
    useEffect(() => {
        if (breakPointForBottomSheet) return;
        dispatch(toggleDialogBottomSheet({ value: false }));
    }, [breakPointForBottomSheet]);

    /* 
        If the dialog gets closed (false), reset the state of
        the dialog to its default.
    */
    useEffect(() => {
        if (noteEditorDialogState === false) {
            dispatch(resetFormattingOptionsBlock());
            dispatch(updateFormattingOptionsButton(true));
            dispatch(updateActiveBgTheme(0));
            dispatch(updateActiveWallpaper(0));
            dispatch(updateEditorTitle(''));
            dispatch(updateEditorContent(''));
            dispatch(updateNoteEditedTimestamp(null));
        }
    }, [noteEditorDialogState]);

    return (
        <>
            {/* ----Render the note editor dialog---- */}
            {noteEditorDialogState && <NoteEditorDialog />}

            {/* ----Render the background toolbar bottom sheet---- */}
            {breakPointForBottomSheet && dialogBottomsheet && <BackgroundToolbarBottomSheet />}

            {/* ----Render the fab component---- */}
            {breakPointForNoteEditor && <FabComp />}
        </>
    );
}