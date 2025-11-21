import "./TaskLayerItemHeader.css";
import { InputStyle } from "../InputStyle";
import Block from "@uiw/react-color-block";
import { useContext, useEffect, useRef, useState } from "react";
import { TaskContext } from "../../Context";
import { TaskPopupMenu } from "../TaskPopupMenu";

export const TaskLayerItemHeader = ({
  layerId,
  title,
  addTask,
  enableSortAutoAnimate,
  provided,
}) => {
  const dropdownRef = useRef(null);
  const pickerRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [lineColor, setLineColor] = useState(`#fff`);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isColoPickerVisible, setIsColoPickerVisible] = useState(false);

  const { handleSort } = useContext(TaskContext);

  const sortTasks = (sortType) => {
    enableSortAutoAnimate(true);
    handleSort(sortType, layerId);
    setTimeout(() => {
      enableSortAutoAnimate(false);
    }, 200);
  };

  useEffect(() => {
    const handeClickClose = (evn) => {
      if (dropdownRef.current && !dropdownRef.current.contains(evn.target))
        setIsDropdownVisible(false);

      if (pickerRef.current && !pickerRef.current.contains(evn.target))
        setIsColoPickerVisible(false);
    };

    const handleKeyClose = (evn) => {
      if (evn.key === "Escape" || evn.key === "Enter") {
        setIsDropdownVisible(false);
        setIsColoPickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handeClickClose);
    document.addEventListener("keydown", handleKeyClose);

    return () => {
      document.removeEventListener("mousedown", handeClickClose);
      document.removeEventListener("keydown", handleKeyClose);
    };
  }, [isDropdownVisible, isColoPickerVisible]);

  //color picker change handler
  const handleColorChange = (color, evn) => {
    console.log(evn.target.tagName);
    if (evn.target.tagName !== "INPUT") {
      setLineColor(color.hex);
      setIsColoPickerVisible((p) => !p);
    }
    setLineColor(color.hex);
  };

  //Callbacks
  const activateColorPicker = () => {
    setIsColoPickerVisible((p) => !p);
  };

  const getLineColor = (color) => {
    setLineColor(color);
  };

  const closePopupMenu = () => {
    setIsDropdownVisible(false);
  };

  const CallbacksList = {
    getLineColor: getLineColor,
    activateColorPicker: activateColorPicker,
    closePopupMenu: closePopupMenu,
    sortTasks: sortTasks,
  };

  return (
    <div className="task__layer-task-header">
      <div className="task-line" style={{ background: lineColor }}>
        {isColoPickerVisible && (
          <div ref={pickerRef} className="task-color__picker">
            <Block
              color={lineColor}
              widthBlock={"100%"}
              showMainBlock={false}
              showSmallBlock={true}
              showTriangle={false}
              swatchStyle={{ style: { width: 24, height: 24 } }}
              onChange={(color, evn) => {
                handleColorChange(color, evn);
              }}
            ></Block>
          </div>
        )}
      </div>
      <div
        className="task-header"
        {...provided.dragHandleProps}
        ref={dropdownRef}
      >
        <h2 className="task-header-title">{title}</h2>
        <div className="task-header-popup-wrapper">
          <div
            className={`task-header-popup-button ${
              isDropdownVisible ? "-active" : ""
            }`}
            onClick={() => setIsDropdownVisible((p) => !p)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg>
          </div>
          {isDropdownVisible && (
            <TaskPopupMenu layerId={layerId} CallbacksList={CallbacksList} />
          )}
        </div>
      </div>
      <InputStyle
        placeholder={"Type the task"}
        type="name"
        btnText={"Add"}
        customButtonFunc={() => {
          addTask(layerId, inputValue);
          setInputValue("");
        }}
        value={inputValue}
        inputStyleProps={{
          color: "#000",
          width: 125,
          height: 48,
          paddingRight: 90,
          marginBottom: 14,
        }}
        buttonStyleProps={{
          top: 2.5,
        }}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      ></InputStyle>
    </div>
  );
};
