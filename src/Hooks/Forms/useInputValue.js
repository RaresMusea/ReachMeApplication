import {useState} from "react";

export default function useInputValue(initialValue) {
    const [inputValue, setInputValue] = useState(initialValue);

    return {inputValue, setInputValue};
}