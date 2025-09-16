/**
 * Interface for an attachment object
 */
export interface Attachment {
    /** The ID of the attachment */
    id: string;

    /** The url of the attachment */
    fileurl: string;

    /** The type of attachment */
    filetype: string;

    /** The size of the attachment */
    filesize: number;

    /** The timestamp at which the attachment was uploaded */
    uploadedAt: string;
}

/** 
 * Interface for a new note object
 */
export interface NewNote {
    /** The ID of the new note (temporary for now) */
    id: string;

    /** The title of the new note */
    title: string;

    /** The content of the new note */
    notecontent: string;

    /** Is the note pinned or not */
    isPinned: boolean;

    /** The selected background theme of the note */
    bgThemeID: number;

    /** The selected wallpaper of the note */
    wallpaperID: number;

    /** The media attachments added to the note */
    attachments: Array<Attachment>

    /** The synced state of the note (whether it's synced with the server or not) */
    synced: boolean;

    /** The timestamp at which the note was created */
    createdTimestamp: string;

    /** The timestamp at which the note was edited */
    editedTimestamp: string;
}

/**
 * Interface for the editor redux state
 */
export interface EditorReduxStateProps { 
    /** The title text of the note content in the editor */
    title: string;

    /** The editor note content */
    content: string;

    /** The new note object */
    newNote: Record<string, never> | NewNote;

    /** The timestamp for when the current note in the note editor dialog was edited */
    noteEditedTimestamp: string | null;

    /** The state of the new note editor when it comes to creating a new note */
    newNoteEditorState: boolean;

    /** The current selected images from the action toolbar */
    selectedImages: File[];

    /** The state of the formatting options button */
    formattingOptionsButton: boolean | string;
}