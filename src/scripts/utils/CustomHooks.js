import { useState } from "react";

function useInput(defaultValue = "") {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const onResetValueHandler = (value) => {
    setValue(value);
  };

  return [value, onValueChangeHandler, onResetValueHandler];
}

export default useInput;
