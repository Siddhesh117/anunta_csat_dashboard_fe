import { useEffect, useState } from "react";
import useValue from "./useValue";
import * as dashboardService from "../services/dashboardService";
import { CustomNotification } from "../util/CustomNotification";

const useGetUsersList = () => {
  const [userList, setUserList] = useState<any[]>([]);

  const { value: loading, handleDisableValue: handleDisableLoading, handleEnableValue: handleEnableLoading } = useValue(true);

  /* EFFECTS */
  useEffect(() => {
    const fetchClientList = async () => {
      handleEnableLoading();

      const data = await dashboardService.getUsersList();

      return data;
    };

    fetchClientList()
      .then((response) => {
        setUserList(response?.data);
      })
      .catch((error) => {
        CustomNotification.showErrorMessage(error);
      })
      .finally(() => {
        handleDisableLoading();
      });

    // eslint-disable-next-line
  }, []);

  return { loading, userList };
};

export default useGetUsersList;
