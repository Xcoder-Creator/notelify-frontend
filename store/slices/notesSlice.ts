import { NotesReduxStateProps, NoteProps, UpdateSelectedNotesProps } from '@/types/notes/notes-redux-state.types';
import formatNoteDate from '@/utils/notes/formatNoteDate.util';
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

            createdAt: "2023-09-23T19:07:32.123Z",

            updatedAt: "2023-09-23T19:07:32.123Z",

            attachments: []
        }
    ],

    pinnedPage: 1,

    othersPage: 1,
    
    pageSize: 10,

    notesSelected: [],

    currentDeselectedNoteID: null,

    bottomSheet: false,

    noteEditorDialog: false,

    currentNoteTheme: 0,

    currentNoteWallpaper: 0,

    currentNoteTimestamp: formatNoteDate(new Date()),

    currentViewedNote: null
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

        /* Update the theme of all the selected notes */
        updateNoteTheme(state, action: PayloadAction<{
            /** The ID of the theme/bg color that the user selected */
            bgColor: number;
        }>){
            // Loop through the selected notes and update them with the selected theme by the user
            for (const [i, selectedNote] of state.notesSelected.entries()) {
                let getNoteIndex = state.pinnedNotes.findIndex(note => note.noteID === selectedNote.noteID); // Get the index of the note
                if (getNoteIndex !== -1){
                    state.pinnedNotes[getNoteIndex].bgColor = action.payload.bgColor;
                } else {
                    getNoteIndex = state.othersNotes.findIndex(note => note.noteID === selectedNote.noteID); // Get the index of the note
                    if (getNoteIndex !== -1){
                        state.othersNotes[getNoteIndex].bgColor = action.payload.bgColor;
                    }
                }
            }
        },

        /* Update the theme of all the selected notes */
        updateNoteWallpaper(state, action: PayloadAction<{
            /** The ID of the wallpaper that the user selected */
            wallpaper: number;
        }>){
            // Loop through the selected notes and update them with the selected wallpaper by the user
            for (const [i, selectedNote] of state.notesSelected.entries()) {
                let getNoteIndex = state.pinnedNotes.findIndex(note => note.noteID === selectedNote.noteID); // Get the index of the note
                if (getNoteIndex !== -1){
                    state.pinnedNotes[getNoteIndex].wallpaper = action.payload.wallpaper;
                } else {
                    getNoteIndex = state.othersNotes.findIndex(note => note.noteID === selectedNote.noteID); // Get the index of the note
                    if (getNoteIndex !== -1){
                        state.othersNotes[getNoteIndex].wallpaper = action.payload.wallpaper;
                    }
                }
            }
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
        },

        /* Toggle the note editor dialog */
        toggleNoteEditorDialog(state, action: PayloadAction<boolean>){
            state.noteEditorDialog = action.payload;
        },

        /* Update the current note theme */
        updateCurrentNoteTheme(state, action: PayloadAction<{
            /** The ID of the theme */
            themeID: number;
        }>){
            state.currentNoteTheme = action.payload.themeID;
        },

        /* Update the current note wallpaper */
        updateCurrentNoteWallpaper(state, action: PayloadAction<{
            /** The ID of the wallpaper */
            wallpaperID: number;
        }>){
            state.currentNoteWallpaper = action.payload.wallpaperID;
        },

        /* Update the timestamp of the current viewed note in the note editor dialog */
        updateCurrentNoteTimestamp(state, action: PayloadAction<{
            /** The formated timestamp */
            timestamp: string;
        }>){
            state.currentNoteTimestamp = action.payload.timestamp;
        },

        /* Update the current viewed note state */
        updateCurrentViewedNote(state, action: PayloadAction<{
            /** The currently viewed note */
            note: NoteProps | null
        }>){
            state.currentViewedNote = action.payload.note;
        },

        /* Update the theme and wallpaper of the currently viewed note in the note editor dialog */
        updateThemeOrWallpaperOfCurrentViewedNote(state, action: PayloadAction<{
            /** The type of update to be done (Theme or Wallpaper) */
            type: "theme" | "wallpaper",

            /** The ID of the theme */
            themeID: number,

            /** The ID of the wallpaper */
            wallpaperID: number 
        }>){
            const currentViewedNote = state.currentViewedNote;

            // Check if the current viewed note is available
            if (currentViewedNote){
                const noteState = currentViewedNote.pinned ? "pinned" : "unpinned";

                // Check if the note exists in the pinned or others notes array
                let note = noteState === "pinned" ? 
                    state.pinnedNotes.find(note => note.noteID === currentViewedNote.noteID)
                :   state.othersNotes.find(note => note.noteID === currentViewedNote.noteID)

                if (note){
                    if (action.payload.type === "theme"){ // Update the theme
                        note.bgColor = action.payload.themeID;
                    } else { // Update the wallpaper
                        note.wallpaper = action.payload.wallpaperID;
                    }
                }
            }
        }
    },
});

export const { updatePinnedNotes, updateOthersNotes, updatePinnedPage, updateOthersPage, updateNoteTheme, updateNoteWallpaper, updateSelectedNotes, clearSelectedNotes, toggleBottomSheet, toggleNoteEditorDialog, updateCurrentNoteTheme, updateCurrentNoteWallpaper, updateCurrentNoteTimestamp, updateCurrentViewedNote, updateThemeOrWallpaperOfCurrentViewedNote } = notesSlice.actions;
export default notesSlice.reducer;