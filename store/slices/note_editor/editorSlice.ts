import { EditorReduxStateProps } from '@/types/note_editor/editor-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* 
    This redux slice manages the state of the note editor 
*/
const initialState: EditorReduxStateProps = {
    title: '',
    content: '',
    isFocused: false
};

const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        /* Update the editor title */
        updateEditorTitle(state, action: PayloadAction<string>) {
            state.title = action.payload;
        },

        /* Update the editor content */
        updateEditorContent(state, action: PayloadAction<string>) {
            state.content = action.payload;
        },

        /** Update the editor focus state */
        updateIsFocused(state, action: PayloadAction<boolean>) {
            state.isFocused = action.payload;
        },

        /** Reset the note editor state */
        resetNoteEditorState(state) {
            state.title = '';
            state.content = '';
            state.isFocused = false;
        }
    },
});

export const { updateEditorTitle, updateEditorContent, updateIsFocused, resetNoteEditorState } = editorSlice.actions;
export default editorSlice.reducer;