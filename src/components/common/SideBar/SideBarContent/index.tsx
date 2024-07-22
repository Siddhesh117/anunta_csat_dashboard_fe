import React, { Dispatch, SetStateAction } from "react";
import { Menu, MenuProps } from "antd";

import SidebarLogo from "../SideBarLogo";
import { THEME_TYPE_LITE } from "../../../../constants/ApplicationConstants/ThemeSetting";
import styles from "./index.module.less";
import { useSideBarContent } from "./index.hook";
// import { SideMenuItemKeys } from "../../../../constants/ApplicationConstants/RouteConstants";

type SidebarContentProps = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
};

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: "group"): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
};

const generateHomeSettings = () => {
  const items = [getItem("MIS Dashboard", "", <i className="icon icon-home" />), getItem("Attention Need", "unsatisfied-users", <i className="icon icon-product-list" />),getItem("MIS Report", "report", <i className="icon icon-product-list" />), getItem("Gen AI MIS", "gen-ai", <i className="icon icon-setting" />)];

  return items;
};

const SideBarContent = ({ sidebarCollapsed, setSidebarCollapsed }: SidebarContentProps) => {
  const config = useSideBarContent();

  /* we populate our menu based on access_control_master in the DB */
  const items: MenuItem[] = generateHomeSettings();

  return (
    <>
      {/* hamburger icon */}
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      <Menu onClick={config.handleOnClick} className={styles["menu"]} selectedKeys={[config.selectedKeys]} theme={config.themeType === THEME_TYPE_LITE ? "light" : "dark"} mode="inline" items={items}></Menu>
    </>
  );
};

export default React.memo(SideBarContent);
