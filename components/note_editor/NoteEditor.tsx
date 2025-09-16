"use client";

import note_editor_styles from './NoteEditor.module.css';
import UnpinnedSVG from '../svg-comp/Unpinned';
import { EditorContent } from '@tiptap/react';
import captureKeyPressesInEditor from '@/lib/note-editor/captureKeyPressesInEditor';
import FormattingOptionsBlock from './FormattingOptionsBlock';
import NoteEditorProps from "@/types/note-editor/note-editor.types";
import NoteEditorActionToolbar from './NoteEditorActionToolbar';
import handleTitleInputFocus from '@/lib/note-editor/handleTitleInputFocus';
import handleEditorFocus from '@/lib/note-editor/handleEditorFocus';
import { useEffect, useRef, useState } from 'react';
import ImagesDisplay from './ImagesDisplay';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AppTooltip from '../AppTooltip';
import { useMediaQuery } from 'react-responsive';
import NoteEditorDialogHeader from '../notes/NoteEditorDialogHeader';
import BackgroundToolbarBottomSheet from '../notes/BackgroundToolbarBottomSheet';
import wallpapers from '@/utils/background-toolbar/wallpapers.util';
import backgroundThemes from '@/utils/background-toolbar/backgroundThemes.util';
import resetNoteEditorThemeAndWallpaperState from '@/lib/note-editor/resetNoteEditorThemeAndWallpaperState';
import { updateEditorTitle } from '@/store/slices/note-editor/editorSlice';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import updateTheContentsOfTheNewNote from '@/lib/note-editor/updateTheContentsOfTheNewNote';

/**
 * This is the note editor where users can write and format their notes.
 * It includes a title input, an editor content area, formatting options, and an action toolbar.
 */
