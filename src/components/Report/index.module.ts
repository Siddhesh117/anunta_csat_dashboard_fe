import { useEffect, useRef, useState } from "react";
import { LocalStorageConstants } from "../../constants/ApplicationConstants/LocalStorageConstants";
import LocalStorageUtil from "../../util/LocalStorageUtil";
import * as dashboardService from "../../services/dashboardService";
import type { FormDataProps, GetGarphRecordList } from "../../shared/interface/dashboard.interface";
import useGetClientList from "../../hooks/useGetClientList";
import useGetLocationList from "../../hooks/useGetLocationList";
import useGetDeliveryGroupList from "../../hooks/useGetDeliveryGroupList";
import useValue from "../../hooks/useValue";
import { CustomNotification } from "../../util/CustomNotification";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { ErrorMessageConstants } from "../../constants/MessageConstants/ErrorMessageConstants";
import { Pagination } from "../../constants/ApplicationConstants/ReportConstant";
import useGetUsersList from "../../hooks/useGetUsersList";
import moment from "moment-timezone";

export const useReport = (props?: { isDashboard?: boolean }) => {
  /* CONSTANT */
  const observerTarget = useRef(null);
  const filters = LocalStorageUtil.localstorageGetItem(LocalStorageConstants.REPORT_FILTERS);

  /* STATE */
  const [recordList, setRecordList] = useState<GetGarphRecordList[]>([]);
  const [filterOption, setFilterOption] = useState<any>();

  /* CUSTOM HOOKS */
  const { value: loading, handleDisableValue: handleDisableLoading, handleEnableValue: handleEnableLoading } = useValue(true);
  const { loading: loadingClientList, clientList } = useGetClientList();
  const { loading: loadingUserList, userList } = useGetUsersList();
  const { loading: loadingLocationList, locationList } = useGetLocationList();
  const { loading: loadingDeliveryGroupList, deliveryGroupList } = useGetDeliveryGroupList();

  const infiniteScroll = useInfiniteScroll(recordList?.length, observerTarget, handleNextResultSet, loading);

  /* HANDLERS */
  /* 
    function used by infinite scroll, to call next page.
    boolean return means wether to go to next page or not. 
  */
  async function handleNextResultSet(page: number, pageSize: number): Promise<boolean> {
    try {
      // If the initial state is empty, it means the 1st page was not called, so we don't do anything.
      if (!recordList.length) return false;

      let newEntriesFound = true;

      const response = await dashboardService.getSelectedGraphRecordList(filterOption, page, pageSize);

      const newRecords = response?.data;

      if (newRecords?.length === 0) newEntriesFound = false;

      setRecordList((prevState: GetGarphRecordList[]) => {
        const updatedList = [...prevState, ...newRecords];
        return updatedList;
      });

      // If no new entries were found, show an error message.
      if (!newEntriesFound) {
        CustomNotification.showErrorMessage(ErrorMessageConstants.PAGINATION_NO_ENTRIES_FOUND);
        return false;
      }

      return true;
    } catch (error) {
      CustomNotification.showErrorMessage(error);
      return false;
    }
  }

  const fetchData = async (data?: any) => {
    try {
      handleEnableLoading();
      setRecordList([]);
      setFilterOption(data);

      const formattedData = {
        ...data,
        ...(data?.rangePicker?.[0] && data?.rangePicker?.[1]
          ? {
              fromDate: moment(data.rangePicker[0]).format("DD-MM-YYYY"),
              toDate: moment(data.rangePicker[1]).format("DD-MM-YYYY")
            }
          : {})
      };

      const response = await dashboardService.getSelectedGraphRecordList(formattedData, Pagination.INITIAL_PAGE, Pagination.PAGE_SIZE);

      setRecordList(response?.data);
    } catch (error) {
      CustomNotification.showErrorMessage(error);
    } finally {
      handleDisableLoading();
    }
  };

  const handleFinish = async (data: FormDataProps) => {
    infiniteScroll.handleDefault();
    await fetchData({ ...data, ...filters });
  };

  /* EFFECTS */
  useEffect(() => {
    const fetchRecords = async () => {
      infiniteScroll.handleDefault();
      if (props?.isDashboard) {
        await fetchData(filters);
      } else {
        localStorage.clear();
        await fetchData();
      }
    };

    fetchRecords();
    // eslint-disable-next-line
  }, [props?.isDashboard]);

  return {
    loading: loading || loadingClientList || loadingLocationList || loadingDeliveryGroupList || loadingUserList,
    handleFinish,
    recordList,
    clientList,
    locationList,
    deliveryGroupList,
    observerTarget,
    infiniteScroll,
    userList
  };
};
