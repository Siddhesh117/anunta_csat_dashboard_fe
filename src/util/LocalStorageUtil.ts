class LocalStorageUtil {
  public static localstorageSetItem(key: string, value: string | object) {
    const formattedKey = btoa(key);
    const formattedValue = btoa(JSON.stringify(value));

    localStorage.setItem(formattedKey, formattedValue);
  }

  public static localstorageGetItem(key: string) {
    const encryptedKey = btoa(key);
    const encryptedValue = localStorage.getItem(encryptedKey);

    if (!encryptedValue) return null;

    const decryptedValue = atob(encryptedValue);
    return JSON.parse(decryptedValue);
  }

  public static localstorageRemoveItem(key: string) {
    const encryptedKey = btoa(key);
    localStorage.removeItem(encryptedKey);
  }
}

export default LocalStorageUtil;
