"use client";

import BoldSVG from '../svg-comp/Bold';
import ClearFormattingSVG from '../svg-comp/ClearFormatting';
import HeaderOneSVG from '../svg-comp/HeaderOne';
import HeaderTwoSVG from '../svg-comp/HeaderTwo';
import ItalicSVG from '../svg-comp/Italic';
import LetterCaseSVG from '../svg-comp/LetterCase';
import UnderlineSVG from '../svg-comp/Underline';
import note_editor_styles from './NoteEditor.module.css';
import FormattingOptionsBlockProps from '@/types/note-editor/formatting-options-block.types';
import toggleFormattingOptions from '@/lib/note-editor/toggleFormattingOptions';
import { useAppSelector } from '@/store/hooks';
import AppTooltip from '../AppTooltip';
import backgroundThemes from '@/utils/background-toolbar/backgroundThemes.util';

/**
 * This component renders the formatting options block in the note editor.
 * It includes buttons for different text formatting options such as headings, bold, italic, underline, and clear formatting.
 */
export default function FormattingOptionsBlock({ editor, headerOne, headerTwo, normalText, bold, italic, underline, setHeaderOne, setHeaderTwo, setNormalText, setBold, setItalic, setUnderline }: FormattingOptionsBlockProps) {
    const backgroundTheme = useAppSelector((state) => state.formattingOptionsBlock.theme); // The theme of the formatting options block
    const themeState = useAppSelector((state) => state.theme.theme); // The apps theme

    return (
        <div className={note_editor_styles.formatting_options_container} style={{ backgroundColor: backgroundTheme === 0 ? "var(--background)" : themeState === "dark" ? backgroundThemes.find(theme => theme.id === backgroundTheme)?.theme : backgroundThemes.find(theme => theme.id === backgroundTheme)?.lightTheme }}>
            <AppTooltip title="Heading 1" >
                <button onClick={() => toggleFormattingOptions(1, editor, bold, italic, underline, setHeaderOne, setHeaderTwo, setNormalText, setBold, setItalic, setUnderline)} className={[note_editor_styles.editor_action_button, headerOne ? note_editor_styles.active : ''].join(' ')}>
                    <HeaderOneSVG className={note_editor_styles.editor_action_icon} />
                </button>
            </AppTooltip>

            <AppTooltip title="Heading 2" >
                <button onClick={() => toggleFormattingOptions(2, editor, bold, italic, underline, setHeaderOne, setHeaderTwo, setNormalText, setBold, setItalic, setUnderline)} className={[note_editor_styles.editor_action_button, headerTwo ? note_editor_styles.active : ''].join(' ')}>
                    <HeaderTwoSVG className={note_editor_styles.editor_action_icon} />
                </button>
            </AppTooltip>

            <AppTooltip title="Normal" >
                <button onClick={() => toggleFormattingOptions(3, editor, bold, italic, underline, setHeaderOne, setHeaderTwo, setNormalText, setBold, setItalic, setUnderline)} className={[note_editor_styles.editor_action_button, normalText ? note_editor_styles.active : ''].join(' ')}>
                    <LetterCaseSVG className={note_editor_styles.editor_action_icon} />
                </button>
            </AppTooltip>

            <div className={note_editor_styles.editor_action_divider}></div>

            <AppTooltip title="Bold" >
                <button onClick={() => toggleFormattingOptions(4, editor, bold, italic, underline, setHeaderOne, setHeaderTwo, setNormalText, setBold, setItalic, setUnderline)} className={[note_editor_styles.editor_action_button, bold ? note_editor_styles.active : ''].join(' ')}>
                    <BoldSVG className={note_editor_styles.editor_action_icon} />
                </button>
            </AppTooltip>

            <AppTooltip title="Italic" >
                <button onClick={() => toggleFormattingOptions(5, editor, bold, italic, underline, setHeaderOne, setHeaderTwo, setNormalText, setBold, setItalic, setUnderline)} className={[note_editor_styles.editor_action_button, italic ? note_editor_styles.active : ''].join(' ')}>
                    <ItalicSVG className={note_editor_styles.editor_action_icon} />
                </button>
            </AppTooltip>

            <AppTooltip title="Underline" >
                <button onClick={() => toggleFormattingOptions(6, editor, bold, italic, underline, setHeaderOne, setHeaderTwo, setNormalText, setBold, setItalic, setUnderline)} className={[note_editor_styles.editor_action_button, underline ? note_editor_styles.active : ''].join(' ')}>
                    <UnderlineSVG className={note_editor_styles.editor_action_icon} />
                </button>
            </AppTooltip>

            <AppTooltip title="Clear formatting" >
                <button onClick={() => toggleFormattingOptions(7, editor, bold, italic, underline, setHeaderOne, setHeaderTwo, setNormalText, setBold, setItalic, setUnderline)} className={note_editor_styles.editor_action_button}>
                    <ClearFormattingSVG className={note_editor_styles.editor_action_icon} />
                </button>
            </AppTooltip>
        </div>
    );
}