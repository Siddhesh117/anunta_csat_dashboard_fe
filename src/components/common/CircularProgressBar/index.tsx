import styles from "./index.module.less";

const CircularProgressBar = () => {
  return (
    <div className={styles["circularProgressbar-container"]}>
      <div className={styles["circularProgressbar"]}></div>
    </div>
  );
};

export default CircularProgressBar;
