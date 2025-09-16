/**
 * Interface for the formatting options block redux state
 */
interface FormattingOptionsBlockReduxStateProps {
    /** The state of the formatting options block, open or closed */
    state: boolean;

    /** The theme ID of the formatting options block */ 
    theme: number;
}

export default FormattingOptionsBlockReduxStateProps;