"use client";

import { useAppSelector } from "@/store/hooks";
import note_styles from './NotesLayout.module.css';
import Masonry from 'react-masonry-css';
import masonryBreakpoints from "@/utils/masonryBreakpoints.util";
import NoNotesIllustrationSVG from "@/components/svg-comp/NoNotesIllustration";
import PlusSVG from "@/components/svg-comp/Plus";
import NoteCard from "./NoteCard";

/** This component renders the notes in a masonry layout */
export default function NotesLayout() {
    const pinnedNotes = useAppSelector((state) => state.notes.pinnedNotes); // The pinned notes
    const otherNotes = useAppSelector((state) => state.notes.othersNotes); // The non pinned notes
    const theme = useAppSelector((state) => state.theme.theme); // The app theme

    return (
        <>
            {
                // This is the pinned notes section
                pinnedNotes.length > 0 ? (
                    <div className={note_styles.pinned_section}>
                        {
                            otherNotes.length > 0 ?
                                <div className={note_styles.section_label}>
                                    <p className={note_styles.section_label_text}>PINNED</p>
                                </div>
                            :   null
                        }

                        <Masonry breakpointCols={masonryBreakpoints} columnClassName={note_styles.my_masonry_grid_column} className={note_styles.notes_grid}>
                            {
                                pinnedNotes.map((note, index) => (
                                    <NoteCard
                                        key={note.noteID}
                                        note={note}
                                        index={index}
                                    />
                                ))
                            }
                        </Masonry>
                    </div>
                ) : null
            }

            {
                // This is the other/unpinned notes section
                otherNotes.length > 0 ? (
                    <div className={note_styles.others_section}>
                        {
                            pinnedNotes.length > 0 ?
                                <div className={note_styles.section_label}>
                                    <p className={note_styles.section_label_text}>OTHERS</p>
                                </div>
                            :   null
                        }

                        <Masonry breakpointCols={masonryBreakpoints} columnClassName={note_styles.my_masonry_grid_column} className={note_styles.notes_grid}>
                            {
                                otherNotes.map((note, index) => (
                                    <NoteCard
                                        key={note.noteID}
                                        note={note}
                                        index={index}
                                    />
                                ))
                            }
                        </Masonry>
                    </div>
                ) : null 
            }

            {
                pinnedNotes.length === 0 && otherNotes.length === 0 ?
                    <div className={note_styles.illustration_section}>
                        <NoNotesIllustrationSVG className={note_styles.illustration_image} />
                        <p className={note_styles.illustration_title}>No notes yet</p>
                        <p className={note_styles.illustration_desc}>Your notes will appear here once you create them.</p>
                        <button className={note_styles.illustration_btn}>
                            <PlusSVG className={note_styles.illustration_btn_icon} />
                            <span className={note_styles.illustration_btn_txt}>Create note</span>
                        </button>
                    </div>
                :   null
            }
        </>        
    );
}