const store = {
  setLocalStorage(menu) {
    localStorage.setItem('menu', JSON.stringify(menu)); // json -> string
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('menu')); // string -> json
  },
};

export default store;
