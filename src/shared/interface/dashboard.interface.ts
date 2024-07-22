export interface FeedbackChartData {
  name: string;
  value: number;
  percentage: string;
}

export interface IssueReportedCount {
  name: string;
  valuse: number;
}

export interface UnsatisfiedUserList {
  client_name: string;
  user_name: string;
  negative_feedback_count: number;
  delivery_group: string;
  user_location: string;
  department: string;
}

export interface DashboardDataInterface {
  userFeedbackChartData: FeedbackChartData[];
  netSatisfactionScore: string;
  issueReportedCountByLocation: IssueReportedCount[];
  issueReportedCountByDeliveryGroup: IssueReportedCount[];
  unsatisfiedUserList: UnsatisfiedUserList[];
}

export interface DashboardDataAPI {
  message: string;
  data: DashboardDataInterface;
}

export interface DashboardClientListAPI {
  message: string;
  data: DashboardClientList[];
}
export interface DashboardDeliveryGroupListAPI {
  message: string;
  data: DashboardDeliveryGroupList[];
}
export interface DashboardLocationListAPI {
  message: string;
  data: DashboardLocationList[];
}

export interface DashboardClientList {
  client_name: string;
}
export interface DashboardDeliveryGroupList {
  delivery_group: string;
}
export interface DashboardLocationList {
  user_location: string;
}

export interface FormDataProps {
  client?: string | null | undefined;
  location?: string | null | undefined;
  deliveryGroup?: string | null | undefined;
  userFeedback?: string | null;
  actionStatus?: string | null;
  userName?: string | null;
}

export interface GetGarphRecordList {
  action_status: string;
  client_name: string;
  delivery_group: string;
  department: string;
  feedback_date: string;
  host_name: string;
  incident_number: string;
  last_action_taken_on: Date | null;
  user_comments: string;
  user_feedback: string;
  user_location: string;
  user_name: string;
}

export interface GetGarphRecordsListAPI {
  message: string;
  data: GetGarphRecordList[];
}
