/**
 * Interface for the formatting options toolbar redux state
 */
interface FormattingOptionsToolbarReduxStateProps {
    /** The state of the formatting options toolbar, open or closed */
    state: boolean;

    /** The theme ID of the formatting options toolbar */ 
    theme: number;

    /** The state of the header one formatting option */
    headerOne: boolean;

    /** The state of the header two formatting option */
    headerTwo: boolean;

    /** The state of the normal text formatting option */
    normalText: boolean;
    
    /** The state of the bold formatting option */
    bold: boolean;

    /** The state of the italic formatting option */
    italic: boolean;

    /** The state of the underline formatting option */
    underline: boolean;
}

export default FormattingOptionsToolbarReduxStateProps;