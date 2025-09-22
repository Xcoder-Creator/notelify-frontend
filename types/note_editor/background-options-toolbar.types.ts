import { RefObject } from "react";

/**
 * Interface for the background options toolbar in the note editor
 */
interface NoteEditorBackgroundOptionsToolbarProps {
    /** The reference to the background options button */
    backgroundOptionsButtonRef: RefObject<HTMLButtonElement | null>;

    /** The reference to the background options toolbar */
    backgroundOptionsToolbarRef: RefObject<HTMLDivElement | null>;

    /** The reference to the note editor placeholder */
    noteEditorPlaceholderRef: RefObject<HTMLDivElement | null>;

    /** The ref of the note editor and title input */
    noteEditorAndTitleInputRef: RefObject<HTMLDivElement | null>;
}

export default NoteEditorBackgroundOptionsToolbarProps;