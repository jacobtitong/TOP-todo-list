const sort = (library, detail, ascending) => {
  const value1 = ascending ? -1 : 1;
  const value2 = !ascending ? -1 : 1;
  return library.sort(function (item1, item2) {
    if (item1[detail] < item2[detail]) return value1;
    if (item1[detail] > item2[detail]) return value2;
    else return 0;
  });
};
