export function getDate(date) {
    const reviewDate = new Date(date);
    const todaysDate = new Date();

    // Time difference in milliseconds
    const timeDiff = todaysDate - reviewDate;

    // Constants for time in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    const oneWeek = oneDay * 7;
    const oneMonth = oneDay * 30;

    if (timeDiff > 12 * oneMonth) {
        return "Over a year ago";
    } else if (timeDiff > oneMonth) {
        return "Some months ago";
    } else if (timeDiff > oneWeek  &&  timeDiff < oneMonth) {
        return "This month";
    } else if (timeDiff > oneDay * 2 && timeDiff < oneWeek) {
        return "This week";
    } else if (timeDiff > oneDay && timeDiff < oneDay * 2) {
        return "Yesterday";
    } else if (timeDiff < oneDay) {
        return "Today";
    }

    // If none of the above conditions match, return a default value
    return "Unknown";
}
