export const parseDateAndTime = (date) => {
    const timeString = getTimeStringFromDate(date);
    if (isToday(date)) {
        return `Today at ${timeString}`;
    }

    if (wasYesterday(date)) {
        return `Yesterday at ${timeString}`;
    }

    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const formattedDate = date.toLocaleString("en-US", options);
    const tokens = formattedDate.split(", ");
    return `${tokens[0].substring(0, 3)}, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${timeString}`;
}

const isToday = (date) => {
    const today = new Date();
    return date === today;
}

const getTimeStringFromDate = (date) => {
    let output = date.getHours() + ":";

    if (countDigits(date.getMinutes()) === 1) {
        output += `0${date.getMinutes()}`;
    } else {
        output += `${date.getMinutes()}`;
    }

    return output;
}

const wasYesterday = (date) => {
    const today = new Date();
    return date.getDay() === today.getDay() - 1 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}

const countDigits = (number) => {
    if (number === 0) {
        return 1;
    }

    let digits = 0;
    while (number) {
        digits++;
        number /= 10;
    }
    return digits;
}

