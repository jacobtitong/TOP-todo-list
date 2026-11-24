const filter = (library, detail, userInputBasis, keep) => {
  return library.filter((obj) => {
    if (obj[detail] === userInputBasis) return keep;
    return !keep;
  });
};

export default filter;
