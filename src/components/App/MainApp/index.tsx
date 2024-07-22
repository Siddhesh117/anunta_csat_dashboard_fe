import { Layout } from "antd";

import Topbar from "../../common/TopBar";
import { NAV_STYLE_ABOVE_HEADER, NAV_STYLE_BELOW_HEADER, NAV_STYLE_DARK_HORIZONTAL, NAV_STYLE_DEFAULT_HORIZONTAL, NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_INSIDE_HEADER_HORIZONTAL, NAV_STYLE_MINI_SIDEBAR } from "../../../constants/ApplicationConstants/ThemeSetting";

import AppSideBar from "../AppSideBar";
import { useMainApp } from "./index.hook";

// eslint-disable-next-line
const { Content, Footer } = Layout;

const getContainerClass = (navStyle: string) => {
  switch (navStyle) {
    case NAV_STYLE_DARK_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_DEFAULT_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_BELOW_HEADER:
      return "gx-container-wrap";
    case NAV_STYLE_ABOVE_HEADER:
      return "gx-container-wrap";
    default:
      return "";
  }
};

const getNavStyles = (navStyle: string) => {
  switch (navStyle) {
    case NAV_STYLE_FIXED:
      return <Topbar />;
    case NAV_STYLE_DRAWER:
      return <Topbar />;
    case NAV_STYLE_MINI_SIDEBAR:
      return <Topbar />;

    default:
      return null;
  }
};

const MainApp = ({ children }: { children: React.ReactNode }) => {
  const { navStyle } = useMainApp();

  return (
    <Layout className="gx-app-layout">
      <AppSideBar navStyle={navStyle} />
      <Layout>
        {getNavStyles(navStyle)}
        <Content className={`gx-layout-content ${getContainerClass(navStyle)} `}>
          <div className="gx-main-content-wrapper">{children}</div>
          <Footer>
            <div className="gx-layout-footer-content">
              <div>
                © Anunta Tech. {new Date().getFullYear()}-{(new Date().getFullYear() + 1).toString().slice(2)}
              </div>
            </div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainApp;
