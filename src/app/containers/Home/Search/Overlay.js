import { Menu, Checkbox, Dropdown } from 'antd';
import { memo } from 'react';
export const Overlay = memo(({ onChange, options, defaultValue }) => {
  return (
    <Menu>
      <Menu.Item>
        <Checkbox.Group
          className="test"
          options={options}
          defaultValue={defaultValue}
          onChange={onChange}
        ></Checkbox.Group>
      </Menu.Item>
    </Menu>
  );
});

export const SelectChoice = memo(() => {
  return;
});
