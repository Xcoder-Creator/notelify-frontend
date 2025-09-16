import { Dispatch, RefObject, SetStateAction } from "react";

/**
 * Interface for the background toolbar in the note editor
 */
interface NoteEditorBackgroundToolbarProps {
    /** The state that controls the visibility of the background toolbar */
    backgroundToolbarDisplay: boolean;

    /** The state setter for the background toolbar used to toggle its visibility */
    setBackgroundToolbarDisplay: Dispatch<SetStateAction<boolean>>;

    /** The reference to the background toolbar */
    backgroundToolbarRef: RefObject<HTMLDivElement | null>;

    /** The reference to the background options button */
    backgroundOptionsButtonRef: RefObject<HTMLButtonElement | null>;

    /** The reference to the note editor and placeholder container */
    noteEditorAndPlaceholderRef: RefObject<HTMLDivElement | null>;

    /** The reference to the note editor and title input div container */
    noteEditorAndTitleInputRef: RefObject<HTMLDivElement | null>;
}

export default NoteEditorBackgroundToolbarProps;