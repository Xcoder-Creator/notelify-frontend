import { AppDispatch, store } from "@/store";
import { updateTheme } from "@/store/slices/themeSlice";

/**
 * This method forces light theme on the app.
 * @returns void
 */
const forceLightTheme = () => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add("light");
    store.dispatch(updateTheme("light"));
};

export default forceLightTheme;