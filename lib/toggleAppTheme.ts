"use client";

import { AppDispatch, store } from "@/store";
import { updateTheme } from "@/store/slices/themeSlice";

/**
 * Toggle app theme (light/dark) using Redux + localStorage + system preference.
 * @param dispatch - Redux dispatch
 */
const toggleAppTheme = (dispatch: AppDispatch) => {
    if (store.getState().theme.theme === "dark"){
        dispatch(updateTheme("light"));
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add("light");
    } else {
        dispatch(updateTheme("dark"));
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add("dark");
    }
};

export default toggleAppTheme;