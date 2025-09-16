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

    /** The state of the undo action */
    undo: boolean;

    /** The state of the redo action */
    redo: boolean;

    /** The state setter for the undo action (from useState) */
    setUndo: Dispatch<SetStateAction<boolean>>;

    /** The state setter for the redo action (from useState) */
    setRedo: Dispatch<SetStateAction<boolean>>;
}

export default NoteEditorDialogHeaderProps;