import { Drawer, Layout } from "antd";

import { NAV_STYLE_DRAWER, NAV_STYLE_NO_HEADER_MINI_SIDEBAR, TAB_SIZE, THEME_TYPE_LITE } from "../../../constants/ApplicationConstants/ThemeSetting";

import SideBarContent from "./SideBarContent";
import { useSideBar } from "./index.hook";

const { Sider } = Layout;

const Sidebar = () => {
  const config = useSideBar();

  return (
    <Sider className={`gx-app-sidebar ${config.drawerStyle} ${config.themeType !== THEME_TYPE_LITE ? "gx-layout-sider-dark" : null}`} trigger={null} collapsed={config.width < TAB_SIZE ? false : config.sidebarCollapsed || config.navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR} theme={config.themeType === THEME_TYPE_LITE ? "light" : "dark"} collapsible>
      {config.navStyle === NAV_STYLE_DRAWER || config.width < TAB_SIZE ? (
        <Drawer className={`gx-drawer-sidebar ${config.themeType !== THEME_TYPE_LITE ? "gx-drawer-sidebar-dark" : null}`} placement="left" closable={false} onClose={config.onToggleCollapsedNav} open={config.navCollapsed}>
          <SideBarContent sidebarCollapsed={config.sidebarCollapsed} setSidebarCollapsed={config.setSidebarCollapsed} />
          {/* <div className={styles["sidebar-footer-text"]}>POWERED BY TRELLIS IDENTITY SOLUTIONS</div> */}
        </Drawer>
      ) : (
        <SideBarContent sidebarCollapsed={config.sidebarCollapsed} setSidebarCollapsed={config.setSidebarCollapsed} />
      )}
      {/* {!config.sidebarCollapsed && <div className={styles["sidebar-footer-text"]}>POWERED BY TRELLIS IDENTITY SOLUTIONS</div>} */}
    </Sider>
  );
};
export default Sidebar;
