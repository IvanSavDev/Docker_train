import { useState, useCallback } from "react";

const useForm = (initialState) => {
  const [form, setForm] = useState(initialState);

  const handleChange = useCallback((values) => {
    setForm((prevState) => ({
      ...prevState,
      ...values,
    }));
  }, []);

  return [form, handleChange];
};

export default useForm;
