"use client";

import note_editor_styles from './NoteEditor.module.css';
import { EditorContent } from '@tiptap/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateEditorTitle } from '@/store/slices/note_editor/editorSlice';
import NoteEditorProps from '@/types/note_editor/note-editor.types';
import AppTooltip from '../AppTooltip';
import UnpinnedSVG from '../svg-comp/Unpinned';
import NoteEditorActionToolbar from './NoteEditorActionToolbar';
import FormattingOptionsToolbar from './FormattingOptionsToolbar';
import ImagesDisplay from './ImagesDisplay';
import handleTitleInputFocus from '@/lib/note_editor/handleTitleInputFocus';
import handleEditorFocus from '@/lib/note_editor/handleEditorFocus';
import captureKeyPressesInEditor from '@/lib/note_editor/captureKeyPressesInEditor';
import backgroundThemes from '@/utils/note_editor/background_options_toolbar/backgroundThemes.util';
import { useMediaQuery } from 'react-responsive';
import NoteEditorDialogHeader from '../dialog/NoteEditorDialogHeader';
import BackgroundOptionsToolbarBottomSheet from '../BackgroundOptionsToolbarBottomSheet';
import wallpapers from '@/utils/note_editor/background_options_toolbar/wallpapers.util';

/**
 * This is the note editor where users can write and format their notes.
 * It includes a title input, an editor content area, formatting options, and an action toolbar.
 */
