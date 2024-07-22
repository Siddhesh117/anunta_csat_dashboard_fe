import { LocalStorageConstants, LocalStorageValueConstants } from "../constants/ApplicationConstants/LocalStorageConstants";
import LocalStorageUtil from "./LocalStorageUtil";

class Authentication {
  public static isUserSessionActive = () => {
    try {
      const localStorageKeys: string[] = [LocalStorageConstants.ACCESS_TOKEN, LocalStorageConstants.TOKEN_TYPE, LocalStorageConstants.USER_DATA];

      /* check if basic keys to access application are present */
      for (const key of localStorageKeys) {
        const value = LocalStorageUtil.localstorageGetItem(key);
        // If any key is not found, return false immediately
        if (value === null) return false;
      }

      /* check if session is expired. */
      const isSessionExpired = LocalStorageUtil.localstorageGetItem(LocalStorageConstants.IS_SESSION_EXPIRED);
      if (isSessionExpired === LocalStorageValueConstants.TRUE) return false;

      return true;
    } catch (error) {
      return false;
    }
  };
}

export default Authentication;
