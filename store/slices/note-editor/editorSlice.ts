import { NewNote, EditorReduxStateProps } from '@/types/note-editor/editor-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Interface for the create new note reducer function */
interface CreateNewNoteReducerProps {
    /** A new note object */
    newNote: NewNote;
}

/** Interface for the update new note reducer function */
interface UpdateNewNoteReducerProps {
    /** A new note object */
    newNote: NewNote;
}

const initialState: EditorReduxStateProps = {
    title: '',
    content: '',
    newNote: {},
    noteEditedTimestamp: null,
    newNoteEditorState: false,
    selectedImages: [],
    formattingOptionsButton: true
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

        /* Update the note edited timestamp */
        updateNoteEditedTimestamp(state, action: PayloadAction<string | null>) {
            state.noteEditedTimestamp = action.payload;
        },

        /* Update the selected image */
        updateSelectedImages(state, action: PayloadAction<File[]>) {
            state.selectedImages = action.payload;
        },

        /* Remove the selected image of the users choice */
        removeSelectedImage(state, action: PayloadAction<number>) {
            state.selectedImages.splice(action.payload, 1);
        },

        /* Update the state of the formatting options button */
        updateFormattingOptionsButton(state, action: PayloadAction<boolean | string>) {
            state.formattingOptionsButton = action.payload;
        },

        /* Create a new note */
        createNewNote(state, action: PayloadAction<CreateNewNoteReducerProps>) {
            state.newNote = action.payload.newNote;
        },

        /* Update the new note */
        updateNewNote(state, action: PayloadAction<UpdateNewNoteReducerProps>) {
            state.newNote = action.payload.newNote;
        },

        /** Update the state of the note editor dialog when it comes to creating a new note */
        updateNewNoteEditorState(state, action: PayloadAction<boolean>) {
            state.newNoteEditorState = action.payload;
        }
    },
});

export const { updateEditorTitle, updateEditorContent, updateNoteEditedTimestamp, updateSelectedImages, removeSelectedImage, updateFormattingOptionsButton, createNewNote, updateNewNote, updateNewNoteEditorState } = editorSlice.actions;
export default editorSlice.reducer;