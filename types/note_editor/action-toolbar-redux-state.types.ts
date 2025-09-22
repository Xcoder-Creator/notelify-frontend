/**
 * Interface for the action toolbar redux state
 */
interface ActionToolbarReduxStateProps {
    /** The state of the formatting options button */
    formattingOptionsButton: boolean | string;

    /** The state of the undo button */
    undo: boolean;

    /** The state of the redo button */
    redo: boolean;

    /** The state of the dropdown menu */
    dropdownMenu: boolean;
}

export default ActionToolbarReduxStateProps;