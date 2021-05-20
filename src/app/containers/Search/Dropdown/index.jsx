import OptionInDrop from './OptionInDrop';
import { StyledDropDown } from './style';

export const Dropdown = ({ onCheckedTag, option, onChangeFilter }) => {
  return (
    <StyledDropDown>
      <OptionInDrop
        onCheckedTag={onCheckedTag}
        option={option}
        onChangeFilter={onChangeFilter}
      ></OptionInDrop>
    </StyledDropDown>
  );
};

export default Dropdown;
