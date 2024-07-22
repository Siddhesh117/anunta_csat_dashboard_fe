import React from "react";

import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR, NAV_STYLE_NO_HEADER_MINI_SIDEBAR, TAB_SIZE } from "../../../constants/ApplicationConstants/ThemeSetting";
import Sidebar from "../../common/SideBar";

import useAppSideBar from "./index.hook";

const SIDEBAR_VISIBLE_ON = [NAV_STYLE_FIXED, NAV_STYLE_DRAWER, NAV_STYLE_MINI_SIDEBAR, NAV_STYLE_NO_HEADER_MINI_SIDEBAR, NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR];

type AppSidebarProps = {
  navStyle: string;
};

const AppSidebar = ({ navStyle }: AppSidebarProps) => {
  const { width } = useAppSideBar();

  if (width < TAB_SIZE || SIDEBAR_VISIBLE_ON?.includes(navStyle)) return <Sidebar />;

  return null;
};

export default React.memo(AppSidebar);
