import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import MainApp from "./MainApp";
import { useApp } from "./index.hook";

// import Loading from "../common/Loading";

/* Component which ensures to scroll to top of the page as soon as route is changed. */
const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    const element = document.querySelector(".ant-layout-content");
    if (!element) return;

    element.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.search]);

  return <>{children}</>;
};

const App = ({ children }: { children: React.ReactNode }) => {
  const { currentAppLocale, isDirectionRTL } = useApp();

  return (
    <ConfigProvider locale={currentAppLocale.antd} direction={isDirectionRTL ? "rtl" : "ltr"}>
      <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
        <ScrollToTop>
          <MainApp>{children}</MainApp>
          {/* { <Loading />} */}
        </ScrollToTop>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
