import { AppDispatch } from "@/store";
import { updateTheme } from "@/store/slices/themeSlice";

/**
 * This method forces light theme on the app
 * @param dispatch - Redux dispatch
 */
const forceLightTheme = (dispatch: AppDispatch) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add("light");
    dispatch(updateTheme("light"));
};

export default forceLightTheme;