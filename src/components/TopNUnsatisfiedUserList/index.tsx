import { Card, Col, Row, Table } from "antd";
import { useDashboard } from "../Dashboard/index.module";
import { ColumnsType } from "antd/lib/table";
import { TableHelper } from "../../util/TableHelper";
import { UnsatisfiedUserList } from "../../shared/interface/dashboard.interface";
import Report from "../Report";

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
            {!config?.isDashboardReport && (<Row gutter={[16, 16]}>
                <Col>
                    <Card className={`gx-card card-container gx-mb-3`} title={<h2 className="h4 gx-mb-0 gx-text-capitalize">Top 25 Unsatisfied Users</h2>}>
                        <Table loading={config?.loading} size="middle" className="gx-table-responsive" columns={columns} dataSource={config?.dashboardData?.unsatisfiedUserList} bordered pagination={false} rowKey="id" />
                    </Card>
                </Col>
            </Row>)}
            {config?.isDashboardReport && <Report isDashboard={true} handleBack={config?.handleBack} />}
        </>
    );
};

export default TopNUnsatisfiedUserList;
