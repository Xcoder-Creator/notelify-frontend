import PlusSVG from '../svg-comp/Plus';
import Fab from '@mui/material/Fab';
import SearchSVG from '../svg-comp/Search';
import AppTooltip from '../AppTooltip';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateNoteEditorDialog } from '@/store/slices/notesSlice';
import { useEffect } from 'react';
import openEditorToStartNewNote from '@/lib/note-editor/openEditorToStartNewNote';
import updateTheContentsOfTheNewNote from '@/lib/note-editor/updateTheContentsOfTheNewNote';

/** 
 * This is the fab component that triggers the 
 * note editor dialog and the search notes dialog. 
 */
export default function FabComp() {
    const dispatch = useAppDispatch();
    const editorTitle = useAppSelector((state) => state.editor.title);
    const editorContent = useAppSelector((state) => state.editor.content);
    const newNoteObject = useAppSelector((state) => state.editor.newNote);
    const newNoteEditorState = useAppSelector((state) => state.editor.newNoteEditorState); // This state tracks if the note editor is open or not for new notes

    /**
     * Opens the appropriate dialog based on the option selected.
     * @param option - The option selected (1 for search, 2 for new note)
     * @returns void
     */
    const openDialog = async (option: number) => {
        if (option === 1) { // Open search notes dialog
            // Do nothing for now...
        } else if (option === 2) { // Open note editor dialog for making a new note
            dispatch(updateNoteEditorDialog({ value: true })); // Open the note editor dialog
            await openEditorToStartNewNote(dispatch);
        }
    }

    // Update the contents of the new note when the editor title or content changes
    useEffect(() => {
        if (newNoteEditorState){
            updateTheContentsOfTheNewNote(dispatch, newNoteObject, editorTitle, editorContent);
        }
    }, [editorTitle, editorContent, newNoteEditorState]);
    
    return (
        <>
            <AppTooltip title="Search note">
                <Fab
                    onClick={() => openDialog(1)}
                    color="ochre"
                    aria-label="search note"
                    sx={{
                        position: 'fixed',
                        bottom: 110,
                        right: 20,
                        color: 'var(--fab-text)',
                        backgroundColor: 'var(--fab-background)',
                        zIndex: 776,
                        "&:hover": {
                            backgroundColor: "var(--fab-background)"
                        },
                    }}
                >
                    <SearchSVG />
                </Fab>
            </AppTooltip>
            
            <AppTooltip title="New note">
                <Fab
                    onClick={() => openDialog(2)}
                    color="ochre"
                    aria-label="new note"
                    sx={{
                        position: 'fixed',
                        bottom: 40,
                        right: 20,
                        color: 'var(--fab-text)',
                        backgroundColor: 'var(--fab-background)',
                        zIndex: 776,
                        "&:hover": {
                            backgroundColor: "var(--fab-background)"
                        }
                    }}
                >
                    <PlusSVG />
                </Fab>
            </AppTooltip>
        </>
    );
}