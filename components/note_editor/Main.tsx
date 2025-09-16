"use client";

import { useEffect, useRef, useState } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import NoteEditor from './NoteEditor';
import NoteEditorPlaceholder from './NoteEditorPlaceholder';
import closeEditor from '@/lib/note-editor/closeEditor';
import handlePlaceholderInputFocus from '@/lib/note-editor/handlePlaceholderInputFocus';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleMenuState } from '@/store/slices/note-editor/dropdownMenuSlice';
import { useMediaQuery } from 'react-responsive';
import { updateNoteEditorDialogTitleAndContent } from '@/store/slices/notesSlice';
import { resetFormattingOptionsBlock } from '@/store/slices/note-editor/formattingOptionsBlockSlice';
import { updateEditorContent, updateNewNoteEditorState } from '@/store/slices/note-editor/editorSlice';
import openEditorToStartNewNote from '@/lib/note-editor/openEditorToStartNewNote';

/**
 * This is the main component for the note editor.
 * It manages the state and behavior of the editor and its placeholder.
 */
export default function NoteEditorMain() {
    const [isFocused, setIsFocused] = useState(false);
    const formattingOptionsButton = useAppSelector((state) => state.editor.formattingOptionsButton); // The state of the formatting options button
    const [headerOne, setHeaderOne] = useState(false);
    const [headerTwo, setHeaderTwo] = useState(false);
    const [normalText, setNormalText] = useState(true);
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);
    const [undo, setUndo] = useState(false);
    const [redo, setRedo] = useState(false);
    const [backgroundToolbarDisplay, setBackgroundToolbarDisplay] = useState(false);
    const titleInput = useRef<HTMLInputElement>(null);
    const noteEditorAndPlaceholderRef = useRef<HTMLDivElement>(null);
    const backgroundToolbarRef = useRef<HTMLDivElement>(null);
    const backgroundOptionsButtonRef = useRef<HTMLButtonElement>(null);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);
    const moreButtonRef = useRef<HTMLButtonElement>(null);
    const dispatch = useAppDispatch();
    const breakPointForNoteEditor = useMediaQuery({ query: '(max-width: 820px)' });
    const noteEditorDialogState = useAppSelector((state) => state.notes.noteEditorDialog);
    const editorContent = useAppSelector((state) => state.editor.content);
    const firstRender = useRef(true);

    // The editor instance
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: 'Take a note...' })
        ],
        content: editorContent,
        immediatelyRender: false,
        onSelectionUpdate: ({ editor }) => {
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
            if (isFocused) {
                editor.commands.focus('end');
            }
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            dispatch(updateEditorContent(html));
        }
    });

    /* 
        Reset the state of the formatting options block if
        the editor has been rendered/focused. If not, we will
        make an api request to the backend to save the note
        with the assumption that the user has closed the editor.
    */
    useEffect(() => {
        /* 
            This block of code will make sure that the rest of the use effect hook
            will run only after the first render (which is the page initially loading).
        */
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        //-----------------------------------------------------

        if (isFocused){
            dispatch(resetFormattingOptionsBlock());
            openEditorToStartNewNote(dispatch);
        } else {
            console.log("Editor is closed!");
            dispatch(updateNewNoteEditorState(false));
            // We will make an api request to the backend to save the note
        }
    }, [isFocused]);

    // Reset note editor dialog title and content when focus changes
    useEffect(() => {
        if (isFocused) {
            dispatch(updateNoteEditorDialogTitleAndContent({ title: '', content: '' }));
        } else if (editor) {
            editor.commands.clearContent();
        }
    }, [isFocused, dispatch, editor]);

    // Click outside + Escape handling
    useEffect(() => {
        if (!editor) return;

        // Close the editor when the user clicks outside it
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Close editor
            if (noteEditorAndPlaceholderRef.current &&
                !noteEditorAndPlaceholderRef.current.contains(target)) {
                if (!editor.isDestroyed) {
                    if (!noteEditorDialogState || isFocused) {
                        closeEditor(
                            dispatch,
                            null,
                            null,
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
            }

            // Close background toolbar
            if (
                !backgroundToolbarRef.current?.contains(target) &&
                !backgroundOptionsButtonRef.current?.contains(target)
            ) {
                setBackgroundToolbarDisplay(false);
            }

            // Close dropdown menu
            if (
                !dropdownMenuRef.current?.contains(target) &&
                !moreButtonRef.current?.contains(target)
            ) {
                dispatch(toggleMenuState(false));
            }
        };

        // Close the note editor once the user taps the escape button on the keyboard
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeEditor(
                    dispatch,
                    null,
                    null,
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
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('keydown', handleEsc);
        };
    }, [
        editor,
        isFocused,
        noteEditorDialogState,
        dispatch
    ]);

    // Destroy editor on unmount
    useEffect(() => {
        return () => {
            if (editor) {
                editor.destroy();
            }
        };
    }, [editor]);

    // Don't render the note editor until the width of the screen is beyond 820px
    if (breakPointForNoteEditor) return null;

    return (
        <>
            {isFocused ? (
                <NoteEditor
                    editor={editor}
                    dialogComp={null}
                    setDialogComp={null}
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
            ) : (
                <NoteEditorPlaceholder
                    editor={editor}
                    handlePlaceholderInputFocus={handlePlaceholderInputFocus}
                    noteEditorAndPlaceholderRef={noteEditorAndPlaceholderRef}
                    setIsFocused={setIsFocused}
                />
            )}
        </>
    );
}