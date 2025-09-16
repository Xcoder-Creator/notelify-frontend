import { NotesReduxStateProps, NoteProps, UpdateSelectedNotesProps } from '@/types/notes/notes-redux-state.types';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface for the update note theme reducer
 */
interface UpdateNoteThemeReducerProps {
    /** The ID of the theme that the user selected */
    themeID: number;
}

/**
 * Interface for the update note wallpaper reducer
 */
interface UpdateNoteWallpaperReducerProps {
    /** The ID of the theme that the user selected */
    wallpaperID: number;
}

/**
 * Interface for the update note editor dialog reducer
 */
interface UpdateNoteEditorDialogReducerProps {
    /** The state of the note editor dialog */
    value: boolean;
}

/**
 * Interface for the note editor dialog content
 */
interface UpdateNoteEditorDialogTitleAndContentReducerProps {
    /** 
     * The title string of a note to be displayed in the
     * note editor dialog
     */
    title: string | null;

    /** 
     * The html content string to be displayed in the 
     * note editor dialog for editing
     */
    content: string | null;
}

/**
 * Interface for the toggle menu state reducer
 */
interface ToggleDialogMenuStateReducerProps {
    /** The value for updating the state of the dialog menu */
    value: boolean;
}

/**
 * Interface for the toggle dialog bottom sheet reducer
 */
interface ToggleDialogBottomSheetReducerProps {
    /** The value for updating the state of the dialog bottom sheet */
    value: boolean;
}

