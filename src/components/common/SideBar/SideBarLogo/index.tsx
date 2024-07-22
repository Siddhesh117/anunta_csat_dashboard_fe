import { Dispatch, SetStateAction } from "react";

import { NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, NAV_STYLE_NO_HEADER_MINI_SIDEBAR, TAB_SIZE, THEME_TYPE_LITE } from "../../../../constants/ApplicationConstants/ThemeSetting";
import styles from "./index.module.less";
import logo_img from "../../../../assets/pictures/anunta-new-logo.png";

import { useSideBarLogo } from "./index.hook";
import { Image } from "antd";

type SidebarLogoProps = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
};

const SidebarLogo = ({ sidebarCollapsed, setSidebarCollapsed }: SidebarLogoProps) => {
  const config = useSideBarLogo(sidebarCollapsed, setSidebarCollapsed);

  return (
    <div className={`gx-layout-sider-header`}>
      {config?.navStyle === NAV_STYLE_FIXED || config?.navStyle === NAV_STYLE_MINI_SIDEBAR ? (
        <div className={`${styles["sider-icon"]} gx-linebar`}>
          <i className={`gx-icon-btn icon icon-menu icon-${!sidebarCollapsed ? "menu-unfold" : "menu-fold"} ${config?.themeType !== THEME_TYPE_LITE ? "gx-text-white" : ""}`} onClick={config?.handleHideLogo} onMouseEnter={config?.handleHideLogo} />
        </div>
      ) : null}

      <span className="gx-site-logo">{(config?.navCollapsed || config?.navStyle !== NAV_STYLE_NO_HEADER_MINI_SIDEBAR || config?.width < TAB_SIZE) && <Image className={styles["img-style"]} preview={false} src={logo_img} alt="" />}</span>
    </div>
  );
};

export default SidebarLogo;
