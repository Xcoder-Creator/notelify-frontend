
/**
 * This method formats the given date in a readable form.
 * @param date - The date string to be formatted
 * @returns string
 */
function formatNoteDate(date: Date): string {
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) {
        // Example: Edited 8:07 PM
        return `Edited ${new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
        }).format(date)}`;
    }

    if (isYesterday) {
        // Example: Edited Sep 22
        return `Edited ${new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
        }).format(date)}`;
    }

    if (date.getFullYear() === now.getFullYear()) {
        // Example: Edited Aug 20
        return `Edited ${new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
        }).format(date)}`;
    }

    // Older than this year → include year
    // Example: Edited Aug 20, 2023
    return `Edited ${new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date)}`;
}

export default formatNoteDate;