import { Button, Card, Form, Row, Select, Space, Spin, Tag } from "antd";
import { useReport } from "./index.module";
import { TableHelper } from "../../util/TableHelper";
import Table, { ColumnsType } from "antd/lib/table";
import { GetGarphRecordList } from "../../shared/interface/dashboard.interface";
import { General } from "../../util/General";
// import Loading from "../common/Loading";
import LocalStorageUtil from "../../util/LocalStorageUtil";
import { LocalStorageConstants } from "../../constants/ApplicationConstants/LocalStorageConstants";
import styles from "./index.module.less";

interface ReportProps {
  isDashboard?: boolean;
  handleBack?: any;
}

const Report = (props?: ReportProps) => {
  /* CONSTANT */

  const filters = LocalStorageUtil.localstorageGetItem(LocalStorageConstants.REPORT_FILTERS);

  /* CUSTOM HOOK */
  const config = useReport(props);

  /* Define Column */
  const columns: ColumnsType<GetGarphRecordList> = [
    {
      align: "right",
      title: "SN",
      key: "sn",
      render: (text, record, index) => index + 1
    },
    {
      align: "left",
      title: "Client Name",
      dataIndex: "client_name",
      key: "client_name",
      sorter: {
        compare: TableHelper.valueCompare("client_name")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    },
    {
      align: "left",
      title: "User Name",
      dataIndex: "user_name",
      key: "user_name",
      sorter: {
        compare: TableHelper.valueCompare("user_name")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    },
    {
      align: "left",
      title: "Host Name",
      dataIndex: "host_name",
      key: "host_name",
      sorter: {
        compare: TableHelper.valueCompare("host_name")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    },
    {
      align: "left",
      title: "User Feedback",
      dataIndex: "user_feedback",
      key: "user_feedback",
      sorter: {
        compare: TableHelper.valueCompare("user_feedback")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    },
    {
      align: "left",
      title: "Feedback Date",
      dataIndex: "feedback_date",
      key: "feedback_date",
      sorter: {
        compare: TableHelper.valueCompare("feedback_date")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    },
    {
      align: "left",
      title: "User Comments",
      dataIndex: "user_comments",
      key: "user_comments",
      sorter: {
        compare: TableHelper.valueCompare("user_comments")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    },

    {
      align: "left",
      title: "Incident Number",
      dataIndex: "incident_number",
      key: "incident_number",
      sorter: {
        compare: TableHelper.valueCompare("incident_number")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    },

    {
      align: "left",
      title: "Last Action Taken On",
      dataIndex: "last_action_taken_on",
      key: "last_action_taken_on",
      sorter: {
        compare: TableHelper.valueCompare("last_action_taken_on")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    },
    {
      align: "left",
      title: "Delivery Group",
      dataIndex: "delivery_group",
      key: "delivery_group",
      sorter: {
        compare: TableHelper.valueCompare("delivery_group")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    },
    {
      align: "left",
      title: "Action Status",
      dataIndex: "action_status",
      key: "action_status",
      sorter: {
        compare: TableHelper.valueCompare("action_status")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    },
    {
      align: "left",
      title: "Department",
      dataIndex: "department",
      key: "department",
      sorter: {
        compare: TableHelper.valueCompare("department")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    },
    {
      align: "left",
      title: "User Location",
      dataIndex: "user_location",
      key: "user_location",
      sorter: {
        compare: TableHelper.valueCompare("user_location")
      },
      render: (text, record) => <div>{TableHelper.getValue(text)}</div>
    }
  ];

  return (
    <>
      <Card
        className="gx-card card--height"
        title={props?.isDashboard ? null : <h2 className="h2 gx-mb-0 gx-text-capitalize">Report</h2>}
        extra={
          props?.isDashboard ? null : (
            <Row gutter={24} justify={"end"} align={"middle"}>
              <Form layout="inline" onFinish={config?.handleFinish}>
                <Form.Item name="client">
                  <Select getPopupContainer={(trigger) => trigger.parentNode} placeholder="Select Client" style={{ minWidth: "200px" }} allowClear={true} showSearch={true} filterOption={General.searchFilterOnSelect}>
                    {config?.clientList?.map((item, index) => {
                      return (
                        <Select.Option value={item?.client_name} key={index}>
                          {item?.client_name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item name="location">
                  <Select getPopupContainer={(trigger) => trigger.parentNode} placeholder="Select Location" style={{ minWidth: "200px" }} allowClear={true} showSearch={true} filterOption={General.searchFilterOnSelect}>
                    {config?.locationList?.map((item, index) => {
                      return (
                        <Select.Option value={item?.user_location} key={index}>
                          {item?.user_location}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item name="deliveryGroup">
                  <Select getPopupContainer={(trigger) => trigger.parentNode} placeholder="Select Delivery Group" style={{ minWidth: "200px" }} allowClear={true} showSearch={true} filterOption={General.searchFilterOnSelect}>
                    {config?.deliveryGroupList?.map((item, index) => {
                      return (
                        <Select.Option value={item?.delivery_group} key={index}>
                          {item?.delivery_group}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button disabled={config?.loading} className={`gx-mb-0 gx-btn button-gradiant`} htmlType="submit">
                    Go
                  </Button>
                </Form.Item>
              </Form>
            </Row>
          )
        }
      >
        {props?.isDashboard && (
          <div className={styles["dashboard-report-container"]}>
            <div className={styles["dashboard-report-back"]}>
              <Button className={`gx-mb-0 gx-btn button-gradiant`} onClick={props?.handleBack}>
                Back
              </Button>
            </div>
            <div className={styles["dashboard-report-filters"]}>
              {filters?.client && (
                <Tag color="success" className={styles["dashboard-report-tag"]}>
                  {filters?.client}
                </Tag>
              )}
              {filters?.userName && (
                <Tag color="success" className={styles["dashboard-report-tag"]}>
                  {filters?.userName}
                </Tag>
              )}
              {filters?.userFeedback && (
                <Tag color="success" className={styles["dashboard-report-tag"]}>
                  {filters?.userFeedback}
                </Tag>
              )}
              {filters?.location && (
                <Tag color="success" className={styles["dashboard-report-tag"]}>
                  {filters?.location}
                </Tag>
              )}
              {filters?.deliveryGroup && (
                <Tag color="success" className={styles["dashboard-report-tag"]}>
                  {filters?.deliveryGroup}
                </Tag>
              )}
              {filters?.actionStatus && (
                <Tag color="success" className={styles["dashboard-report-tag"]}>
                  {filters?.actionStatus}
                </Tag>
              )}
            </div>
          </div>
        )}

        <Table loading={config?.loading} size="middle" className="gx-table-responsive" columns={columns} dataSource={config?.recordList} bordered pagination={false} rowKey="id" />
        <div ref={config?.observerTarget}></div>
        {!config?.loading && config?.infiniteScroll.loading && (
          <div className="loading" style={{ margin: "auto", marginTop: "20px" }}>
            <Space direction="vertical" className="space--width" size="large">
              <Spin tip="Loading" size="large" />
            </Space>
          </div>
        )}
      </Card>
    </>
  );
};

export default Report;
