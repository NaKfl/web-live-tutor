import { Select } from 'antd';

const { Option } = Select;
const children = [];

export const MultiOptions = ({ list = {} }) => {
  Object.keys(list).map(key => {
    children.push(<Option key={key}>{list[key]}</Option>);
    return key;
  });
  return children;
};

export default MultiOptions;
