import { Button } from "antd";

import styles from "./index.module.less";
import CircularProgressBar from "../CircularProgressBar";

type CustomButtonProps = {
  disabled?: boolean;
  htmlType?: "submit" | undefined;
  text: string;
  onClick?: () => void;
  saving?: boolean;
  className?: string;
};

const CustomButton = (props: CustomButtonProps) => {
  /* HANDLERS */
  const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    if (props.saving) {
      e.preventDefault();
      return;
    }

    if (props?.onClick) props.onClick();
  };

  return (
    <Button disabled={props.disabled} htmlType={props.htmlType} className={`gx-mb-0 gx-btn ${styles["button-gradiant"]} ${props.className}`} onClick={handleOnClick}>
      {props.saving ? <CircularProgressBar /> : props.text}
    </Button>
  );
};

export default CustomButton;
