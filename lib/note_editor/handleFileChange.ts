import React, { RefObject, SetStateAction } from "react";
import { updateMsg, updateOpen } from "@/store/slices/snackbarSlice";
import { store } from "@/store";

/**
 * This method is called when the file dialog closes after image selection.
 * @param e - The event for a HTML input element
 * @param fileInputRef - The reference of the file input
 * @param setSelectedImages - The set state action method to update the selected images state
 * @return void
 */
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileInputRef: RefObject<HTMLInputElement | null>, setSelectedImages: (value: SetStateAction<File[]>) => void) => {
    const files = Array.from(e.target.files ?? []); // Get all the images if available and create an array from it
    const MAX_FILES = 20; // The maximum number of images that can be attached to a note
    
    // Check if the images that the user selected exceeds the maximum images limit
    if (files.length > MAX_FILES){
        store.dispatch(updateMsg(`You can only select up to ${MAX_FILES} files.`));
        store.dispatch(updateOpen(true));
        fileInputRef.current ? fileInputRef.current.value = '' : null;
        return;
    }

    // Check if the user selected any images
    if (files.length !== 0){
        setSelectedImages(files);
    }
}

export default handleFileChange;