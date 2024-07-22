import { message } from "antd";
import { AxiosError } from "axios";
import FixMeLater from "../shared/types/fixMeLater.type";

enum NotificationType {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error"
}

export class CustomNotification {
  private static showMessage(notificationMessage: string, type: NotificationType) {
    message.destroy();

    message[type](notificationMessage);
  }

  public static showSuccessMessage(notificationMessage: string) {
    CustomNotification.showMessage(notificationMessage, NotificationType.SUCCESS);
  }

  public static showInfoMessage(notificationMessage: string) {
    CustomNotification.showMessage(notificationMessage, NotificationType.INFO);
  }

  public static showErrorMessage(error: FixMeLater) {
    if (error instanceof AxiosError) {
      const errorDetails = error?.response?.data?.detail;

      if (typeof error?.response?.data === "string") {
        CustomNotification.showMessage(error?.response?.data, NotificationType.ERROR);
      } else if (typeof errorDetails === "string") {
        CustomNotification.showMessage(error?.response?.data?.detail, NotificationType.ERROR);
      } else if (errorDetails instanceof Array) {
        let errorMessage = "";

        errorDetails.forEach((item) => {
          errorMessage += item?.msg + ", \t";
        });

        CustomNotification.showMessage(errorMessage, NotificationType.ERROR);
      } else {
        CustomNotification.showMessage(error?.message, NotificationType.ERROR);
      }
    } else if (typeof error === "string") {
      CustomNotification.showMessage(error, NotificationType.ERROR);
    } else {
      CustomNotification.showMessage(error?.message, NotificationType.ERROR);
    }
  }
}
