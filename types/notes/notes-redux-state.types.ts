/** Interface for each note */
export interface NoteProps {
    /** The ID of the note */
    id: number;

    /** The title of the note */
    title: string;

    /** The content of the note in the form of a html string */
    notecontent: string;

    /** Wether the note is pinned or not */
    isPinned: boolean;

    /** The ID of the background theme for the note if available */
    bgThemeID: number,
    
    /** The ID of the wallpaper for the note if available */
    wallpaperID: number,

    /** The timestamp at which the note was created */
    createdTimestamp: string;

    /** The timestamp at which the note was edited after creation */
    editedTimestamp: string | null;
}

export interface UpdateSelectedNotesProps {
    /** To know if the user is selecting (select) or deselecting (deselect) a note */
    action: string;

    /** The ID of the note that the user is either selecting or deselecting */
    noteID: number;

    /** Index of the selected note */
    index: number;
}

/** Interface for the selected note */
interface SelectedNoteProps {
    /** The ID of the selected note */
    id: number;

    /** Index of the selected note */
    index: number; 
}

/** Interface for the notes redux state */
export interface NotesReduxStateProps {
    /** The users notes */
    notes: Array<NoteProps>;

    /** An array that keeps track of all the selected notes */
    notesSelected: Array<SelectedNoteProps>;

    /** The ID of the note that was currently deselected */
    currentDeselectedNoteID: null | number;

    /** The state of the note editor dialog */
    noteEditorDialog: boolean;

    /** 
     * The title string of a note to be displayed in the
     * note editor dialog
     */
    noteEditorDialogTitle: string | null;

    /** 
     * The html content of a note to be rendered in the
     * note editor dialog
     */
    noteEditorDialogContent: string | null;

    /** The state of the dropdown menu for the note editor dialog */
    dialogDropdownMenu: boolean;

    /** The state of the bottom sheet for the note editor dialog */
    dialogBottomSheet: boolean;
}