const initialState: NotesReduxStateProps = {
    notes: [
        {
            id: 1,
            title: 'This is a note',
            notecontent: '<p>I just created a new note on notelify 🔥</p>',
            isPinned: true,
            bgThemeID: 1,
            wallpaperID: 1,
            createdTimestamp: 'Yesterday, 9:25 PM',
            editedTimestamp: 'Edited Yesterday, 9:25 PM'
        },

        {
            id: 2,
            title: 'Project reminder this is really good guys',
            notecontent: '<p>This is just a note to remind me that i have a project to work on</p>',
            isPinned: true,
            bgThemeID: 2,
            wallpaperID: 2,
            createdTimestamp: '9th Dec, 2024',
            editedTimestamp: 'Edited 11th Dec, 2024'
        },

        {
            id: 3,
            title: 'Project reminder',
            notecontent: '<p>This is just a note to remind me that i have a project to work on</p>',
            isPinned: true,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '9th Dec, 2024',
            editedTimestamp: 'Edited 11th Dec, 2024'
        },

        {
            id: 4,
            title: 'This is a note',
            notecontent: '<p>I just created a new note on notelify 🔥</p>',
            isPinned: true,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '13th Dec, 2024',
            editedTimestamp: 'Edited 15th Dec, 2024'
        },

        {
            id: 5,
            title: 'Project reminder',
            notecontent: '<p>This is just a note to remind me that i have a project to work on</p>',
            isPinned: true,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '9th Dec, 2024',
            editedTimestamp: 'Edited 11th Dec, 2024'
        },

        {
            id: 6,
            title: 'Project reminder',
            notecontent: '<p>This is just a note to remind me that i have a project to work on</p>',
            isPinned: true,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '9th Dec, 2024',
            editedTimestamp: 'Edited 11th Dec, 2024'
        },

        {
            id: 7,
            title: 'This is a note',
            notecontent: '<p>I just created a new note on notelify 🔥</p>',
            isPinned: true,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '13th Dec, 2024',
            editedTimestamp: 'Edited 15th Dec, 2024'
        },

        {
            id: 8,
            title: 'Project reminder',
            notecontent: '<p>This is just a note to remind me that i have a project to work on</p>',
            isPinned: true,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '9th Dec, 2024',
            editedTimestamp: 'Edited 11th Dec, 2024'
        },

        {
            id: 9,
            title: 'Project reminder',
            notecontent: '<p>This is just a note to remind me that i have a project to work on</p>',
            isPinned: true,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '9th Dec, 2024',
            editedTimestamp: 'Edited 11th Dec, 2024'
        },

        {
            id: 10,
            title: 'TGIF!',
            notecontent: '<p>Thank God its Fridayyy</p>',
            isPinned: true,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '22nd Dec, 2024',
            editedTimestamp: 'Edited 15th Jan, 2025'
        },

        {
            id: 11,
            title: 'Sporty odds',
            notecontent: `<p>Let’s make it B2B 
            87 odds mrbanks0_4
            23 odds mrbanks0_5
            Load like this on sporty</p>`,
            isPinned: true,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '22nd Dec, 2024',
            editedTimestamp: 'Edited 15th Jan, 2025'
        },

        {
            id: 12,
            title: 'How GPUs work',
            notecontent: `<p>In order to run the most realistic looking video games, 
            you need a graphics card that can perform 
            36 trillion calculations per second</p>`,
            isPinned: true,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '22nd Dec, 2024',
            editedTimestamp: 'Edited 15th Jan, 2025'
        },

        {
            id: 13,
            title: 'Tallest building in the world',
            notecontent: '<p>The tallest building in the world is Burj Khalifa in Dubai, United Arab Emirates. It is 828 meters tall.</p>',
            isPinned: true,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '22nd Dec, 2024',
            editedTimestamp: 'Edited 15th Jan, 2025'
        },

        {
            id: 14,
            title: 'My diary',
            notecontent: '<p>This is my personal diary on notelify</p>',
            isPinned: false,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '2nd Nov, 2024',
            editedTimestamp: 'Edited 5th Nov, 2024'
        },

        {
            id: 15,
            title: 'A simple note to myself',
            notecontent: '<p>Remember you are the greatest of all time</p>',
            isPinned: false,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '14th Oct, 2024',
            editedTimestamp: 'Edited 20th Oct, 2024'
        },

        {
            id: 16,
            title: 'A simple note to myself',
            notecontent: '<p>Remember you are the greatest of all time</p>',
            isPinned: false,
            bgThemeID: 0,
            wallpaperID: 0,
            createdTimestamp: '14th Oct, 2024',
            editedTimestamp: 'Edited 20th Oct, 2024'
        },
    ],

    notesSelected: [],

    currentDeselectedNoteID: null,

    noteEditorDialog: false,

    noteEditorDialogTitle: '',

    noteEditorDialogContent: '',

    dialogDropdownMenu: false,

    dialogBottomSheet: false
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        /* Store the fetched notes in the notes state property */
        setNotes(state, action: PayloadAction<Array<NoteProps>>) {
            state.notes = action.payload;
        },

        /* Update the notes state property by appending more fetched notes to it */
        updateNotes(state, action: PayloadAction<NoteProps>) {
            state.notes.push(action.payload);
        },

        /* 
            Update the selected notes array state property by either adding a new selected note
            or deselecting an already selected note
        */
        updateSelectedNotes(state, action: PayloadAction<UpdateSelectedNotesProps>){
            if (action.payload.action === 'select'){ // Check if the user is trying to select a note
                // Push the ID of the note into the notes selected array state property
                state.notesSelected.push({
                    id: action.payload.noteID,
                    index: action.payload.index
                });
            } else if (action.payload.action === 'deselect'){ // Check if the user is trying to deselect a note
                // Loop through the selected notes and remove the note that the user wants to deselect
                for (const [i, note] of state.notesSelected.entries()) {
                    if (note.id === action.payload.noteID){
                        state.notesSelected.splice(i, 1);
                        state.currentDeselectedNoteID = action.payload.noteID;
                    }
                }
            }
        },

        /* Update the theme of all the selected notes */
        updateNoteTheme(state, action: PayloadAction<UpdateNoteThemeReducerProps>){
            // Loop through the selected notes and update them with the selected theme by the user
            for (const [i, selectedNote] of state.notesSelected.entries()) {
                let getNoteIndex = state.notes.findIndex(note => note.id === selectedNote.id); // Get the index of the note
                if (getNoteIndex !== -1){
                    state.notes[getNoteIndex].bgThemeID = action.payload.themeID;
                }
            }
        },

        /* Update the theme of all the selected notes */
        updateNoteWallpaper(state, action: PayloadAction<UpdateNoteWallpaperReducerProps>){
            // Loop through the selected notes and update them with the selected wallpaper by the user
            for (const [i, selectedNote] of state.notesSelected.entries()) {
                let getNoteIndex = state.notes.findIndex(note => note.id === selectedNote.id); // Get the index of the note
                if (getNoteIndex !== -1){
                    state.notes[getNoteIndex].wallpaperID = action.payload.wallpaperID;
                }
            }
        },

        /* Clear all selected notes */
        clearSelectedNotes(state, action: PayloadAction<void>){
            state.notesSelected = [];
            state.currentDeselectedNoteID = null;
        },

        /* Update the state of the note editor dialog */
        updateNoteEditorDialog(state, action: PayloadAction<UpdateNoteEditorDialogReducerProps>){
            state.noteEditorDialog = action.payload.value;
        },

        /* Update the content of the note editor dialog */
        updateNoteEditorDialogTitleAndContent(state, action: PayloadAction<UpdateNoteEditorDialogTitleAndContentReducerProps>){
            state.noteEditorDialogTitle = action.payload.title;
            state.noteEditorDialogContent = action.payload.content;
        },

        /* Toggle the state of the dropdown menu for the note editor dialog */
        toggleDialogMenuState(state, action: PayloadAction<ToggleDialogMenuStateReducerProps>) {
            state.dialogDropdownMenu = action.payload.value;
        },

        /* Toggle the state of the bottom sheet for the note editor dialog */
        toggleDialogBottomSheet(state, action: PayloadAction<ToggleDialogBottomSheetReducerProps>) {
            state.dialogBottomSheet = action.payload.value;
        }
    },
});

export const { setNotes, updateNotes, updateSelectedNotes, updateNoteTheme, updateNoteWallpaper, clearSelectedNotes, updateNoteEditorDialog, updateNoteEditorDialogTitleAndContent, toggleDialogMenuState, toggleDialogBottomSheet } = notesSlice.actions;
export default notesSlice.reducer;