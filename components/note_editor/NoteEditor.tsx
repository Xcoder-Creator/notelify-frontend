"use client";

import note_editor_styles from './NoteEditor.module.css';
import { EditorContent } from '@tiptap/react';
import { useRef } from 'react';
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

/**
 * This is the note editor where users can write and format their notes.
 * It includes a title input, an editor content area, formatting options, and an action toolbar.
 */
export default function NoteEditor({ editor, noteEditorPlaceholderRef, backgroundOptionsButtonRef, backgroundOptionsToolbarRef, dropdownMenuRef, moreOptionsButtonRef, fileInputRef, selectedImages, setSelectedImages }: NoteEditorProps){
    const noteEditorAndTitleInputRef = useRef<HTMLDivElement>(null); // The ref of the note editor and title input
    const dispatch = useAppDispatch(); // The redux dispatch function
    const editorTitle = useAppSelector((state) => state.editor.title); // The note editor title
    const editorContent = useAppSelector((state) => state.editor.content); // The note editor content
    const formattingOptionsToolbar = useAppSelector((state) => state.formattingOptionsToolbar.state); // The formatting options toolbar state
    const activeBgTheme = useAppSelector((state) => state.backgroundOptionsToolbar.activeBgTheme); // The active background theme
    const themeState = useAppSelector((state) => state.theme.theme); // The apps theme

    return (
        <div 
            ref={noteEditorPlaceholderRef} 
            className={[note_editor_styles.input_container_focused].join(' ')}
            style={{ 
                backgroundColor: activeBgTheme === 0 ? 'var(--background)' : `${themeState === "dark" ? backgroundThemes.find(theme => theme.id === activeBgTheme)?.theme : backgroundThemes.find(theme => theme.id === activeBgTheme)?.lightTheme}`,
                borderColor: activeBgTheme === 0 ? 'var(--editor-border)' : `${themeState === "dark" ? backgroundThemes.find(theme => theme.id === activeBgTheme)?.theme : backgroundThemes.find(theme => theme.id === activeBgTheme)?.lightTheme}`
            }}
        >
            <div ref={noteEditorAndTitleInputRef} className={[note_editor_styles.note_editor_and_title_input].join(' ')}>
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

                    <AppTooltip title="Pin note" >
                        <button className={note_editor_styles.input_action_button_x}>
                            <UnpinnedSVG className={note_editor_styles.input_action_icon} />
                        </button>
                    </AppTooltip>
                </div>
        
                <EditorContent 
                    editor={editor}
                    value={editorContent}
                    className={[note_editor_styles.editor, note_editor_styles.mt].join(' ')}
                    onFocus={() => handleEditorFocus()}
                    onKeyDown={(e) => captureKeyPressesInEditor(e, editor)}
                />

                {
                    formattingOptionsToolbar && 
                        <FormattingOptionsToolbar
                            editor={editor}
                        />
                }
            </div>

            <div className={[note_editor_styles.action_toolbar_and_formatting_options_block].join(' ')}>
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
                />
            </div>
        </div>
    );
}