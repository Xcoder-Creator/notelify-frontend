"use client";

import PlusSVG from '../svg-comp/Plus';
import Fab from '@mui/material/Fab';
import SearchSVG from '../svg-comp/Search';
import AppTooltip from '../AppTooltip';
import { useAppDispatch } from '@/store/hooks';
import { toggleNoteEditorDialog, updateCurrentNoteTimestamp } from '@/store/slices/notesSlice';
import formatNoteDate from '@/utils/notes/formatNoteDate.util';

/** 
 * This is the fab component that triggers the note editor
 * dialog for creating a new note and the search notes dialog. 
 */
export default function FabComp() {
    const dispatch = useAppDispatch();

    /**
     * Opens the appropriate dialog based on the option selected.
     * @param option - The option selected (1 for search, 2 for new note)
     * @returns void
     */
    const openDialog = async (option: number) => {
        if (option === 1) { // Open search notes dialog
            // Do nothing for now...
        } else if (option === 2) { // Open note editor dialog for making a new note
            dispatch(updateCurrentNoteTimestamp({ timestamp: formatNoteDate(new Date()) })); // Display the current timestamp in the note editor dialog
            dispatch(toggleNoteEditorDialog(true)); // Open the note editor dialog
        }
    }
    
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