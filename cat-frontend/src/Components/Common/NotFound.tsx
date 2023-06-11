import React from "react";
import { Card, Row } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;
const NotFound = () => {
  return (
    <div>
      <Card className="no-data-content">
        <Row className="no-data-content-body">
          <ExclamationCircleOutlined className="no-data-icon" />
          <Meta
            title="Not Found"
            description="The content that you are searching for is either removed or replaced!"
          />
        </Row>
      </Card>
    </div>

  );
};

export default NotFound;