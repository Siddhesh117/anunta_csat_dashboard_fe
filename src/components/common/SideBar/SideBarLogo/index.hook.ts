import { useSelector, useDispatch } from "react-redux";
import { Dispatch, SetStateAction } from "react";

import { NAV_STYLE_FIXED, NAV_STYLE_DRAWER, TAB_SIZE } from "../../../../constants/ApplicationConstants/ThemeSetting";
import { toggleCollapsedSideNav } from "../../../../appRedux/actions";

import LocalStorageUtil from "../../../../util/LocalStorageUtil";
import { LocalStorageConstants } from "../../../../constants/ApplicationConstants/LocalStorageConstants";

import type { RootState } from "../../../../appRedux/store";
import type { UIConfig } from "../../../../shared/interface/UIConfig.interface";

export const useSideBarLogo = (sidebarCollapsed: boolean, setSidebarCollapsed: Dispatch<SetStateAction<boolean>>) => {
  /* CONSTANTS */
  const dispatch = useDispatch();
  const partnerDetails = LocalStorageUtil.localstorageGetItem(LocalStorageConstants.UI_CONFIG) as UIConfig;

  /* STATE */
  const { themeType } = useSelector(({ settings }: RootState) => settings);
  const { width } = useSelector(({ common }: RootState) => common);
  const { navCollapsed } = useSelector(({ common }: RootState) => common);

  let navStyle = useSelector(({ settings }: RootState) => settings.navStyle);
  if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
    navStyle = NAV_STYLE_DRAWER;
  }

  /* HANDLERS */
  const handleHideLogo = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    dispatch(toggleCollapsedSideNav(!navCollapsed));
  };

  /* EFFECT */

  return { navStyle, navCollapsed, themeType, width, handleHideLogo, partnerDetails };
};
