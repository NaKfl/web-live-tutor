import { StyledTimeSelect } from './styles';
import Button from 'app/components/Button';

const TimeSelect = ({ time, disabled, ...props }) => {
  return (
    <StyledTimeSelect>
      <div>{time}</div>
      {disabled && <Button disabled>Booked</Button>}
      {!disabled && <Button type="accent">Select</Button>}
    </StyledTimeSelect>
  );
};
export default TimeSelect;
