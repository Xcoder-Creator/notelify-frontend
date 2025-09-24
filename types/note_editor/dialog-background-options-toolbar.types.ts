import { RefObject } from "react";

/**
 * Interface for the background options toolbar in the note editor dialog
 */
interface DialogBackgroundOptionsToolbarProps {
    /** The reference to the background options toolbar */
    backgroundOptionsToolbarRef: RefObject<HTMLDivElement | null>;

    /** The reference to the background options button */
    backgroundOptionsButtonRef: RefObject<HTMLButtonElement | null>;
}

export default DialogBackgroundOptionsToolbarProps;