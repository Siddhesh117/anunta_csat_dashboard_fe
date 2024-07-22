import { ReactNode } from "react";
import { Card } from "antd";

interface WidgetProps {
  title?: ReactNode;
  extra?: ReactNode;
  cover?: ReactNode;
  actions?: ReactNode[];
  children: ReactNode;
  styleName?: string;
}

const Widget = ({ title, children, styleName = "", cover, extra, actions }: WidgetProps) => {
  return (
    <Card title={title} actions={actions} cover={cover} className={`gx-card-widget ${styleName}`} extra={extra}>
      {children}
    </Card>
  );
};

export default Widget;
