import "./TaskLayer.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { InputStyle } from "../InputStyle";
import { useState } from "react";

export const TaskLayer = ({ layerId, title, tasks, addTask, deleteTask }) => {
  // console.log({ layerId, title, tasks, addTask, deleteTask });
  const [inputValue, setInputValue] = useState("");

  const createTask = () => {
    addTask(layerId, inputValue);
    setInputValue("");
  };

  return (
    <section className="task__layer-task">
      <Droppable droppableId={String(layerId)}>
        {(provided) => (
          <div
            className="task__main"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="task-title">{title}</h2>
            <div className="task__element">
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={String(task.id)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="element__inner"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="element-title">{task.text}</div>
                      <button
                        className="element-btn -right"
                        onClick={() => deleteTask(layerId, task.id)}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
            {provided.placeholder}
            <InputStyle
              placeholder={"Type the task"}
              type="name"
              btnText={"Add"}
              customFunc={createTask}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </div>
        )}
      </Droppable>
    </section>
  );
};
