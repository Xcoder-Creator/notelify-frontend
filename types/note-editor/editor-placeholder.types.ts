import { Dispatch, SetStateAction } from "react";
import { Editor } from '@tiptap/react';

/**
 * Interface for the editor placeholder component
 */
interface EditorPlaceholderProps { 
    /** The editor instance */
    editor: Editor | null;

    /** Function to handle placeholder input focus */
    handlePlaceholderInputFocus: (setIsFocused: Dispatch<SetStateAction<boolean>>, editor: Editor | null) => void;

    /** Ref for the note editor and placeholder container */
    noteEditorAndPlaceholderRef: React.RefObject<HTMLDivElement | null>;
    
    /** State setter for the focused state */
    setIsFocused: Dispatch<SetStateAction<boolean>>;
}

export default EditorPlaceholderProps;