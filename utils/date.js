/**
 * Convert date string to specific format string
 * @param {Date} date
 */
export const toDefaultDateString = (date, omitTime = false) => {
  const newDate = new Date(date);

  let dateString = `${newDate.getFullYear()}-${(newDate.getMonth() + 1) < 10 ? '0' : ''}${newDate.getMonth() + 1}-`
    + `${newDate.getDate() < 10 ? '0' : ''}${newDate.getDate()} `;

  if (!omitTime) {
    dateString += `${newDate.getHours() < 10 ? '0' : ''}${newDate.getHours()} : `
      + `${newDate.getMinutes() < 10 ? '0' : ''}${newDate.getMinutes()}`;
  }

  return dateString;
};