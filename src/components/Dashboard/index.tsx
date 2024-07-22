import { Card, Col, Row, Select, Space, Spin, Table } from "antd";
import UserFeedbackPieChart from "./UserFeedbackPieChart";
import styles from "./index.module.less";
import { useDashboard } from "./index.module";
import { General } from "../../util/General";
import Loading from "../common/Loading";
import LocationBarChart from "./StackedBarCharts/LocationBarChart";
import DeliveryGroupBarChart from "./StackedBarCharts/DeliveryGroupBarChart";
import Report from "../Report";
import { ColumnsType } from "antd/lib/table";
import { TableHelper } from "../../util/TableHelper";
import { UnsatisfiedUserList } from "../../shared/interface/dashboard.interface";

const Dashboard = () => {
  const config = useDashboard();

  /* Define Column */
  const columns: ColumnsType<UnsatisfiedUserList> = [
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
      render: (text, record) => (
        <div className="gx-link" onClick={() => config?.handleUserNameClick(record)}>
          {TableHelper.getValue(text)}
        </div>
      )
    },
    {
      align: "center",
      title: "Negative Feedback Count",
      dataIndex: "negative_feedback_count",
      key: "negative_feedback_count",
      sorter: {
        compare: TableHelper.valueCompare("negative_feedback_count")
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
      title: "User Location",
      dataIndex: "user_location",
      key: "user_location",
      sorter: {
        compare: TableHelper.valueCompare("user_location")
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
    }
  ];

  return (
    <>
      {!config?.isDashboardReport && (
        <div>
          <Row gutter={[16, 16]} justify="end" align="middle" className={styles["filter-container"]}>
            <Select getPopupContainer={(trigger) => trigger.parentNode} mode="multiple" onChange={config?.handleFinish} placeholder="Select Client" value={config?.selectedClient} style={{ width: "200px" }} allowClear showSearch filterOption={General.searchFilterOnSelect}>
              {config?.clientList?.map((item, index) => (
                <Select.Option value={item?.client_name} key={index}>
                  {item?.client_name}
                </Select.Option>
              ))}
            </Select>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={10}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card className={`gx-card card-container gx-mb-3`} title={<h2 className="h4 gx-mb-0 gx-text-capitalize">NSS ( Net Satisfaction Score )</h2>}>
                    <h1 className="gx-mb-4 gx-mt-3 gx-revenue-title">
                      {config?.loading ? (
                        <div>
                          <Space direction="vertical" className={styles["space--width"]} size="large">
                            <Spin tip="Loading" size="large" />
                          </Space>
                        </div>
                      ) : (
                        General.numberWithCommas(String(config?.dashboardData?.netSatisfactionScore ?? "0"))
                      )}
                    </h1>
                  </Card>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card className={`gx-card card-container gx-mb-3`} title={<h2 className="h4 gx-mb-0 gx-text-capitalize">User Feedback Chart</h2>}>
                    <div className={styles["chart-container-pieChart"]}>{config?.loading ? <Loading /> : <UserFeedbackPieChart data={config?.dashboardData?.userFeedbackChartData} handleSelectGarph={config?.handleSelectGarph} />}</div>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={14}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card className="gx-card card-container gx-mb-3" title={<h2 className="h4 gx-mb-0 gx-text-capitalize">Top 5 Issue Reported By Location</h2>}>
                    <div className={styles["chart-container"]}>{config?.loading ? <Loading /> : <LocationBarChart barChartData={config?.dashboardData?.issueReportedCountByLocation} color={config?.locationGraphColor} handleSelectGarph={config?.handleSelectGarph} />}</div>
                  </Card>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card className="gx-card card-containergx-mb-3" title={<h2 className="h4 gx-mb-0 gx-text-capitalize">Top 5 Issue Reported By Delivery Group</h2>}>
                    <div className={styles["chart-container"]}>{config?.loading ? <Loading /> : <DeliveryGroupBarChart barChartData={config?.dashboardData?.issueReportedCountByDeliveryGroup} color={config?.deliveryGroupGraphColor} handleSelectGarph={config?.handleSelectGarph} />}</div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <Row gutter={[16, 16]}>
            <Col>
              <Card className={`gx-card card-container gx-mb-3`} title={<h2 className="h4 gx-mb-0 gx-text-capitalize">Top 25 Unsatisfied Users</h2>}>
                <Table loading={config?.loading} size="middle" className="gx-table-responsive" columns={columns} dataSource={config?.dashboardData?.unsatisfiedUserList} bordered pagination={false} rowKey="id" />
              </Card>
            </Col>
          </Row> */}
        </div>
      )}

      {config?.isDashboardReport && <Report isDashboard={true} handleBack={config?.handleBack} />}
    </>
  );
};

export default Dashboard;
