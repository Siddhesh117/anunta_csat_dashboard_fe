import { Modal } from "antd";

import styles from "./index.module.less";
import CustomButton from "../../CustomButton";
import Loading from "../../Loading";

type ConfirmationModalProps = {
  children: React.ReactNode;
  isModalOpen: boolean;
  title: string;
  saving: boolean;
  onCancel: () => void;
  onOk?: (data?: any) => void;
  submitButtonTitle: string;
  closeButtonTitle: string;
  width?: number | string;
  height?: number | string;
  headingTitle?: string;
  disabled?: boolean;
  overflowY: boolean;
  loading?: boolean;
};

const CustomModal = (props: ConfirmationModalProps) => {
  return (
    <Modal
      title={props?.title ?? null}
      centered
      open={props.isModalOpen}
      onCancel={props.onCancel}
      onOk={props?.onOk}
      destroyOnClose={true}
      maskClosable={false}
      okButtonProps={{
        style: {
          display: "none"
        }
      }}
      closable={true}
      cancelButtonProps={{ style: { display: "none" } }}
      footer={null}
      width={props?.width}
      bodyStyle={{ height: props?.height ?? "100%", minHeight: 200, maxHeight: "100%" }}
    >
      <>
        {!props.loading && (
          <div className={styles["modal-container"]}>
            {props?.headingTitle && <span className={styles["modal-header"]}>{props?.headingTitle}</span>}

            <div style={{ overflowY: props.overflowY ? "scroll" : "visible" }} className={styles["modal-body"]}>
              {props.children}
            </div>

            <div className={styles["modal-footer"]}>
              {props.submitButtonTitle && props?.closeButtonTitle ? (
                <div className={styles["close-send-btn"]}>
                  <CustomButton onClick={props.onOk} disabled={props?.disabled || props.saving} text={props.submitButtonTitle} saving={props.saving} />

                  <CustomButton onClick={props.onCancel} disabled={props.saving} text={props?.closeButtonTitle ?? "Close"} />
                </div>
              ) : !props?.closeButtonTitle && props.submitButtonTitle ? (
                <div className={styles["close-btn"]}>
                  <CustomButton onClick={props.onOk} disabled={props?.disabled || props.saving} text={props.submitButtonTitle} saving={props.saving} />
                </div>
              ) : (
                <div className={styles["close-btn"]}>
                  <CustomButton onClick={props.onCancel} disabled={props.saving} text={props?.closeButtonTitle ?? "Close"} />
                </div>
              )}
            </div>
          </div>
        )}

        {props.loading && <Loading />}
      </>
    </Modal>
  );
};

export default CustomModal;
