const calculateFutureDate = (minutes: number): Date => {
  const futureDate = new Date(Date.now() + minutes * 60 * 1000);
  return futureDate;
};
