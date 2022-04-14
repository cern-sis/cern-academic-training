import { Typography, Input } from "antd";
import "./SUGGESTION_BOX.css";

const { Title } = Typography;
const { TextArea } = Input;

const handleKeyPress = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
  console.log("handleKeyPress", ev);
};

function SUGGESTION_BOX() {
  return (
    <div className="suggestion-box">
      <Title>Submit a suggestion for future topics</Title>
      <div className="suggestion-box-window">
        <TextArea
          placeholder="What else would you see here?"
          className="custom"
          style={{
            height: 150,
            maxHeight: 150,
            background: "transparent",
            border: "none",
            color: "white",
          }}
          onKeyPress={handleKeyPress}
        />
        <Typography.Link href="/">
          <Title level={2}>Send</Title>
        </Typography.Link>
      </div>
    </div>
  );
}

export default SUGGESTION_BOX;
