import { Dispatch, SetStateAction } from "react";

/**
 * Interface for the images display component in the note editor
 */
interface ImagesDisplayProps {
    /** The array of selected images */
    selectedImages: File[];
    
    /** The setter method for updating the contents of the selected images array */
    setSelectedImages: Dispatch<SetStateAction<File[]>>;
}

export default ImagesDisplayProps;