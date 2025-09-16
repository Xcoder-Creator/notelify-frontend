"use client";

import note_editor_styles from './NoteEditor.module.css';
import BaselineSVG from '../svg-comp/Baseline';
import PaletteSVG from '../svg-comp/Palette';
import PhotoSVG from '../svg-comp/Photo';
import ArchiveSVG from '../svg-comp/Archive';
import VerticalDotsSVG from '../svg-comp/VerticalDots';
import UndoSVG from '../svg-comp/Undo';
import RedoSVG from '../svg-comp/Redo';
import NoteEditorActionToolbarProps from '@/types/note-editor/action-toolbar.types';
import closeEditor from '@/lib/note-editor/closeEditor';
import toggleEditorActions from '@/lib/note-editor/toggleEditorActions';
import BackgroundToolbar from './BackgroundToolbar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRef } from 'react';
import handleFileChange from '@/lib/note-editor/handleFileChange';
import DropdownMenu from './DropdownMenu';
import BackgroundToolbarForDialog from '../notes/BackgroundToolbarForDialog';
import DropdownMenuDialog from '../notes/DropdownMenuDialog';
import AppTooltip from '../AppTooltip';
import { useMediaQuery } from 'react-responsive';
import BottomToolbarForNoteEditorDialog from '../notes/BottomToolbarForNoteEditorDialog';

/**
 * This is the action toolbar for the note editor.
 * It includes buttons for formatting options, background options, adding images, archiving notes, and undo/redo actions.
 */
