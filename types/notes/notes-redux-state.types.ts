/** Interface for each note */
export interface NoteProps {
    /** The ID of the note */
    noteID: string;

    /** The ID of the user who created the note */
    userID: number;

    /** The title of the note */
    title: string;

    /** The content of the note in the form of a html string */
    content: string;

    /** Whether the note is a draft or not */
    isDraft: boolean;

    /** Whether the note is pinned or not */
    pinned: boolean;

    /** The ID of the background theme for the note if available */
    bgColor: number,
    
    /** The ID of the wallpaper for the note if available */
    wallpaper: number,

    /** The timestamp at which the note was created */
    createdAt: string;

    /** The timestamp at which the note was edited after creation */
    updatedAt: string;

    /** The array of attachments for the note */
    attachments: Array<{
        /** The ID of the attachment */
        attachmentID: number;

        /** The URL of the attachment */
        fileURL: string;

        /** The type of the attachment */
        fileType: string;
    }>;
}

export interface UpdateSelectedNotesProps {
    /** To know if the user is selecting (select) or deselecting (deselect) a note */
    action: "select" | "deselect" ;

    /** The ID of the note that the user is either selecting or deselecting */
    noteID: string;
}

/** Interface for the notes redux state */
export interface NotesReduxStateProps {
    /** The users pinned notes */
    pinnedNotes: Array<NoteProps>;

    /** The users other notes (Notes that are not pinned) */
    othersNotes: Array<NoteProps>;

    /** The pinned page number */
    pinnedPage: number;

    /** The others page number */
    othersPage: number;

    /** The page size */
    pageSize: number;

    /** An array that keeps track of all the selected notes */
    notesSelected: Array<{
        /** The ID of the selected note */
        noteID: string;
    }>;

    /** The ID of the note that was currently deselected */
    currentDeselectedNoteID: null | string;

    /** The state of the bottomsheet */
    bottomSheet: boolean;

    /** The note editor dialog */
    noteEditorDialog: boolean;

    /** The theme of the current note in view */
    currentNoteTheme: number;

    /** The wallpaper of the current note in view */
    currentNoteWallpaper: number;

    /** The formated timestamp of the current viewed note in the note editor dialog */
    currentNoteTimestamp: string;

    /** The currently viewed note in the note editor dialog */
    currentViewedNote: NoteProps | null; 
}