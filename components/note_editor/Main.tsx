"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import NoteEditor from './NoteEditor';
import closeEditor from '@/lib/note_editor/closeEditor';
import { resetBackgroundOptionsToolbar } from '@/store/slices/note_editor/backgroundOptionsToolbarSlice';
import { toggleDropdownMenu } from '@/store/slices/note_editor/actionToolbarSlice';
import NoteEditorMainProps from '@/types/note_editor/note-editor-main.types';

/**
 * This is the main component for the note editor.
 * It manages the state and behavior of the editor and its placeholder.
 */
export default function NoteEditorMain({ editor, noteEditorPlaceholderRef, backgroundOptionsButtonRef, backgroundOptionsToolbarRef, dropdownMenuRef, moreOptionsButtonRef, fileInputRef, selectedImages, setSelectedImages, noteEditorAndTitleInputRef }: NoteEditorMainProps) {
    const dispatch = useAppDispatch(); // The dispatch redux method
    const isFocused = useAppSelector((state) => state.editor.isFocused); // A redux state to track if the editor is focused or not

    /* 
        This useEffect handles situations where by the user clicks 
        outside of the editor when its opened. If open, close the editor.
    */
    useEffect(() => {
        if (!editor) return;

        // This method closes the note editor when the user clicks outside it
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Close the note editor
            if (noteEditorPlaceholderRef.current &&
                !noteEditorPlaceholderRef.current.contains(target)) {
                if (!editor?.isDestroyed) {
                    closeEditor(editor, null, null);
                }
            }

            // Close the background options toolbar
            if (
                !backgroundOptionsToolbarRef.current?.contains(target) &&
                !backgroundOptionsButtonRef.current?.contains(target)
            ) {
                dispatch(resetBackgroundOptionsToolbar());
            }

            // Close the dropdown menu
            if (
                !dropdownMenuRef.current?.contains(target) &&
                !moreOptionsButtonRef.current?.contains(target)
            ) {
                dispatch(toggleDropdownMenu(false));
            }
        };

        // Close the note editor once the user taps the escape button on the keyboard
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeEditor(editor, null, null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('keydown', handleEsc);
        };
    }, [
        editor,
        isFocused
    ]);

    return (
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
            dialogComp={null}
            setDialogComp={null}
            noteEditorAndTitleInputRef={noteEditorAndTitleInputRef}
        />
    );
}