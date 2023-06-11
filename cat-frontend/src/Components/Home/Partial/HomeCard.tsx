import React from "react";
import { Card, Button } from "antd";

type props = {
  description: string,
  action: () => void,
  buttonText: string,
};
const HomeCard: React.FC<props> = (props) => {
  const { description, action, buttonText } = props;

  return (
    <Card className="home-card">
       <h2>{description}</h2>
        <Button onClick={action}>{buttonText}</Button>
    </Card>
  );
};

export default HomeCard;



