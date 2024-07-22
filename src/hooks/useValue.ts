import { useState } from "react";

/* common custom hook, used wherever stateful logic requires true/false */
const useValue = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  const handleEnableValue = () => {
    setValue(true);
  };

  const handleDisableValue = () => {
    setValue(false);
  };

  return { value, handleEnableValue, handleDisableValue };
};

export default useValue;
