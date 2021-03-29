export const useHooks = props => {
  const handleAddDateSchedule = ({ startTime, endTime }) => {
    console.log('endTime', endTime);
    console.log('startTime', startTime);
  };

  return {
    handlers: { handleAddDateSchedule },
    selectors: {},
  };
};

export default useHooks;
