/**
 * Interface for the snackbar component
 */
export interface SnackbarProps {
    /**
     * The number of milliseconds to wait before automatically calling the onClose function. 
     * onClose should then set the state of the open prop to hide the Snackbar. 
     * This behavior is disabled by default with the null value.
     */
    autoHideDuration: number | null | undefined;

    /** Vertical alignment of the snackbar */
    vertical: "bottom" | "top";

    /** Horizontal alignment of the snackbar */
    horizontal: "center" | "left" | "right";

    /** The undo button of the snackbar */
    undoBtn: boolean;
}