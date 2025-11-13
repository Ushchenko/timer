import "./TaskLayer.css";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { InputStyle } from "../InputStyle";
import Block from "@uiw/react-color-block";
import { TaskItem } from "../TaskItem";
import { useEffect, useRef, useState } from "react";

export const TaskLayer = ({
  maxWidth,
  layerId,
  title,
  tasks,
  addTask,
  deleteTask,
}) => {
  const [inputValue, setInputValue] = useState("");

  const [lineColor, setLineColor] = useState(`#00a99b`);
  const [isColoPickerVisible, setIsColoPickerVisible] = useState(false);

  const pickerRef = useRef(null);

  useEffect(() => {
    const handeCloseEvent = (evn) => {
      if (pickerRef.current && !pickerRef.current.contains(evn.target))
        setIsColoPickerVisible(false);

      if (evn.key === "Escape" || evn.key === "Enter") {
        setIsColoPickerVisible(false);
      }
    };

    document.addEventListener("mousedown", handeCloseEvent);
    document.addEventListener("keydown", handeCloseEvent);

    return () => {
      document.removeEventListener("mousedown", handeCloseEvent);
      document.removeEventListener("keydown", handeCloseEvent);
    };
  }, [isColoPickerVisible]);

  const handleColorChange = (color, evn) => {
    if (evn.target.tagName !== "INPUT") {
      setLineColor(color.hex);
      setIsColoPickerVisible((p) => !p);
    }
    setLineColor(color.hex);
  };

  const createTask = () => {
    addTask(layerId, inputValue);
    setInputValue("");
  };

  return (
    <section className="task__layer-task">
      <Droppable droppableId={`${layerId}`}>
        {(provided) => (
          <>
            <div
              className="task__main"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ maxWidth: maxWidth }}
            >
              <div
                className="task-line"
                style={{ background: lineColor }}
                onClick={() => setIsColoPickerVisible((p) => !p)}
              >
                {isColoPickerVisible && (
                  <div
                    ref={pickerRef}
                    className="task-color__picker"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                    />
                  </div>
                )}
              </div>
              <div className="task-header">
                <h2 className="task-header-title">{title}</h2>
                <div
                  className="task-header-color__picker-button"
                  onClick={() => setIsColoPickerVisible((p) => !p)}
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
              </div>
              <InputStyle
                placeholder={"Type the task"}
                type="name"
                btnText={"Add"}
                customButtonFunc={createTask}
                value={inputValue}
                inputStyleProps={{
                  color: "#000",
                  width: 125,
                  height: 48,
                  paddingRight: 110,
                  marginBottom: 14,
                }}
                buttonStyleProps={{
                  top: 2.5,
                }}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <div className="task__element">
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={`${task.id}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem
                          task={task}
                          layerId={layerId}
                          deleteTask={deleteTask}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          </>
        )}
      </Droppable>
    </section>
  );
};
