import { memo, useEffect, useState } from 'react';
import { StyledCategory, StyledGroup, StyledTag } from './style';
import Divider from 'app/components/Divider';
import { Badge } from 'antd';

const options = {
  courses: [],
  accents: [
    'North America',
    'Canada',
    'USA ',
    'USA - Southern USA',
    'North America - Other',
    'United Kingdom / Republic of Ireland',
    'British - Received Pronunciation',
    'Ireland',
    'Scotland',
    'British Isles - Other',
    'South Africa',
    'Australia / New Zealand',
    'Australia',
    'New Zealand',
    'Other',
  ],
  specialties: [
    'Friendly conversation',
    'Business English',
    'Public speaking',
    'Test prep (IELTS, TOEFL, etc.)',
    'Grammar instruction',
    'Accent coaching',
    'Correcting speech',
    'Discussing current events',
    'Vocational lessons',
    'Culture (i.e. manners, customs)',
    'Teaching idioms and slang',
  ],
};

export const OptionInDrop = memo(({ option, onChangeFilter }) => {
  const [select, setSelect] = useState(
    option || {
      accents: [],
      specialties: [],
    },
  );
  const onCheckedTagActions = ({ checked, tag, category }) => {
    if (Object?.keys(options)?.includes(category)) {
      setSelect(pre => ({
        ...pre,
        [category]: checked
          ? [...pre[category], tag]
          : pre[category].filter(value => value !== tag),
      }));
    }
  };

  useEffect(() => {
    onChangeFilter(select);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select]);

  return (
    <StyledGroup>
      {Object.keys(options).map((category, index) => (
        <StyledCategory key={category}>
          <div className="title">
            {category}
            <span>
              <Badge
                key={index}
                count={select[category] ? select[category].length : 0}
              ></Badge>
            </span>
          </div>
          {options[category].map(tag => (
            <StyledTag
              key={tag}
              checked={select[category].includes(tag)}
              onChange={checked =>
                onCheckedTagActions({ checked, tag, category })
              }
            >
              {tag}
            </StyledTag>
          ))}
          <Divider></Divider>
        </StyledCategory>
      ))}
    </StyledGroup>
  );
});

export default OptionInDrop;
