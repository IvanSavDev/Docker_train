export const getFormatDate = (dateForFormat) => {
  const dateInMilliseconds = new Date(dateForFormat);
  let day = dateInMilliseconds.getDate();
  if (String(day).length === 1) {
    day = `0${day}`;
  }
  let month = dateInMilliseconds.getMonth() + 1;
  if (String(month).length === 1) {
    month = `0${month}`;
  }
  const year = dateInMilliseconds.getFullYear();
  return `${day}.${month}.${year}`;
};
