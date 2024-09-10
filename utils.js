const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


function validateAndParseDates(startDateStr, endDateStr) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (endDate < startDate) {
    return { isValid: false, message: 'Invalid date range: End date is before start date.' };
  }

  if (isNaN(startDate) || isNaN(endDate)) {
    return { isValid: false, message: 'Invalid date format.' };
  }

  return { isValid: true, startDate, endDate };
}

module.exports = { delay, validateAndParseDates };
