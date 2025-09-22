import { store } from "@/store";
import { updateMsg, updateOpen } from "@/store/slices/snackbarSlice";
import { Dispatch, SetStateAction } from "react";

/**
 * Remove the selected image from the editor.
 * @param index - The index position of the image to remove
 * @param selectedImages - The array of selected images
 * @param setSelectedImages - The use state set method to update the selected images array
 * @return void
 */
const removeImage = (index: number, selectedImages: File[], setSelectedImages: Dispatch<SetStateAction<File[]>>) => {
    const newSelectedImages = selectedImages.filter((_, i) => i !== index); // Filter out the image that the user wants to remove
    setSelectedImages(newSelectedImages); // Update the selected images array
    store.dispatch(updateMsg('Image deleted')); // Set a new message for the snackbar
    store.dispatch(updateOpen(true)); // Display the snackbar
}

export default removeImage;