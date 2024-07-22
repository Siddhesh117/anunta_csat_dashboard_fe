import { LocalStorageConstants } from "../constants/ApplicationConstants/LocalStorageConstants";
import { UIStyleConstants } from "../constants/ApplicationConstants/UIStyleConstants";
import LocalStorageUtil from "./LocalStorageUtil";

import type { UIConfig } from "../shared/interface/UIConfig.interface";

class UIConfiguration {
  public static updateUIConfig(primaryColor: string, secondaryColor: string, logoUrl: string, isSignInPage: boolean) {
    /* set primary, secondary colors and logo */
    const appPrimaryColor = primaryColor ?? UIStyleConstants.PRIMARY_COLOR;
    const appSecondaryColor = secondaryColor ?? UIStyleConstants.SECONDARY_COLOR;

    let formattedUIConfig = LocalStorageUtil.localstorageGetItem(LocalStorageConstants.UI_CONFIG) ?? ({} as UIConfig);

    if (isSignInPage) {
      formattedUIConfig = { ...formattedUIConfig, signIn: { primaryColor: appPrimaryColor, secondaryColor: appSecondaryColor, logo: logoUrl } };
    } else {
      formattedUIConfig = { ...formattedUIConfig, app: { primaryColor: appPrimaryColor, secondaryColor: appSecondaryColor, logo: logoUrl } };
    }

    LocalStorageUtil.localstorageSetItem(LocalStorageConstants.UI_CONFIG, formattedUIConfig);

    /* this update will directly update the CSSDOm which will be applied to all the components. */
    document.documentElement.style.setProperty("--app-primary-color", appPrimaryColor);
    document.documentElement.style.setProperty("--app-secondary-color", appSecondaryColor);
  }
}

export default UIConfiguration;
