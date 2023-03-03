export const parseDate = (date) => {
    if (isToday(date)) {
        return `Today`;
    }

    if (wasYesterday(date)) {
        return `Yesterday`;
    }

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = date.toLocaleString("en-US", options);

    const tokens = formattedDate.split(", ");
    console.log(tokens);
    return `${tokens[0].substring(0, 3)}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
}

const isToday = (date) => {
    const today = new Date();
    return date === today;
}

const wasYesterday = (date) => {
    const today = new Date();
    return date.getDay() === today.getDay() - 1 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}

