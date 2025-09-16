"use client";

import { useAppSelector } from "@/store/hooks";
import note_styles from './Notes.module.css';
import NoteCard from "./NoteCard";
import Masonry from 'react-masonry-css'
import masonryBreakpoints from "@/utils/masonryBreakpoints.util";

/** This component renders the notes in a grid masonry layout */
export default function NotesGrid() {
    const notes = useAppSelector((state) => state.notes.notes); // All the users notes
    const pinnedNotes = notes.filter(note => note.isPinned); // The pinned notes
    const otherNotes = notes.filter(note => !note.isPinned); // The non pinned notes
    const theme = useAppSelector((state) => state.theme.theme); // The app theme

    return (
        <>
            {
                pinnedNotes.length > 0 && (
                    <div className={note_styles.pinned_section}>
                        <div className={note_styles.section_label}>
                            <p className={note_styles.section_label_text}>PINNED</p>
                        </div>

                        <Masonry breakpointCols={masonryBreakpoints} columnClassName={note_styles.my_masonry_grid_column} className={note_styles.notes_grid}>
                            {
                                pinnedNotes.map((note, index) => (
                                    <NoteCard
                                        key={`note-${note.id}`}
                                        note={note}
                                        index={index}
                                        theme={theme}
                                    />
                                ))
                            }
                        </Masonry>
                    </div>
                ) 
            }

            {
                otherNotes.length > 0 && (
                    <div className={note_styles.others_section}>
                        <div className={note_styles.section_label}>
                            <p className={note_styles.section_label_text}>OTHERS</p>
                        </div>

                        <Masonry breakpointCols={masonryBreakpoints} columnClassName={note_styles.my_masonry_grid_column} className={note_styles.notes_grid}>
                            {
                                otherNotes.map((note, index) => (
                                    <NoteCard
                                        key={`note-${note.id}`}
                                        note={note}
                                        index={index}
                                        theme={theme}
                                    />
                                ))
                            }
                        </Masonry>
                    </div>
                ) 
            }
        </>        
    );
}