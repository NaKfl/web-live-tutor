import { StyledTimeSelect } from './styles';
import Button from 'app/components/Button';
import useHooks from './hooks';

const TimeSelect = ({ time, scheduleId, disabled, ...props }) => {
  const { handlers, selectors } = useHooks();
  const { handleSelectTime } = handlers;
  console.log({ scheduleId });
  return (
    <StyledTimeSelect>
      <div>{time}</div>
      {disabled && <Button disabled>Booked</Button>}
      {!disabled && (
        <Button type="accent" onClick={() => handleSelectTime(scheduleId)}>
          Select
        </Button>
      )}
    </StyledTimeSelect>
  );
};
export default TimeSelect;
