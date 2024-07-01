export const compareDatesWithoutTime = (dateOne: Date, dateTwo: Date) => {
  return (
    dateOne.getDate() === dateTwo.getDate() &&
    dateOne.getMonth() === dateTwo.getMonth() &&
    dateOne.getFullYear() === dateTwo.getFullYear()
  );
};
