import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleCollapsedSideNav } from "../../../appRedux/actions";
import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR, NAV_STYLE_NO_HEADER_MINI_SIDEBAR, TAB_SIZE } from "../../../constants/ApplicationConstants/ThemeSetting";

import type { RootState } from "../../../appRedux/store";

export const useSideBar = () => {
  const dispatch = useDispatch();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const { themeType, navStyle } = useSelector(({ settings }: RootState) => settings);
  const { navCollapsed, width } = useSelector(({ common }: RootState) => common);

  const onToggleCollapsedNav = () => {
    dispatch(toggleCollapsedSideNav(!navCollapsed));
  };

  /* Sidebar Open style */
  useEffect(() => {
    setSidebarCollapsed(navStyle === NAV_STYLE_MINI_SIDEBAR);
  }, [navStyle]);

  /* Sidebar close style */
  // useEffect(() => {
  //   setSidebarCollapsed(navStyle === NAV_STYLE_FIXED);
  // }, [navStyle]);

  let drawerStyle = "gx-collapsed-sidebar";

  if (navStyle === NAV_STYLE_FIXED) {
    drawerStyle = "";
  } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
    drawerStyle = "gx-mini-sidebar gx-mini-custom-sidebar";
  } else if (navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
    drawerStyle = "gx-custom-sidebar";
  } else if (navStyle === NAV_STYLE_MINI_SIDEBAR) {
    drawerStyle = "gx-mini-sidebar";
  } else if (navStyle === NAV_STYLE_DRAWER) {
    drawerStyle = "gx-collapsed-sidebar";
  }
  if ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) && width < TAB_SIZE) {
    drawerStyle = "gx-collapsed-sidebar";
  }

  return { drawerStyle, themeType, navStyle, width, sidebarCollapsed, navCollapsed, setSidebarCollapsed, onToggleCollapsedNav };
};
