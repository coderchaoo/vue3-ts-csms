class LocalCache {
  isLocal: boolean;
  constructor(isLocal = true) {
    this.isLocal = isLocal;
  }

  setCache(key: string, value: any, isLocal = true) {
    if (isLocal) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  getCache(key: string, isLocal = true) {
    // obj => string => obj
    let value;
    if (isLocal) {
      value = window.localStorage.getItem(key);
    } else {
      value = window.sessionStorage.getItem(key);
    }
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key: string, isLocal = true) {
    if (isLocal) {
      window.localStorage.removeItem(key);
    } else {
      window.sessionStorage.removeItem(key);
    }
  }

  clearCache(isLocal = true) {
    if (isLocal) {
      window.localStorage.clear();
    } else {
      window.sessionStorage.clear();
    }
  }
}

export const sessionStorage = new LocalCache(false);
export default new LocalCache(true);
