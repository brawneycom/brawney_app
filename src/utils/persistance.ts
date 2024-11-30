const get_storage = (key: string) => {
  return localStorage.getItem(key) || null;
};

const set_storage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const storage = {
  get: get_storage,
  set: set_storage,
};
