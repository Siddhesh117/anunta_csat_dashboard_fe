import { useEffect, useState } from "react";
import useValue from "./useValue";
import * as dashboardService from "../services/dashboardService";
import { CustomNotification } from "../util/CustomNotification";
import { DashboardClientList } from "../shared/interface/dashboard.interface";

const useGetClientList = () => {
  const [clientList, setClientList] = useState<DashboardClientList[]>([]);

  const { value: loading, handleDisableValue: handleDisableLoading, handleEnableValue: handleEnableLoading } = useValue(true);

  /* EFFECTS */
  useEffect(() => {
    const fetchClientList = async () => {
      handleEnableLoading();

      const data = await dashboardService.getClientList();

      return data;
    };

    fetchClientList()
      .then((response) => {
        setClientList(response?.data);
      })
      .catch((error) => {
        CustomNotification.showErrorMessage(error);
      })
      .finally(() => {
        handleDisableLoading();
      });

    // eslint-disable-next-line
  }, []);

  return { loading, clientList };
};

export default useGetClientList;
