export const beautifyString = (str: string) => {
    return str
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/_/g, ' ') // Replace underscores with spaces
        .toLowerCase() // Convert to lowercase
        .trim(); // Remove leading/trailing whitespace
}

export const formatDate = (dateString: any) => {
    console.log("dateString", dateString)
    if (dateString) {
        return new Date(dateString).toLocaleDateString('de', { month: "2-digit", day: "2-digit", year: "numeric" })
    } else {
        return 'unknown'
    }
}