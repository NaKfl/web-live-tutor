import { memo, useState } from 'react';
import { StyledSearch, StyledInputSearch, StyledFilterIcon } from './styles';
import { SearchOutlined } from '@ant-design/icons';
import { Dropdown, Checkbox, Menu } from 'antd';
import Button from 'app/components/Button';
import { Overlay } from './Overlay';
import { tutorAccent, coursesOption, levelOption } from './option';
import { NavLink } from 'react-router-dom';
export const Search = memo(({ onSearch }) => {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState({
    level: false,
    accent: false,
    course: false,
  });

  return (
    <StyledSearch>
      <div className="divider">
        <div className="title">
          <div className="content">Find a tutor</div>
          <NavLink to="/?online" activeClassName="selected" exact>
            Online
          </NavLink>
          <NavLink to="/?favorite" activeClassName="selected" exact>
            Favorite
          </NavLink>
        </div>
        <div className="center">
          <StyledInputSearch
            size="large"
            prefix={<SearchOutlined />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            onPressEnter={() => onSearch(search)}
            allowClear
          ></StyledInputSearch>
        </div>
      </div>
      <div className="divider2">
        <Dropdown
          trigger="click"
          overlay={<Overlay options={coursesOption} />}
          visible={visible.course}
        >
          <Button
            onClick={() =>
              setVisible(pre => {
                return { ...pre, course: !pre.course };
              })
            }
          >
            Etutor Course
          </Button>
        </Dropdown>
        <Dropdown
          trigger="click"
          overlay={<Overlay options={levelOption} />}
          visible={visible.level}
        >
          <Button
            onClick={() => setVisible(pre => ({ ...pre, level: !pre.level }))}
          >
            Level
          </Button>
        </Dropdown>
      </div>
    </StyledSearch>
  );
});

export default Search;
