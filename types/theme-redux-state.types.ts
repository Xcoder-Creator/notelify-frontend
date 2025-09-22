/** 
 * Interface for the theme redux state 
 */
export interface ThemeReduxStateProps {
    /** A state property for keeping track of the theme of the web app */
    theme: "dark" | "light";
}