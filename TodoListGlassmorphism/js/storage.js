let DATA_FOR_LOCAL_STORAGE = {
  unComp: [],
  comp: [],
};

const STORAGE_KEY = "todo_list";

const isStorageExist = () => {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung Web Storage");
    return false;
  }
  return true;
};

const saveData = () => {
  const parseData = JSON.stringify(DATA_FOR_LOCAL_STORAGE);

  localStorage.setItem(STORAGE_KEY, parseData);
};

const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let dataFromLocalStorage = JSON.parse(serializedData);

  if (dataFromLocalStorage !== null) {
    DATA_FOR_LOCAL_STORAGE = dataFromLocalStorage;
  }

  document.dispatchEvent(new Event("ondataloaded"));
};

export {
  isStorageExist,
  saveData,
  loadDataFromStorage,
  DATA_FOR_LOCAL_STORAGE,
};
