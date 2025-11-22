import "./AddTaskLayer.css"
import { useRef, useState, useContext, useEffect } from "react";
import { TaskContext } from "../../../Context";
import { InputStyle } from "../../InputStyle";

export const AddTaskLayer = () => {
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { handleCreateTaskLayer } = useContext(TaskContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreating]);

  useEffect(() => {
    const handleClick = (evn) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(evn.target) &&
        !evn.target.closest(".action-btn")
      )
        setIsCreating(false);
    };

    const handleKey = (evn) => {
      if (evn.key === "Escape") setIsCreating(false);
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleKey);
    };
  }, [setIsCreating]);

  return (
    <div className="layer__add -btn">
      {isCreating ? (
        <div>
          <InputStyle
            ref={inputRef}
            placeholder={"New column..."}
            type="name"
            btnText={"Create"}
            customButtonFunc={() => {
              handleCreateTaskLayer({ title: inputValue });
              setIsCreating(false);
              setInputValue("");
            }}
            value={inputValue}
            inputStyleProps={{
              color: "#000",
              width: 120,
              height: 48,
              paddingRight: 110,
              marginBottom: 14,
            }}
            buttonStyleProps={{
              top: 2.5,
            }}
            onChange={(evn) => {
              setInputValue(evn.target.value);
            }}
          ></InputStyle>
        </div>
      ) : (
        <button
          className="add-btn"
          onClick={() => {
            setIsCreating(true);
          }}
        >
          + Add new column
        </button>
      )}
    </div>
  );
};