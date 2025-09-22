import { NotesReduxStateProps, NoteProps, UpdateSelectedNotesProps } from '@/types/notes/notes-redux-state.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* 
    This redux slice manages the state of the notes layout component in the home page
*/
const initialState: NotesReduxStateProps = {
    pinnedNotes: [],

    othersNotes: [
        {
            noteID: "385a9f0a-a03c-4a06-b5f7-0cd35d56e87a",

            userID: 5,

            title: "This is a note",

            content: "Welcome to the first ever note on notelify!",

            isDraft: false,

            pinned: false,

            bgColor: 0,
            
            wallpaper: 0,

            createdAt: "5th Sep, 2025",

            updatedAt: "7th Sep, 2025",

            attachments: []
        }
    ],

    pinnedPage: 1,

    othersPage: 1,
    
    pageSize: 10,

    notesSelected: [],

    currentDeselectedNoteID: null,

    bottomSheet: false
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        /* Update the pinned notes */
        updatePinnedNotes(state, action: PayloadAction<{ notes: Array<NoteProps> }>) {
            state.pinnedNotes = action.payload.notes;
        },
        
        /* Update the others notes */
        updateOthersNotes(state, action: PayloadAction<{ notes: Array<NoteProps> }>) {
            state.othersNotes = action.payload.notes;
        },

        /* Update the pinned page */
        updatePinnedPage(state, action: PayloadAction<{ value: number }>) {
            state.pinnedPage = action.payload.value;
        },

        /* Update the others page */
        updateOthersPage(state, action: PayloadAction<{ value: number }>) {
            state.othersPage = action.payload.value;
        },

        /* 
            Update the selected notes array state property by either adding a new selected note
            or deselecting an already selected note
        */
        updateSelectedNotes(state, action: PayloadAction<UpdateSelectedNotesProps>){
            if (action.payload.action === 'select'){ // Check if the user is trying to select a note
                if (!state.notesSelected.find(selectedNote => selectedNote.noteID === action.payload.noteID)){
                    // Push the ID of the note into the notes selected array state property
                    state.notesSelected.push({
                        noteID: action.payload.noteID
                    });
                }
            } else if (action.payload.action === 'deselect'){ // Check if the user is trying to deselect a note
                // Loop through the selected notes and remove the note that the user wants to deselect
                for (const [i, note] of state.notesSelected.entries()) {
                    if (note.noteID === action.payload.noteID){
                        state.notesSelected.splice(i, 1);
                        state.currentDeselectedNoteID = action.payload.noteID;
                    }
                }
            }
        },

        /* Clear all selected notes */
        clearSelectedNotes(state){
            state.notesSelected = [];
            state.currentDeselectedNoteID = null;
        },

        /* Toggle the visibility of the bottom sheet */
        toggleBottomSheet(state, action: PayloadAction<boolean>){
            state.bottomSheet = action.payload;
        }
    },
});

export const { updatePinnedNotes, updateOthersNotes, updatePinnedPage, updateOthersPage, updateSelectedNotes, clearSelectedNotes, toggleBottomSheet } = notesSlice.actions;
export default notesSlice.reducer;