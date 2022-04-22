import { Typography } from "antd";
import "antd/dist/antd.css";
import "./LOADING_ICON.css";

const { Title } = Typography;

function LOADING_ICON() {
  return (
    <div id="loading-icon">
      <div className="atom">
        <div className="electron" />
        <div className="electron" />
        <div className="electron" />
      </div>
      <Title>Loading...</Title>
    </div>
  );
}

export default LOADING_ICON;
