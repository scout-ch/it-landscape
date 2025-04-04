export const beautifyString = (str: string) => {
    return str
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/_/g, ' ') // Replace underscores with spaces
        .toLowerCase() // Convert to lowercase
        .trim(); // Remove leading/trailing whitespace
}