export default function NoteEditor({ editor, noteEditorPlaceholderRef, backgroundOptionsButtonRef, backgroundOptionsToolbarRef, dropdownMenuRef, moreOptionsButtonRef, fileInputRef, selectedImages, setSelectedImages, dialogComp, setDialogComp, noteEditorAndTitleInputRef }: NoteEditorProps){
    const dispatch = useAppDispatch(); // The redux dispatch function
    const editorTitle = useAppSelector((state) => state.editor.title); // The note editor title
    const editorContent = useAppSelector((state) => state.editor.content); // The note editor content
    const formattingOptionsToolbar = useAppSelector((state) => state.formattingOptionsToolbar.state); // The formatting options toolbar state
    const activeBgTheme = useAppSelector((state) => state.backgroundOptionsToolbar.activeBgTheme); // The active background theme
    const activeWallpaper = useAppSelector((state) => state.backgroundOptionsToolbar.activeWallpaper); // The active wallpaper
    const themeState = useAppSelector((state) => state.theme.theme); // The apps theme
    const breakPointForFullscreenDialog = useMediaQuery({ query: '(max-width: 675px)' }); // The breakpoint at which the dialog goes into fullscreen mode
    const backgroundOptionsToolbarBottomSheet = useAppSelector((state) => state.bottomSheet.state); // The state of the bottomsheet
    const currentNoteTheme = useAppSelector((state) => state.notes.currentNoteTheme); // The theme of the current note
    const noteEditorDialog = useAppSelector((state) => state.notes.noteEditorDialog); // The state of the note editor dialog
    const formatedTimestampForNote = useAppSelector((state) => state.notes.currentNoteTimestamp); // The formated timestamp of the current viewed note in the note editor dialog

    // Update the content of the editor when the content changes in the redux store
    useEffect(() => {
        if (editor && editor.getHTML() !== editorContent) {
            editor.commands.setContent(editorContent);
        }
    }, [editorContent, editor]);

    /*
        When ever this use effect is triggered, update the theme and wallpaper
        of the note editor (This will also apply to the note editor dialog)
    */ 
    useEffect(() => {
        if (noteEditorAndTitleInputRef.current){
            if (noteEditorAndTitleInputRef.current === null) return;
            noteEditorAndTitleInputRef.current.style.backgroundColor = activeBgTheme === 0 ? 'var(--background)' : `${themeState === "dark" ? backgroundThemes.find(theme => theme.id === activeBgTheme)?.theme : backgroundThemes.find(theme => theme.id === activeBgTheme)?.lightTheme}`;
            noteEditorAndTitleInputRef.current.style.backgroundImage = activeWallpaper === 0 ? 'none' : `url(${themeState === "dark" ? wallpapers.find(wallpaper => wallpaper.id === activeWallpaper)?.dark_url : wallpapers.find(wallpaper => wallpaper.id === activeWallpaper)?.light_url})`;
        }
    }, [activeBgTheme, activeWallpaper]);

    /*
        When ever this use effect is triggered, update the theme and border
        of the note editor (This will also apply to the note editor dialog)
    */ 
    useEffect(() => {
        if (noteEditorPlaceholderRef.current){
            if (noteEditorPlaceholderRef.current === null) return;
            noteEditorPlaceholderRef.current.style.backgroundColor = currentNoteTheme === 0 ? 'var(--background)' : `${themeState === "dark" ? backgroundThemes.find(theme => theme.id === currentNoteTheme)?.theme : backgroundThemes.find(theme => theme.id === currentNoteTheme)?.lightTheme}`;
            noteEditorPlaceholderRef.current.style.borderColor = currentNoteTheme === 0 ? 'var(--editor-border)' : `${themeState === "dark" ? backgroundThemes.find(theme => theme.id === currentNoteTheme)?.theme : backgroundThemes.find(theme => theme.id === currentNoteTheme)?.lightTheme}`;
        }
    }, [currentNoteTheme]);

    // Scroll to the bottom of the note editor when the formatting options toolbar is opened
    useEffect(() => {
        if (formattingOptionsToolbar){
            if (noteEditorAndTitleInputRef.current){
                noteEditorAndTitleInputRef.current.scrollTop = noteEditorAndTitleInputRef.current.scrollHeight;
            }
        }
    }, [formattingOptionsToolbar]);

    return (
        <div 
            ref={noteEditorPlaceholderRef} 
            className={
                [
                    note_editor_styles.input_container_focused, 
                    breakPointForFullscreenDialog ? note_editor_styles.input_container_focused_dialog : ''
                ].join(' ')
            }
        >
            {
                breakPointForFullscreenDialog && 
                    <NoteEditorDialogHeader
                        editor={editor}
                        dialogComp={dialogComp}
                        setDialogComp={setDialogComp}
                    />
            }

            <div ref={noteEditorAndTitleInputRef} className={[note_editor_styles.note_editor_and_title_input, breakPointForFullscreenDialog ? note_editor_styles.note_editor_and_title_input_dialog : ''].join(' ')}>
                {
                    selectedImages.length > 0 &&
                        <ImagesDisplay
                            selectedImages={selectedImages} 
                            setSelectedImages={setSelectedImages}
                        />
                }

                <div className={note_editor_styles.title_container}>
                    <input 
                        className={note_editor_styles.title_input} 
                        onFocus={() => handleTitleInputFocus()} 
                        type="text" 
                        placeholder="Title"
                        value={editorTitle}
                        onChange={(e) => {
                            dispatch(updateEditorTitle(e.target.value));
                        }}
                    />

                    {
                        breakPointForFullscreenDialog === false &&
                            <AppTooltip title="Pin note" >
                                <button className={note_editor_styles.input_action_button_x}>
                                    <UnpinnedSVG className={note_editor_styles.input_action_icon} />
                                </button>
                            </AppTooltip>
                    }
                </div>
                
                <div onClick={() => editor?.commands.focus()} style={{ flex: 1 }}>
                    <EditorContent 
                        editor={editor}
                        value={editorContent}
                        className={[note_editor_styles.editor, note_editor_styles.mt].join(' ')}
                        onFocus={() => handleEditorFocus()}
                        onKeyDown={(e) => captureKeyPressesInEditor(e, editor)}
                    />

                    <div className={note_editor_styles.toolbar_and_timestamp}>
                        {
                            formattingOptionsToolbar ?
                                <FormattingOptionsToolbar
                                    editor={editor}
                                />
                            :   <p></p>
                        }

                        {
                            noteEditorDialog ?
                                <>
                                    {
                                        breakPointForFullscreenDialog === false ?
                                            <p className={note_editor_styles.timestamp}>{formatedTimestampForNote}</p>
                                        :   null
                                    }
                                </>
                            :   null
                        }
                    </div>
                </div>
            </div>

            <div className={[note_editor_styles.action_toolbar_and_formatting_options_block, breakPointForFullscreenDialog ? note_editor_styles.action_toolbar_and_formatting_options_block_dialog : ''].join(' ')}>
                <NoteEditorActionToolbar 
                    editor={editor} 
                    noteEditorPlaceholderRef={noteEditorPlaceholderRef} 
                    noteEditorAndTitleInputRef={noteEditorAndTitleInputRef}
                    backgroundOptionsButtonRef={backgroundOptionsButtonRef}
                    backgroundOptionsToolbarRef={backgroundOptionsToolbarRef}
                    dropdownMenuRef={dropdownMenuRef}
                    moreOptionsButtonRef={moreOptionsButtonRef}
                    fileInputRef={fileInputRef}
                    selectedImages={selectedImages} 
                    setSelectedImages={setSelectedImages}
                    dialogComp={dialogComp}
                    setDialogComp={setDialogComp}
                />
            </div>

            {
                breakPointForFullscreenDialog  &&
                    <>
                        {
                            backgroundOptionsToolbarBottomSheet ? <BackgroundOptionsToolbarBottomSheet /> : null
                        }
                    </>
            }
        </div>
    );
}