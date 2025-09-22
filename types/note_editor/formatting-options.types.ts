/** Interface representing the formatting options */
interface FormattingOptions {
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

export default FormattingOptions;