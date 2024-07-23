import { Button, Card, Col, Form, Row, Select, Space, Spin, Table } from "antd";
import UserFeedbackPieChart from "./UserFeedbackPieChart";
import styles from "./index.module.less";
import { useDashboard } from "./index.module";
import { General } from "../../util/General";
import Loading from "../common/Loading";
import LocationBarChart from "./StackedBarCharts/LocationBarChart";
import DeliveryGroupBarChart from "./StackedBarCharts/DeliveryGroupBarChart";
import Report from "../Report";

const Dashboard = () => {
  const config = useDashboard();

  return (
    <>
      {!config?.isDashboardReport && (
        <div>
          <Row gutter={[16, 16]} justify="space-between" align="middle" className={styles["filter-container"]}>
            <h2 className="h2 gx-ml-2  gx-text-capitalize">MIS Dashboard</h2>
            <Form layout="inline" form={config.form} onFinish={config?.handleFinish}>
              <Form.Item name="client">
                <Select getPopupContainer={(trigger) => trigger.parentNode} mode="multiple" maxTagCount="responsive" placeholder="Select Client" style={{ minWidth: "300px" }} dropdownStyle={{ overflowY: "auto" }} virtual={true} allowClear showSearch filterOption={General.searchFilterOnSelect}>
                  {config?.clientList?.map((item, index) => (
                    <Select.Option value={item?.client_name} key={index}>
                      {item?.client_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button disabled={config?.loading} className={`gx-mb-0 gx-btn button-gradiant`} htmlType="submit">
                  Go
                </Button>
              </Form.Item>
            </Form>
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
                  <Card className={`gx-card card-container gx-mb-3`} title={<h2 className="h4 gx-mb-0 gx-text-capitalize">User Feedback Distribution</h2>}>
                    <div className={styles["chart-container-pieChart"]}>{config?.loading ? <Loading /> : <UserFeedbackPieChart data={config?.dashboardData?.userFeedbackChartData} handleSelectGarph={config?.handleSelectGarph} />}</div>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={14}>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card className="gx-card card-container gx-mb-3" title={<h2 className="h4 gx-mb-0 gx-text-capitalize">Top 5 Locations Reporting Issues</h2>}>
                    <div className={styles["chart-container"]}>{config?.loading ? <Loading /> : <LocationBarChart barChartData={config?.dashboardData?.issueReportedCountByLocation} color={config?.locationGraphColor} handleSelectGarph={config?.handleSelectGarph} />}</div>
                  </Card>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card className="gx-card card-containergx-mb-3" title={<h2 className="h4 gx-mb-0 gx-text-capitalize">Top 5 Divisions Reporting Issues</h2>}>
                    <div className={styles["chart-container"]}>{config?.loading ? <Loading /> : <DeliveryGroupBarChart barChartData={config?.dashboardData?.issueReportedCountByDeliveryGroup} color={config?.deliveryGroupGraphColor} handleSelectGarph={config?.handleSelectGarph} />}</div>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}

      {config?.isDashboardReport && <Report isDashboard={true} handleBack={config?.handleBack} />}
    </>
  );
};

export default Dashboard;
