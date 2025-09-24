import { Editor } from "@tiptap/react";
import { Dispatch, SetStateAction } from "react";

/**
 * Interface for the note editor dialog header
 */
interface NoteEditorDialogHeaderProps {
    /** The Tiptap editor instance */
    editor: Editor | null;

    /** The state of the note editor dialog wether its opened(true) or closed(false) */
    dialogComp: boolean | null;
    
    /** The state setter for the note editor dialog */
    setDialogComp: Dispatch<SetStateAction<boolean>> | null;
}

export default NoteEditorDialogHeaderProps;