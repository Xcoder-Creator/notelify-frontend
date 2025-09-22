import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import localFont from "next/font/local";
import { Providers } from "./Providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const myFont = localFont({
    src: "../public/fonts/SourceSans3.ttf",
    variable: "--font-myfont", // optional CSS variable
});

export const metadata: Metadata = {
    title: "Notelify",
    description: "Welcome to Notelify - Your Ultimate Note-Taking Companion!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html 
            lang="en" 
            suppressHydrationWarning 
            className={`${geistSans.variable} ${geistMono.variable} ${myFont.variable}`}
        >
            <body className={myFont.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}