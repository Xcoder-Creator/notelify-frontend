/**
 * Get the current time in a 12-hour format.
 * @returns {string} The current time formatted as "HH:MM AM/PM".
 */
const getCurrentTime = (): string => {
    return new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

export default getCurrentTime;