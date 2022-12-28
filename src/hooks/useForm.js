import {useState, useCallback} from "react";

export const useForm = (initialState) => {
    const [form, setForm] = useState(initialState);

    const handleChange = useCallback((values) => {
        setForm((prevState) => ({
            ...prevState,
            ...values
        }))
    }, []);

    return [form, handleChange];
};