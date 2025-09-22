"use client";

import note_editor_styles from './NoteEditor.module.css';
import PhotoSVG from '../svg-comp/Photo';
import BrushSVG from '../svg-comp/Brush';
import CheckboxSVG from '../svg-comp/Checkbox';
import AppTooltip from '../AppTooltip';
import EditorPlaceholderProps from '@/types/note_editor/editor-placeholder.types';
import handlePlaceholderInputFocus from '@/lib/note_editor/handlePlaceholderInputFocus';

/**
 * This is the placeholder component for the note editor.
 * It provides a surface for which users can access the editor.
 * It includes an input field for taking notes and action buttons for adding a list, drawing and image.
 */
export default function NoteEditorPlaceholder({ editor, noteEditorPlaceholderRef }: EditorPlaceholderProps){

    return (
        <div ref={noteEditorPlaceholderRef} className={note_editor_styles.input_container}>
            <input 
                onFocus={() => handlePlaceholderInputFocus(editor)}
                className={note_editor_styles.input}
                type="text" 
                placeholder="Take a note..." 
            />

            <div className={note_editor_styles.input_actions}>
                <AppTooltip title="New list" >
                    <button className={note_editor_styles.input_action_button}>
                        <CheckboxSVG className={note_editor_styles.input_action_icon} />
                    </button>
                </AppTooltip>

                <AppTooltip title="New note with drawing" >
                    <button className={note_editor_styles.input_action_button}>
                        <BrushSVG className={note_editor_styles.input_action_icon} />
                    </button>
                </AppTooltip>

                <AppTooltip title="New note with image" >
                    <button className={note_editor_styles.input_action_button}>
                        <PhotoSVG className={note_editor_styles.input_action_icon} />
                    </button>
                </AppTooltip>
            </div>
        </div>
    );
}