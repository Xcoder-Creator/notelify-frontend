import { Editor } from '@tiptap/react';

/**
 * Interface for the editor placeholder component
 */
interface EditorPlaceholderProps {
    /** The editor instance */
    editor: Editor | null;

    /** Ref for the note editor placeholder container */
    noteEditorPlaceholderRef: React.RefObject<HTMLDivElement | null>;
}

export default EditorPlaceholderProps;