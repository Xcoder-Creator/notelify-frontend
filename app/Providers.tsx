"use client";

import { ThemeProvider } from "next-themes";
import ReduxProvider from "./ReduxProvider";
import ThemeRegistry from "./theme/ThemeRegistry";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <ThemeRegistry>{children}</ThemeRegistry>
            </ThemeProvider>
        </ReduxProvider>
    );
}