export default function NoteEditor({ editor, dialogComp, setDialogComp, noteEditorAndPlaceholderRef, formattingOptionsButton, headerOne, headerTwo, normalText, bold, italic, underline, setBold, setItalic, setUnderline, setIsFocused, undo, redo, setHeaderOne, setHeaderTwo, setNormalText, setUndo, setRedo, backgroundToolbarDisplay, setBackgroundToolbarDisplay, backgroundToolbarRef, backgroundOptionsButtonRef, dropdownMenuRef, moreButtonRef }: NoteEditorProps){
    const noteEditorAndTitleInputRef = useRef<HTMLDivElement>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const dispatch = useAppDispatch();
    const formattingOptionsBlock = useAppSelector((state) => state.formattingOptionsBlock.state); // The state of the formatting options block
    const breakPointForFullscreenDialog = useMediaQuery({ query: '(max-width: 675px)' });
    const dialogBottomsheet = useAppSelector((state) => state.notes.dialogBottomSheet); // The state of the dialog bottom sheet
    const activeBgTheme = useAppSelector((state) => state.backgroundToolbarBottomSheet.activeBgTheme); // The active background theme
    const activeWallpaper = useAppSelector((state) => state.backgroundToolbarBottomSheet.activeWallpaper); // The active wallpaper
    const noteEditorDialogState = useAppSelector((state) => state.notes.noteEditorDialog); // The state of the note editor dialog
    const editorTitle = useAppSelector((state) => state.editor.title);
    const editorContent = useAppSelector((state) => state.editor.content);
    const newNoteEditorState = useAppSelector((state) => state.editor.newNoteEditorState); // This state tracks if the new note editor is open or not
    const newNoteObject = useAppSelector((state) => state.editor.newNote);
    const themeState = useAppSelector((state) => state.theme.theme);

    // Debounced versions of title and content to detect when user stops typing
    const debouncedTitle = useDebouncedValue(editorTitle, 1000);
    const debouncedContent = useDebouncedValue(editorContent, 1000);

    // Run side effects when user stops typing
    useEffect(() => {
        if (newNoteEditorState){
            if (debouncedTitle || debouncedContent) {
                console.log("User stopped typing:");
                console.log("Title:", debouncedTitle);
                console.log("Content:", debouncedContent);
                // 🔥 Here you could trigger autosave to backend
            }
        }
    }, [debouncedTitle, debouncedContent]);
    
    // Reset the editors theme and wallpaper state to its default when the note editor dialog closes
    useEffect(() => {
        if (noteEditorDialogState === false){
            resetNoteEditorThemeAndWallpaperState(dispatch, noteEditorAndTitleInputRef, noteEditorAndPlaceholderRef);
        }
    }, [noteEditorDialogState]);

    // Update the contents of the new note when the editor title or content changes
    useEffect(() => {
        if (newNoteEditorState){
            updateTheContentsOfTheNewNote(dispatch, newNoteObject, editorTitle, editorContent);
        }
    }, [editorTitle, editorContent, newNoteEditorState]);

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

    // Scroll to the bottom of the note editor when the formatting options block is opened
    useEffect(() => {
        if (formattingOptionsBlock){
            if (noteEditorAndTitleInputRef.current){
                noteEditorAndTitleInputRef.current.scrollTop = noteEditorAndTitleInputRef.current.scrollHeight;
            }
        }
    }, [formattingOptionsBlock]);

    return (
        <div 
            ref={noteEditorAndPlaceholderRef} 
            className={
                [
                    note_editor_styles.input_container_focused, 
                    breakPointForFullscreenDialog ? note_editor_styles.input_container_focused_dialog : ''
                ].join(' ')}
            style={{ 
                backgroundColor: activeBgTheme === 0 ? 'var(--background)' : `${themeState === "dark" ? backgroundThemes.find(theme => theme.id === activeBgTheme)?.theme : backgroundThemes.find(theme => theme.id === activeBgTheme)?.lightTheme}`,
                borderColor: activeBgTheme === 0 ? 'var(--editor-border)' : `${themeState === "dark" ? backgroundThemes.find(theme => theme.id === activeBgTheme)?.theme : backgroundThemes.find(theme => theme.id === activeBgTheme)?.lightTheme}`
            }}
        >
            {
                breakPointForFullscreenDialog && 
                    <NoteEditorDialogHeader
                        editor={editor}
                        dialogComp={dialogComp}
                        setDialogComp={setDialogComp}
                        undo={undo}
                        redo={redo}
                        setUndo={setUndo}
                        setRedo={setRedo}
                    />
            }

            <div ref={noteEditorAndTitleInputRef} className={[note_editor_styles.note_editor_and_title_input, breakPointForFullscreenDialog ? note_editor_styles.note_editor_and_title_input_dialog : ''].join(' ')}>
                {
                    selectedImages.length > 0 ?
                        <ImagesDisplay 
                            selectedImages={selectedImages} 
                            setSelectedImages={setSelectedImages}
                        />
                    :   null
                }

                <div className={note_editor_styles.title_container}>
                    <input 
                        className={note_editor_styles.title_input} 
                        onFocus={() => handleTitleInputFocus(dispatch)} 
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
        
                <EditorContent 
                    editor={editor}
                    value={editorContent}
                    className={[note_editor_styles.editor, note_editor_styles.mt].join(' ')} 
                    onFocus={() => handleEditorFocus(dispatch, formattingOptionsButton)}
                    onKeyDown={(e) => captureKeyPressesInEditor(e, editor, bold, italic, underline, setBold, setItalic, setUnderline)}
                />

                {
                    formattingOptionsBlock ? (
                        <FormattingOptionsBlock
                            editor={editor}
                            headerOne={headerOne}
                            headerTwo={headerTwo}
                            normalText={normalText}
                            bold={bold}
                            italic={italic}
                            underline={underline}
                            setHeaderOne={setHeaderOne}
                            setHeaderTwo={setHeaderTwo}
                            setNormalText={setNormalText}
                            setBold={setBold}
                            setItalic={setItalic}
                            setUnderline={setUnderline}
                        />
                    ) : null
                }
            </div>

            <div className={[note_editor_styles.action_toolbar_and_formatting_options_block, breakPointForFullscreenDialog ? note_editor_styles.action_toolbar_and_formatting_options_block_dialog : ''].join(' ')}>
                <NoteEditorActionToolbar
                    editor={editor}
                    dialogComp={dialogComp}
                    setDialogComp={setDialogComp}
                    formattingOptionsButton={formattingOptionsButton}
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
                    noteEditorAndPlaceholderRef={noteEditorAndPlaceholderRef}
                    noteEditorAndTitleInputRef={noteEditorAndTitleInputRef}
                    selectedImages={selectedImages} 
                    setSelectedImages={setSelectedImages}
                    dropdownMenuRef={dropdownMenuRef}
                    moreButtonRef={moreButtonRef}
                />
            </div>

            {
                breakPointForFullscreenDialog ?
                    <>
                        {
                            dialogBottomsheet ? <BackgroundToolbarBottomSheet /> : null
                        }
                    </>
                :   null
            }
        </div>
    );
}