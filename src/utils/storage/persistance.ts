const get_storage = (key: string) => {
  return localStorage.getItem(key) || null;
};

const set_storage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const clear_storage = (key: string) => {
  localStorage.removeItem(key);
};

const persistance = {
  get: get_storage,
  set: set_storage,
  clear: clear_storage,
};

export default persistance;
