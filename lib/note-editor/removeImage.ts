import { AppDispatch } from "@/store";
import { updateMsg, updateOpen } from "@/store/slices/snackbarSlice";
import { Dispatch, SetStateAction } from "react";

/**
 * Remove the selected image from the editor
 * @param dispatch - The dispatch method for redux
 * @param index - The index position of the image to remove
 * @param selectedImages - The array of selected images
 * @param setSelectedImages - The use state set method to update the selected images array
 * @return void
 */
const removeImage = (dispatch: AppDispatch, index: number, selectedImages: File[], setSelectedImages: Dispatch<SetStateAction<File[]>>) => {
    const newSelectedImages = selectedImages.filter((_, i) => i !== index); // Filter out the image that the user wants to remove
    setSelectedImages(newSelectedImages); // Update the selected images array
    dispatch(updateMsg('Image deleted')); // Set a new message for the snackbar
    dispatch(updateOpen(true)); // Display the snackbar
}

export default removeImage;