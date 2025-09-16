"use client";

import images_display_styles from './ImagesDisplay.module.css';
import TrashFilledSVG from '../svg-comp/TrashFilled';
import removeImage from '@/lib/note-editor/removeImage';
import { useAppDispatch } from '@/store/hooks';
import ImagesDisplayProps from '@/types/note-editor/images-display.types';
import AppTooltip from '../AppTooltip';

/**
 * This component displays the selected images to be attached
 * to the note editor when creating a note.
 */
export default function ImagesDisplay({ selectedImages, setSelectedImages }: ImagesDisplayProps){
    const dispatch = useAppDispatch();

    return (
        <div className={images_display_styles.image_display_container}>
            {
                selectedImages.map((image, index) => (
                    <div key={index} className={`${images_display_styles.selected_image_container}  ${index === 0 && selectedImages.length > 2 ? images_display_styles.full : ""}`}>
                        <img className={images_display_styles.selected_image} width={500} height={500} src={URL.createObjectURL(image)} alt="" />

                        <AppTooltip title="Remove image" >
                            <button onClick={() => removeImage(dispatch, index, selectedImages, setSelectedImages)} className={images_display_styles.delete_image_button}>
                                <TrashFilledSVG className={images_display_styles.trash_filled_icon} />
                            </button>
                        </AppTooltip>
                    </div>
                ))
            }
        </div>
    );
}