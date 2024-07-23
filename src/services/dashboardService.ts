import axios from "axios";
import { DashboardClientListAPI, DashboardDataAPI, DashboardDeliveryGroupListAPI, DashboardLocationListAPI, FormDataProps, GetGarphRecordsListAPI, UnsatisfiedNUsersDataAPI } from "../shared/interface/dashboard.interface";

export const getDashboardData = async (data?: FormDataProps) => {
  /* Base Query */
  let query = `${process.env.REACT_APP_API_URL}/dashboard`;

  const queryParams: string[] = [];

  if (data?.client && data?.client.length > 0) {
    queryParams.push(`client=[${data.client}]`);
  }

  if (data?.location) {
    queryParams.push(`location=${data.location}`);
  }

  if (data?.deliveryGroup) {
    queryParams.push(`deliveryGroup=${data.deliveryGroup}`);
  }

  if (data?.unsatisfiedNUsers) {
    queryParams.push(`unsatisfiedNUsers=${data.unsatisfiedNUsers}`);
  }

  if (data?.fromDate) {
    queryParams.push(`fromDate=${data.fromDate}`);
  }

  if (data?.toDate) {
    queryParams.push(`toDate=${data.toDate}`);
  }

  if (queryParams.length > 0) {
    query += `?${queryParams.join("&")}`;
  }

  try {
    const response = await axios.get(query);

    if (response.status !== 200) {
      throw new Error("Error fetching data. Please check your user credentials.");
    }

    return response.data as DashboardDataAPI;
  } catch (error) {
    throw error;
  }
};

export const getClientList = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/client-list`);

    if (response.status !== 200) {
      throw new Error("Error fetching data. Please check your user credentials.");
    }

    return response.data as DashboardClientListAPI;
  } catch (error) {
    throw error;
  }
};

export const getUsersList = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/users-list`);

    if (response.status !== 200) {
      throw new Error("Error fetching data. Please check your user credentials.");
    }

    return response.data as DashboardClientListAPI;
  } catch (error) {
    throw error;
  }
};

export const getLocationList = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/location-list`);

    if (response.status !== 200) {
      throw new Error("Error fetching data. Please check your user credentials.");
    }

    return response.data as DashboardLocationListAPI;
  } catch (error) {
    throw error;
  }
};

export const getDeliveryGroupList = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/delivery-group-list`);

    if (response.status !== 200) {
      throw new Error("Error fetching data. Please check your user credentials.");
    }

    return response.data as DashboardDeliveryGroupListAPI;
  } catch (error) {
    throw error;
  }
};

export const getSelectedGraphRecordList = async (data: FormDataProps, page: number, pageSize: number) => {
  /* Base Query */
  let query = `${process.env.REACT_APP_API_URL}/dashboard/graph-record-list`;

  const queryParams: string[] = [`page=${page}`, `pageSize=${pageSize}`];

  if (data?.client) {
    queryParams.push(`client=[${data.client}]`);
  }

  if (data?.users) {
    queryParams.push(`users=[${data.users}]`);
  }

  if (data?.location) {
    queryParams.push(`location=${data.location}`);
  }

  if (data?.deliveryGroup) {
    queryParams.push(`deliveryGroup=${data.deliveryGroup}`);
  }

  if (data?.userFeedback) {
    queryParams.push(`userFeedback=${data.userFeedback}`);
  }

  if (data?.actionStatus) {
    queryParams.push(`actionStatus=${data.actionStatus}`);
  }

  if (data?.userName) {
    queryParams.push(`userName=${data.userName}`);
  }

  if (data?.searchValue) {
    queryParams.push(`searchValue=${data.searchValue}`);
  }

  if (data?.fromDate) {
    queryParams.push(`fromDate=${data.fromDate}`);
  }

  if (data?.toDate) {
    queryParams.push(`toDate=${data.toDate}`);
  }

  if (queryParams.length > 0) {
    query += `?${queryParams.join("&")}`;
  }

  try {
    const response = await axios.get(query);

    if (response.status !== 200) {
      throw new Error("Error fetching data. Please check your user credentials.");
    }

    return response.data as GetGarphRecordsListAPI;
  } catch (error) {
    throw error;
  }
};
