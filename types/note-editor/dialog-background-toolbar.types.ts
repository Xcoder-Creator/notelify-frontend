import { RefObject } from "react";

/**
 * Interface for the background toolbar in the note editor dialog
 */
interface DialogBackgroundToolbarProps {
    /** The reference to the background toolbar */
    backgroundToolbarRef: RefObject<HTMLDivElement | null>;

    /** The reference to the background options button */
    backgroundOptionsButtonRef: RefObject<HTMLButtonElement | null>;
}

export default DialogBackgroundToolbarProps;