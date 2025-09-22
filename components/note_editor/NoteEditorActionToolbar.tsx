"use client";

import note_editor_styles from './NoteEditor.module.css';
import BaselineSVG from '../svg-comp/Baseline';
import PaletteSVG from '../svg-comp/Palette';
import PhotoSVG from '../svg-comp/Photo';
import ArchiveSVG from '../svg-comp/Archive';
import VerticalDotsSVG from '../svg-comp/VerticalDots';
import UndoSVG from '../svg-comp/Undo';
import RedoSVG from '../svg-comp/Redo';
import AppTooltip from '../AppTooltip';
import NoteEditorActionToolbarProps from '@/types/note_editor/action-toolbar.types';
import toggleEditorActions from '@/lib/note_editor/toggleEditorActions';
import closeEditor from '@/lib/note_editor/closeEditor';
import { useAppSelector } from '@/store/hooks';
import BackgroundOptionsToolbar from './BackgroundOptionsToolbar';
import DropdownMenu from './DropdownMenu';
import handleFileChange from '@/lib/note_editor/handleFileChange';

/**
 * This is the action toolbar for the note editor.
 * It includes buttons for formatting options, background options, adding images, archiving notes, and undo/redo actions.
 */
export default function NoteEditorActionToolbar({ editor, noteEditorPlaceholderRef, noteEditorAndTitleInputRef, backgroundOptionsButtonRef, backgroundOptionsToolbarRef, dropdownMenuRef, moreOptionsButtonRef, fileInputRef, selectedImages, setSelectedImages }: NoteEditorActionToolbarProps) {
    const formattingOptionsButton = useAppSelector((state) => state.actionToolbar.formattingOptionsButton); // The state of the formatting options button
    const backgroundOptionsToolbar = useAppSelector((state) => state.backgroundOptionsToolbar.state); // The state of the background options toolbar
    const dropdownMenu = useAppSelector((state) => state.actionToolbar.dropdownMenu); // The dropdown menu state for the note editor
    const undo = useAppSelector((state) => state.actionToolbar.undo); // The state of the undo action in the note editor
    const redo = useAppSelector((state) => state.actionToolbar.redo); // The state of the redo action in the note editor

    return (
        <div className={note_editor_styles.editor_actions}>
            <div className={note_editor_styles.editor_action_buttons}>
                <AppTooltip title="Formatting options">
                    <button onClick={(e) => toggleEditorActions(1, fileInputRef, editor)} className={[note_editor_styles.editor_action_button, formattingOptionsButton === 'active' ? note_editor_styles.active : formattingOptionsButton === false ? note_editor_styles.disabled : ''].join(' ')}>
                        <BaselineSVG className={[note_editor_styles.editor_action_icon].join(' ')} />
                    </button>
                </AppTooltip>

                <AppTooltip title="Background options">
                    <button ref={backgroundOptionsButtonRef} onClick={(e) => toggleEditorActions(2, fileInputRef, editor)} className={note_editor_styles.editor_action_button}>
                        <PaletteSVG className={note_editor_styles.editor_action_icon} />
                    </button>
                </AppTooltip>

                {
                    backgroundOptionsToolbar && backgroundOptionsButtonRef.current ?
                        <BackgroundOptionsToolbar
                            backgroundOptionsButtonRef={backgroundOptionsButtonRef}
                            backgroundOptionsToolbarRef={backgroundOptionsToolbarRef}
                            noteEditorPlaceholderRef={noteEditorPlaceholderRef}
                            noteEditorAndTitleInputRef={noteEditorAndTitleInputRef}
                        />
                    :   null
                }

                <AppTooltip title="Add image">
                    <button onClick={(e) => toggleEditorActions(3, fileInputRef, editor)} className={note_editor_styles.editor_action_button}>
                        <PhotoSVG className={note_editor_styles.editor_action_icon} />
                    </button>
                </AppTooltip>

                <AppTooltip title="Archive">
                    <button onClick={(e) => toggleEditorActions(4, fileInputRef, editor)} className={note_editor_styles.editor_action_button}>
                        <ArchiveSVG className={note_editor_styles.editor_action_icon} />
                    </button>
                </AppTooltip>

                <AppTooltip title="More">
                    <button
                        ref={moreOptionsButtonRef}
                        onClick={(e) => toggleEditorActions(5, fileInputRef, editor)}
                        className={note_editor_styles.editor_action_button}
                    >
                        <VerticalDotsSVG className={note_editor_styles.editor_action_icon} />
                    </button>
                </AppTooltip>

                {
                    dropdownMenu ?
                        <DropdownMenu
                            dropdownMenuRef={dropdownMenuRef}
                            moreOptionsButtonRef={moreOptionsButtonRef} 
                        />
                    :   null
                }

                <AppTooltip title="Undo">
                    <button onClick={(e) => toggleEditorActions(6, fileInputRef, editor)} className={[note_editor_styles.editor_action_button, undo === false ? note_editor_styles.disabled : ''].join(' ')}>
                        <UndoSVG className={[note_editor_styles.editor_action_icon].join(' ')} />
                    </button>
                </AppTooltip>

                <AppTooltip title="Redo">
                    <button onClick={(e) => toggleEditorActions(7, fileInputRef, editor)} className={[note_editor_styles.editor_action_button, redo === false ? note_editor_styles.disabled : ''].join(' ')}>
                        <RedoSVG className={[note_editor_styles.editor_action_icon].join(' ')} />
                    </button>
                </AppTooltip>
            </div>

            <button onClick={() => closeEditor(editor)} className={note_editor_styles.close_button}>Close</button>
            
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/jpeg, image/gif, image/jpg"
                onChange={(e) => handleFileChange(e, fileInputRef, setSelectedImages)}
                style={{ display: 'none' }}
            />
        </div>
    );
}