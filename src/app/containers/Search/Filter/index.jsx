import { Select } from 'antd';
import { memo } from 'react';
import { useHooks } from './hooks';
import { StyledFilterColumn, StyleFilter } from './style';

const { Option } = Select;

export const Filter = memo(() => {
  const { selectors, handlers } = useHooks();
  const { filterViewData, showHideDropDownState } = selectors;
  const { onChangeFilter, getOptionDefault } = handlers;

  return (
    <StyleFilter>
      {showHideDropDownState && (
        <div className="wrapper">
          {filterViewData.map(type => (
            <StyledFilterColumn key={type.id}>
              <div className="title">{type.title}</div>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder={`Select ${type.title}`}
                optionLabelProp="label"
                key={type.id}
                className="select"
                onChange={category => onChangeFilter(type.title, category)}
                defaultValue={getOptionDefault(type.title)}
              >
                {type.categories.map(category => (
                  <Option
                    value={category.description}
                    label={category.description}
                    key={category.id}
                  >
                    {category.description}
                  </Option>
                ))}
              </Select>
            </StyledFilterColumn>
          ))}
        </div>
      )}
    </StyleFilter>
  );
});

export default Filter;
