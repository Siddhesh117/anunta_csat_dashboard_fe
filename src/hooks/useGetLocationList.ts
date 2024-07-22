import { useEffect, useState } from "react";
import useValue from "./useValue";
import * as dashboardService from "../services/dashboardService";
import { CustomNotification } from "../util/CustomNotification";
import { DashboardLocationList } from "../shared/interface/dashboard.interface";

const useGetLocationList = () => {
  const [locationList, setLocationList] = useState<DashboardLocationList[]>([]);

  const { value: loading, handleDisableValue: handleDisableLoading, handleEnableValue: handleEnableLoading } = useValue(true);

  /* EFFECTS */
  useEffect(() => {
    const fetchLocationList = async () => {
      handleEnableLoading();

      const data = await dashboardService.getLocationList();

      return data;
    };

    fetchLocationList()
      .then((response) => {
        setLocationList(response?.data);
      })
      .catch((error) => {
        CustomNotification.showErrorMessage(error);
      })
      .finally(() => {
        handleDisableLoading();
      });

    // eslint-disable-next-line
  }, []);

  return { loading, locationList };
};

export default useGetLocationList;
