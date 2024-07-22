import { useEffect, useState } from "react";
import useValue from "./useValue";
import * as dashboardService from "../services/dashboardService";
import { CustomNotification } from "../util/CustomNotification";
import { DashboardDeliveryGroupList } from "../shared/interface/dashboard.interface";

const useGetDeliveryGroupList = () => {
  const [deliveryGroupList, setDeliveryGroupList] = useState<DashboardDeliveryGroupList[]>([]);

  const { value: loading, handleDisableValue: handleDisableLoading, handleEnableValue: handleEnableLoading } = useValue(true);

  /* EFFECTS */
  useEffect(() => {
    const fetchDeliveryGroupList = async () => {
      handleEnableLoading();

      const data = await dashboardService.getDeliveryGroupList();

      return data;
    };

    fetchDeliveryGroupList()
      .then((response) => {
        setDeliveryGroupList(response?.data);
      })
      .catch((error) => {
        CustomNotification.showErrorMessage(error);
      })
      .finally(() => {
        handleDisableLoading();
      });

    // eslint-disable-next-line
  }, []);

  return { loading, deliveryGroupList };
};

export default useGetDeliveryGroupList;
