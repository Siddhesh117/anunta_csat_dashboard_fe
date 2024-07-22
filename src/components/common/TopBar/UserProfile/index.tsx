import { Avatar, Popover } from "antd";

import styles from "./index.module.less";

import { useUserProfile } from "./index.hook";
import Auxiliary from "../../../../util/Auxiliary";
import user_image from "../../../../assets/pictures/user_image.jpg";

const UserProfile = () => {
  /* CONSTANTS */

  const config = useUserProfile();

  const userMenuOptions = (
    <ul className="gx-user-popover">
      {/* <li onClick={config.handleAbout}>About</li> */}
      <li onClick={config.handleLogOut}>Logout</li>
    </ul>
  );

  /* HELPER METHODS */

  /* HANDLERS */

  return (
    <ul className="gx-header-notifications gx-ml-auto">
      <Auxiliary>
        <li className="gx-user-nav">
          <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions} trigger="click" open={config.open} onOpenChange={config.handleOpenChange}>
            <div className={styles["user-profile"]}>
              <Avatar src={user_image} className="gx-size-40 gx-pointer gx-mr-3" alt="" />
              <span className={styles[`gx-avatar-name`]}>{`${"Admin"}`}</span>
            </div>
          </Popover>
        </li>
      </Auxiliary>
    </ul>
  );
};

export default UserProfile;
