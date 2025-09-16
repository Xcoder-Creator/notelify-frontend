/**
 * Interface for the snackbar redux state
 */
interface SnackbarReduxStateProps {
    /** The open state of the snackbar */
    open: boolean;

    /** The message text/string to be displayed in the snackbar */
    msg: string;
}

export default SnackbarReduxStateProps;