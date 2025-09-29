export const beautifyString = (str: string) => {
    if (!str) return '';
    return str
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/_/g, ' ') // Replace underscores with spaces
        .toLowerCase() // Convert to lowercase
        .trim(); // Remove leading/trailing whitespace
}

export const formatDate = (dateString: any) => {
    if (dateString) {
        return new Date(dateString).toLocaleDateString('de', { month: "2-digit", day: "2-digit", year: "numeric" })
    } else {
        return 'unknown'
    }
}

export const getBgColorByStatus = (status: string | undefined) => {
    switch (status) {
        case 'in_production':
            return 'bg-green-200';
        case 'in_progress':
            return 'bg-orange-200';
        case 'idea':
        case 'planned':
            return 'bg-yellow-200';
        default:
            return '';
    }
}

export const getBgColorByCriticality = (criticality: any) => {
    switch (criticality) {
        case 'low':
            return 'bg-green-200';
        case 'medium':
            return 'bg-orange-200';
        case 'high':
            return 'bg-yellow-200';
        case 'critical':
            return 'bg-red-200';
        default:
            return '';
    }
}