/**
 * Convert date string to specific format string
 * @param {Date} date
 */
export const toDefaultDateString = (date) => {
  const newDate = new Date(date);

  return `${newDate.getFullYear()}-${(newDate.getMonth() + 1) < 10 ? '0' : ''}${newDate.getMonth() + 1}-`
    + `${newDate.getDate() < 10 ? '0' : ''}${newDate.getDate()} `
    + `${newDate.getHours() < 10 ? '0' : ''}${newDate.getHours()} : `
    + `${newDate.getMinutes() < 10 ? '0' : ''}${newDate.getMinutes()}`
};