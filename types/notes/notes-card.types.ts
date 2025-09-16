import { RefObject } from "react";
import { NoteProps } from "./notes-redux-state.types";

/**
 * Interface for the notes card component
 */
interface NotesCardProps {
    /** The structure for each note */
    note: NoteProps;

    /** The index position of the note */
    index: number;

    /** The theme of the app */
    theme: string;
}

export default NotesCardProps;