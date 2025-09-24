import { Editor } from '@tiptap/react';
import { store } from "@/store";
import { resetNoteEditorState } from '@/store/slices/note_editor/editorSlice';
import { resetActionToolbar } from '@/store/slices/note_editor/actionToolbarSlice';
import { resetFormattingOptionsToolbar } from '@/store/slices/note_editor/formattingOptionsToolbarSlice';
import { resetBackgroundOptionsToolbar } from '@/store/slices/note_editor/backgroundOptionsToolbarSlice';
import { toggleNoteEditorDialog } from '@/store/slices/notesSlice';
import { Dispatch, SetStateAction } from 'react';

/**
 * Close the editor and replace it with the placeholder.
 * @param editor - Tiptap editor instance
 * @param dialogComp - The local dialog state
 * @param setDialogComp - The setter method for the local dialog state
 * @return void
 */
const closeEditor = (editor: Editor | null, dialogComp: boolean | null, setDialogComp: Dispatch<SetStateAction<boolean>> | null) => {
    store.dispatch(resetNoteEditorState()); // Reset the note editor state in redux
    editor?.destroy(); // Destroy the editor instance
    store.dispatch(resetActionToolbar()); // Reset the action toolbar state
    store.dispatch(resetBackgroundOptionsToolbar()); // Reset the state of the background options toolbar to default
    store.dispatch(resetFormattingOptionsToolbar()); // Reset the state of the formatting options toolbar back to default

    // Check if the method is being called from the note editor dialog
    if (typeof dialogComp === 'boolean' && setDialogComp){
        setDialogComp(false);
        
        setTimeout(() => {
            store.dispatch(toggleNoteEditorDialog(false));   
        }, 300);
    } else {
        store.dispatch(toggleNoteEditorDialog(false));
    }
}

export default closeEditor;