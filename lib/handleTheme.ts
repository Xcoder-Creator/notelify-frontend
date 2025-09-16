import { AppDispatch } from "@/store";
import { updateTheme } from "@/store/slices/themeSlice";

/**
 * Handles app theme (light/dark) using Redux + localStorage + system preference.
 * @param dispatch - Redux dispatch
 */
const handleTheme = (dispatch: AppDispatch) => {
    if (typeof window === "undefined") return; // ✅ SSR safety

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    let stored = localStorage.getItem("theme");

    let theme: "light" | "dark";

    if (stored === "dark" || stored === "light") {
        theme = stored;
    } else {
        theme = darkQuery.matches ? "dark" : "light";
        localStorage.setItem("theme", theme);
    }

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    dispatch(updateTheme(theme));
};

export default handleTheme;