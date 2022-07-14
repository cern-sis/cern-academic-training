import { Select } from "antd";
import "./SortMenu.css";
import { SortOptions } from "../models/lectures";

export const SortMenu = ({ handleChange, sortMethod }: {
  handleChange: (value: SortOptions) => void;
  sortMethod: SortOptions
}) => {
  const { Option } = Select;

  return (
    <div className="sort-container">
      <Select value={sortMethod} onChange={handleChange}>
        <Option value={SortOptions.Default} key={SortOptions.Default}>Most relevant</Option>
        <Option value={SortOptions.Newest} key={SortOptions.Newest}>Newest first</Option>
        <Option value={SortOptions.Oldest} key={SortOptions.Oldest}>Oldest first</Option>
      </Select>
    </div>
  );
};
