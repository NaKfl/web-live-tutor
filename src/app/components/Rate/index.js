import { StyledRate } from './styles';
// import PropTypes from 'prop-types';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Rate = ({
  tooltips = desc,
  value,
  onChange,
  allowHalf,
  disabled,
  ...props
}) => {
  return (
    <StyledRate
      tooltips={tooltips}
      disabled={disabled}
      onChange={onChange}
      {...props}
    />
  );
};
// Rate.propTypes = {
//   tooltips: PropTypes.array,
//   value: PropTypes.number,
//   onChange: PropTypes.func,
//   allowHalf: PropTypes.bool,
//   disabled: PropTypes.bool,
// };
export default Rate;
