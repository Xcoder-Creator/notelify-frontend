"use client";

import { store } from "@/store";
import { updateTheme } from "@/store/slices/themeSlice";

/**
 * Toggle app theme (light/dark) using Redux + localStorage + system preference.
 * @returns void
 */
const toggleAppTheme = () => {
    if (store.getState().theme.theme === "dark"){
        store.dispatch(updateTheme("light"));
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add("light");
    } else {
        store.dispatch(updateTheme("dark"));
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add("dark");
    }
};

export default toggleAppTheme;