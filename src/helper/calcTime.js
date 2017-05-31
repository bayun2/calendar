const calcTime = (type, year, month) => {
  let realYear = year;
  let realMonth = month;
  if (type === 'prev') {
    if (month === 0) {
      realMonth = 11;
      realYear--;
    } else {
      realMonth--;
    }
  } else if (type === 'next') {
    if (month === 11) {
      realMonth = 1;
      realYear++;
    } else {
      realMonth++;
    }
  }
  return {
    year: realYear,
    month: realMonth
  };
};

export default calcTime;
