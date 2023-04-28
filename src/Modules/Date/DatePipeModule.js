export const parseDateAndTime = (date) => {
  console.log(date);
  const timeString = getTimeStringFromDate(date);
  if (isToday(date)) {
    return `Today at ${timeString}`;
  }

  if (wasYesterday(date)) {
    return `Yesterday at ${timeString}`;
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleString("en-US", options);
  const tokens = formattedDate.split(", ");
  return `${tokens[0].substring(0, 3)}, ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}, ${timeString}`;
};

const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const getTimeStringFromDate = (date) => {
  let output = date.getHours() + ":";

  if (countDigits(date.getMinutes()) === 1) {
    output += `0${date.getMinutes()}`;
  } else {
    output += `${date.getMinutes()}`;
  }

  return output;
};

const wasYesterday = (date) => {
  const today = new Date();
  return (
    date.getDay() === today.getDay() - 1 &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isDateNullOrUndefined = (date) => {
  return !!date;
};

export const compareDates = (firstDate, secondDate) => {
  if (isDateNullOrUndefined(firstDate) && !isDateNullOrUndefined(secondDate)) {
    return 1;
  }

  if (!isDateNullOrUndefined(firstDate) && !isDateNullOrUndefined(secondDate)) {
    return -1;
  }
  const firstTime = new Date(firstDate).getTime();
  const secondTime = new Date(secondDate).getTime();

  if (firstTime > secondTime) {
    return 1;
  }

  if (firstTime < secondTime) {
    return -1;
  }

  return 0;
};

const countDigits = (number) => {
  if (number >= 0 && number <= 9) {
    return 1;
  }

  let digits = 0;
  while (number) {
    digits++;
    number = Math.round(number / 10);
  }
  return digits;
};
