import { Select } from "antd";
import "./SORT_MENU.css";
import { SortMethodType } from "../models/lectures";

export const SORT_MENU = ({ handleChange, sortMethod }: {
  handleChange: (value: SortMethodType) => void;
  sortMethod: SortMethodType
}) => {
  const { Option } = Select;

  return (
    <div className="sort-container">
      <Select value={sortMethod} onChange={handleChange}>
        <Option value="relevance" key="relevance">Most relevant</Option>
        <Option value="newest" key="newest">Newest first</Option>
        <Option value="oldest" key="oldest">Oldest first</Option>
      </Select>
    </div>
  );
};
