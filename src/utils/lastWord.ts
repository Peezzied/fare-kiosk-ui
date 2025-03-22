export function removeLastWord(str: string): string {
    const words = str.trim().split(" "); // Split into words
    words.pop(); // Remove last word
    return words.join(" "); // Join back to string
}

export function getLastWord(str: string): string {
    return str.trim().split(" ").pop() ?? "";
}