export const getDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000); // multiply by 1000 to convert from seconds to milliseconds
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // get short name of month
  return `${day} ${month}`;
};

export const getTime = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000); // multiply by 1000 to convert from seconds to milliseconds
  const hours = date.getHours().toString().padStart(2, "0"); // get hours and pad with leading zero if necessary
  const minutes = date.getMinutes().toString().padStart(2, "0"); // get minutes and pad with leading zero if necessary
  return `${hours}:${minutes}`;
}
