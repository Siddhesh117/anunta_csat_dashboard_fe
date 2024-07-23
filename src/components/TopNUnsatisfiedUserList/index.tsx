import { Button, Card, Col, DatePicker, Form, Row, Select, Table } from "antd";
import { useDashboard } from "../Dashboard/index.module";
import { ColumnsType } from "antd/lib/table";
import { TableHelper } from "../../util/TableHelper";
import { UnsatisfiedUserList } from "../../shared/interface/dashboard.interface";
import Report from "../Report";
import { General } from "../../util/General";

const { RangePicker } = DatePicker;

const TopNUnsatisfiedUserList = () => {
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
        <Row gutter={[16, 16]}>
          <Col>
            <Card
              className={`gx-card card-container gx-mb-3`}
              title={<h2 className="h2 gx-mb-0 gx-text-capitalize">Top N Unsatisfied Users</h2>}
              extra={
                <Row gutter={24} justify={"end"} align={"middle"}>
                  <Form layout="inline" onFinish={config?.handleFinish}>
                    <Form.Item name="unsatisfiedNUsers">
                      <Select getPopupContainer={(trigger) => trigger.parentNode} defaultValue={25} maxTagCount="responsive" placeholder="Select Top N Users" style={{ minWidth: "150px" }} virtual={true} allowClear showSearch filterOption={General.searchFilterOnSelect}>
                        <Select.Option value={5}>{"Top 5"}</Select.Option>
                        <Select.Option value={10}>{"Top 10"}</Select.Option>
                        <Select.Option value={25}>{"Top 25"}</Select.Option>
                        <Select.Option value={50}>{"Top 50"}</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item name="client">
                      <Select getPopupContainer={(trigger) => trigger.parentNode} mode="multiple" maxTagCount="responsive" placeholder="Select Client" style={{ minWidth: "200px" }} dropdownStyle={{ overflowY: "auto" }} virtual={true} allowClear showSearch filterOption={General.searchFilterOnSelect}>
                        {config?.clientList?.map((item, index) => (
                          <Select.Option value={item?.client_name} key={index}>
                            {item?.client_name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item name="rangePicker">
                      <RangePicker style={{ width: "250px" }} />
                    </Form.Item>

                    <Form.Item>
                      <Button disabled={config?.loading} className={`gx-mb-0 gx-btn button-gradiant`} htmlType="submit">
                        Go
                      </Button>
                    </Form.Item>
                  </Form>
                </Row>
              }
            >
              <Table loading={config?.loading} size="middle" className="gx-table-responsive" columns={columns} dataSource={config?.dashboardData?.unsatisfiedUserList} bordered pagination={false} rowKey="id" />
            </Card>
          </Col>
        </Row>
      )}
      {config?.isDashboardReport && <Report isDashboard={true} handleBack={config?.handleBack} />}
    </>
  );
};

export default TopNUnsatisfiedUserList;