export default function NoteEditorActionToolbar({ editor, dialogComp, setDialogComp, formattingOptionsButton, setBold, setItalic, setUnderline, setIsFocused, undo, redo, setHeaderOne, setHeaderTwo, setNormalText, setUndo, setRedo, backgroundToolbarDisplay, setBackgroundToolbarDisplay, backgroundToolbarRef, backgroundOptionsButtonRef, noteEditorAndPlaceholderRef, noteEditorAndTitleInputRef, selectedImages, setSelectedImages, dropdownMenuRef, moreButtonRef }: NoteEditorActionToolbarProps) {
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const dropdownMenu = useAppSelector((state) => state.dropdownMenu.menuState);
    const dialogDropdownMenu = useAppSelector((state) => state.notes.dialogDropdownMenu);
    const noteEditorDialogState = useAppSelector((state) => state.notes.noteEditorDialog);
    const breakPointForFullscreenDialog = useMediaQuery({ query: '(max-width: 675px)' });

    return (
        <>
            {
                breakPointForFullscreenDialog === false ?
                    <div className={note_editor_styles.editor_actions}>
                        <div className={note_editor_styles.editor_action_buttons}>
                            <AppTooltip title="Formatting options" >
                                <button onClick={(e) => toggleEditorActions(e, dispatch, 1, fileInputRef, editor, undo, redo, formattingOptionsButton, backgroundToolbarDisplay, setBackgroundToolbarDisplay)} className={[note_editor_styles.editor_action_button, formattingOptionsButton === 'active' ? note_editor_styles.active : formattingOptionsButton === false ? note_editor_styles.disabled : ''].join(' ')}>
                                    <BaselineSVG className={[note_editor_styles.editor_action_icon, formattingOptionsButton === false ? note_editor_styles.editor_action_icon_disabled : ''].join(' ')} />
                                </button>
                            </AppTooltip>

                            <AppTooltip title="Background options" >
                                <button ref={backgroundOptionsButtonRef} onClick={(e) => toggleEditorActions(e, dispatch, 2, fileInputRef, editor, undo, redo, formattingOptionsButton, backgroundToolbarDisplay, setBackgroundToolbarDisplay)} className={note_editor_styles.editor_action_button}>
                                    <PaletteSVG className={note_editor_styles.editor_action_icon} />
                                </button>
                            </AppTooltip>

                            {
                                backgroundToolbarDisplay && backgroundOptionsButtonRef.current ?
                                    <>
                                        {
                                            noteEditorDialogState ?
                                                <BackgroundToolbarForDialog
                                                    backgroundToolbarRef={backgroundToolbarRef}
                                                    backgroundOptionsButtonRef={backgroundOptionsButtonRef}
                                                />
                                            :   <BackgroundToolbar 
                                                    backgroundToolbarDisplay={backgroundToolbarDisplay}
                                                    setBackgroundToolbarDisplay={setBackgroundToolbarDisplay}
                                                    backgroundToolbarRef={backgroundToolbarRef}
                                                    backgroundOptionsButtonRef={backgroundOptionsButtonRef}
                                                    noteEditorAndPlaceholderRef={noteEditorAndPlaceholderRef}
                                                    noteEditorAndTitleInputRef={noteEditorAndTitleInputRef}
                                                />
                                        }
                                    </>
                                :   null
                            }

                            <AppTooltip title="Add image" >
                                <button onClick={(e) => toggleEditorActions(e, dispatch, 3, fileInputRef, editor, undo, redo, formattingOptionsButton, backgroundToolbarDisplay, setBackgroundToolbarDisplay)} className={note_editor_styles.editor_action_button}>
                                    <PhotoSVG className={note_editor_styles.editor_action_icon} />
                                </button>
                            </AppTooltip>

                            <AppTooltip title="Archive" >
                                <button onClick={(e) => toggleEditorActions(e, dispatch, 4, fileInputRef, editor, undo, redo, formattingOptionsButton, backgroundToolbarDisplay, setBackgroundToolbarDisplay)} className={note_editor_styles.editor_action_button}>
                                    <ArchiveSVG className={note_editor_styles.editor_action_icon} />
                                </button>
                            </AppTooltip>

                            <AppTooltip title="More" >
                                <button 
                                    ref={moreButtonRef}
                                    onClick={(e) => toggleEditorActions(e, dispatch, 5, fileInputRef, editor, undo, redo, formattingOptionsButton, backgroundToolbarDisplay, setBackgroundToolbarDisplay)} 
                                    className={note_editor_styles.editor_action_button}
                                >
                                    <VerticalDotsSVG className={note_editor_styles.editor_action_icon} />
                                </button>
                            </AppTooltip>

                            {
                                dropdownMenu ?
                                    <DropdownMenu
                                        dropdownMenuRef={dropdownMenuRef}
                                        moreButtonRef={moreButtonRef} 
                                    />
                                :   null
                            }

                            {
                                dialogDropdownMenu ?
                                    <DropdownMenuDialog
                                        dropdownMenuRef={dropdownMenuRef}
                                        moreButtonRef={moreButtonRef} 
                                    />
                                :   null
                            }

                            <AppTooltip title="Undo" >
                                <button onClick={(e) => toggleEditorActions(e, dispatch, 6, fileInputRef, editor, undo, redo, formattingOptionsButton, backgroundToolbarDisplay, setBackgroundToolbarDisplay)} className={[note_editor_styles.editor_action_button, undo === false ? note_editor_styles.disabled : ''].join(' ')}>
                                    <UndoSVG className={[note_editor_styles.editor_action_icon, undo === false ? note_editor_styles.editor_action_icon_disabled : ''].join(' ')} />
                                </button>
                            </AppTooltip>

                            <AppTooltip title="Redo" >
                                <button onClick={(e) => toggleEditorActions(e, dispatch, 7, fileInputRef, editor, undo, redo, formattingOptionsButton, backgroundToolbarDisplay, setBackgroundToolbarDisplay)} className={[note_editor_styles.editor_action_button, redo === false ? note_editor_styles.disabled : ''].join(' ')}>
                                    <RedoSVG className={[note_editor_styles.editor_action_icon, redo === false ? note_editor_styles.editor_action_icon_disabled : ''].join(' ')} />
                                </button>
                            </AppTooltip>
                        </div>

                        <button onClick={() => closeEditor(dispatch, dialogComp, setDialogComp, setIsFocused, editor, setHeaderOne, setHeaderTwo, setNormalText, setBold, setItalic, setUnderline, setUndo, setRedo, setBackgroundToolbarDisplay)} className={note_editor_styles.close_button}>Close</button>
                        
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept="image/png, image/jpeg, image/gif, image/jpg"
                            onChange={(e) => handleFileChange(e, dispatch, fileInputRef, setSelectedImages)}
                            style={{ display: 'none' }}
                        />
                    </div>
                :   <BottomToolbarForNoteEditorDialog />
            }
        </>
    );
}