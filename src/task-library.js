const TaskLibrary = (() => {
  let library = [];

  const getLibrary = () => library;

  const addTask = (task) => library.append(task);

  const removeTask = (task) => {
    library = library.filter((item) => item !== task);
  };

  return { getLibrary, addTask, removeTask };
})();
