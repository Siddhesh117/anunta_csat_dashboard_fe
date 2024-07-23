import { SyntheticEvent } from "react";
import { Layout } from "antd";

import UserProfile from "./UserProfile";
import styles from "./index.module.less";
import logo_img from "../../../assets/pictures/anunta-logo1.jpg";
import { useTopBar } from "./index.hook";
import { Link } from "react-router-dom";

const { Header } = Layout;

const TopBar = () => {
  const config = useTopBar();

  return (
    <Header>
      <div className="gx-linebar gx-mr-3 gx-d-lg-none">
        <i className={`gx-icon-btn icon icon-menu gx-text-gray`} onClick={config.handleNavCollapse} />
      </div>

      <Link to="/" className={`gx-d-block gx-d-lg-none gx-mr-3 gx-pointer ${styles["company-logo"]}`}>
        <img className={styles["img-style"]} src={logo_img} alt="" onError={(event: SyntheticEvent<HTMLDivElement>) => ((event.target as HTMLImageElement).src = logo_img)} />
      </Link>

      <span style={{ fontSize: "27px", fontWeight: "600", color: "#DF5225" }}>MIS Studio</span>

      <UserProfile />
    </Header>
  );
};

export default TopBar;
