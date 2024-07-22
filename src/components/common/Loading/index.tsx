import { Space, Spin } from "antd";

import styles from "./index.module.less";

const Loading = () => {
  return (
    <div className={styles["loading--center"]}>
      <Space direction="vertical" className={styles["space--width"]} size="large">
        <Spin tip="Loading" size="large" />
      </Space>
    </div>
  );
};

export default Loading;
