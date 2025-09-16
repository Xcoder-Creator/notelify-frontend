import { EditorState } from '@tiptap/pm/state';
import { history } from '@tiptap/pm/history';
import { Editor } from '@tiptap/react';

/**
 * Clear the editor history and content
 * @param editor - Tiptap editor instance
 * @return void
 */
const resetEditor = (editor: Editor | null) => {
      if (!editor) return   // <--- guard
     editor.commands.setContent('');

    // The following code clears the history. Hopefully without side effects.
    const newEditorState = EditorState.create({
        doc: editor.state.doc,
        plugins: editor.state.plugins,
        schema: editor.state.schema
    });
    editor.view.updateState(newEditorState);
    // unregister and re-register history plugin to clear data when fetching new content
      editor.unregisterPlugin('history');
}

export default resetEditor;