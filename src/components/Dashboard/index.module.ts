import { useEffect, useState, useCallback } from "react";
import useValue from "../../hooks/useValue";
import * as dashboardService from "../../services/dashboardService";
import { CustomNotification } from "../../util/CustomNotification";
import { DashboardDataInterface, FormDataProps, GetGarphRecordList, UnsatisfiedUserList } from "../../shared/interface/dashboard.interface";
import useGetClientList from "../../hooks/useGetClientList";
import useGetLocationList from "../../hooks/useGetLocationList";
import useGetDeliveryGroupList from "../../hooks/useGetDeliveryGroupList";
import { ActionStatusKeys, DashboardFilterKey, DashboardGraphType } from "../../constants/ApplicationConstants/DashboardConstant";
import LocalStorageUtil from "../../util/LocalStorageUtil";
import { LocalStorageConstants } from "../../constants/ApplicationConstants/LocalStorageConstants";

export const useDashboard = () => {
  /* CONSTANT */
  const filters = LocalStorageUtil.localstorageGetItem(LocalStorageConstants.DASHBOARD_FILTERS);

  // locationGraph color
  const locationGraphColor = "#5c3c9c";
  // deliveryGroup Color
  const deliveryGroupGraphColor = "#bb3c5a";

  /* STATE */
  const [dashboardData, setDashboardData] = useState<DashboardDataInterface | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [isDashboardReport, setIsDashboardReport] = useState(false);

  /* CUSTOM HOOKS */
  const { value: loading, handleDisableValue: handleDisableLoading, handleEnableValue: handleEnableLoading } = useValue(true);
  const { loading: loadingClientList, clientList } = useGetClientList();
  const { loading: loadingLocationList, locationList } = useGetLocationList();
  const { loading: loadingDeliveryGroupList, deliveryGroupList } = useGetDeliveryGroupList();

  const fetchData = async (data?: FormDataProps) => {
    try {
      setDashboardData(null);
      handleEnableLoading();
      if (data?.client) {
        setSelectedClient(data?.client);
        LocalStorageUtil.localstorageSetItem(LocalStorageConstants.DASHBOARD_FILTERS, { [DashboardFilterKey.client]: data?.client });
      } else {
        setSelectedClient(null);
        LocalStorageUtil.localstorageRemoveItem(LocalStorageConstants.DASHBOARD_FILTERS);
      }

      const response = await dashboardService.getDashboardData(data);

      setDashboardData(response?.data || null);
    } catch (error) {
      CustomNotification.showErrorMessage(error);
    } finally {
      handleDisableLoading();
    }
  };

  /* EFFECTS */
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleFinish = async (data: string) => {
    await fetchData({ client: data });
  };

  /* Function to create selectedFilters based on chartType */
  const createSelectedFilters = (chartType: DashboardGraphType, data: any, selectedClient: string | null) => {
    const { name } = data;
    const selectedFilters: { [key: string]: string } = {};

    if (selectedClient) {
      selectedFilters[DashboardFilterKey.client] = selectedClient;
    }

    switch (chartType) {
      case DashboardGraphType.PIE_CHART_USER_FEEDBACK:
        selectedFilters[DashboardFilterKey.userFeedback] = name;
        break;
      case DashboardGraphType.BAR_GARPH_LOCATION:
      case DashboardGraphType.BAR_GARPH_DELIVERY_GROUP:
        selectedFilters[DashboardFilterKey.actionStatus] = ActionStatusKeys.Issue_Reported;
        selectedFilters[chartType === DashboardGraphType.BAR_GARPH_LOCATION ? DashboardFilterKey.location : DashboardFilterKey.deliveryGroup] = name;
        break;
      default:
        break;
    }

    return selectedFilters;
  };

  const handleSelectGarph = async (data: any, chartType: DashboardGraphType) => {
    const selectedFilters = createSelectedFilters(chartType, data, selectedClient);

    LocalStorageUtil.localstorageSetItem(LocalStorageConstants.REPORT_FILTERS, selectedFilters);

    setIsDashboardReport(true);
  };

  const handleUserNameClick = async (record: UnsatisfiedUserList) => {
    const selectedFilters = { [DashboardFilterKey.client]: record?.client_name, [DashboardFilterKey.userName]: record?.user_name };
    LocalStorageUtil.localstorageSetItem(LocalStorageConstants.REPORT_FILTERS, selectedFilters);

    setIsDashboardReport(true);
  };

  const handleBack = () => {
    setIsDashboardReport(false);
    LocalStorageUtil.localstorageRemoveItem(LocalStorageConstants.REPORT_FILTERS);
  };

  return {
    loading: loading || loadingClientList || loadingLocationList || loadingDeliveryGroupList,
    dashboardData,
    clientList,
    locationList,
    deliveryGroupList,
    handleFinish,
    locationGraphColor,
    deliveryGroupGraphColor,
    handleSelectGarph,
    isDashboardReport,
    handleBack,
    selectedClient,
    handleUserNameClick
  };
};
