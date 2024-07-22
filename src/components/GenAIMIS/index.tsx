import { Card, Col, Row } from "antd";

const GenAIMIS = () => {
  /* CONSTANT */
  const genAIUrl = process.env.REACT_APP_GEN_AI_URL;

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card className="gx-card card--height">
          <iframe src={genAIUrl} style={{ minHeight: "75vh", width: "100%", border: "none" }} title="GenAI" />
        </Card>
      </Col>
    </Row>
  );
};

export default GenAIMIS;
