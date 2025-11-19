import React, { useContext, useEffect, useRef, useState } from "react";
import "./TaskItem.css";
import { TaskContext } from "../../Context";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { TaskLayerDeleteItemContext } from "../../Context";

export const TaskItem = React.memo(function TaskItem({ task, layerId }) {
  const hoverTaskRef = useRef(null);

  const [isBoxChecked, setIsBoxChecked] = useState(task.isChecked);
  const [isEditItemVisible, setIsEditItemVisible] = useState(false);
  const [isCheckboxHidden, setIsCheckBoxHidden] = useState(true);


  const { deleteTaskFromLayer } = useContext(TaskLayerDeleteItemContext);

  const { handleSetTaskIsChecked } = useContext(TaskContext);

  useEffect(() => {
    task.hoverNext = () => {
      setTimeout(() => {
        setIsCheckBoxHidden(false);
        setIsEditItemVisible(true);
      }, 250);
    };
  }, [task]);

  return (
    <>
      <div
        ref={hoverTaskRef}
        className={`element__inner 
          ${task.animate === "enter" ? "task-enter" : ""}
          ${task.animate === "exit" ? "task-exit" : ""}
          ${task.animate === "sort" ? "task-sort" : ""}
        `}
        onMouseEnter={() => {
          setIsCheckBoxHidden(false);
          setIsEditItemVisible(true);
        }}
        onMouseLeave={() => {
          setIsCheckBoxHidden(true);
          setIsEditItemVisible(false);
        }}
      >
        <div className="inner__wrapper">
          <div
            className={`checkbox ${
              isCheckboxHidden && task.isChecked === false
                ? "-hidden"
                : "-checked"
            }`}
            onClick={() => {
              handleSetTaskIsChecked(layerId, task.id);
              setIsBoxChecked((p) => !p);
            }}
          >
            {task.isChecked || isBoxChecked ? (
              <svg
                width="20"
                height="20"
                fill="#09da02ff"
                className="bi bi-check-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              </svg>
            )}
          </div>
          <span
            className={`element-title ${
              isCheckboxHidden && task.isChecked === false
                ? "-hidden"
                : "-checked"
            }`}
          >
            {task.text}
          </span>
          <div className="btn-layer">
            <button
              className={`element-btn -right -upd ${
                isEditItemVisible ? "-editable" : ""
              }`}
            >
              <EditIcon fontSize="inherit" />
            </button>
            <button
              id={`elementBtnAdd-${task.id}`}
              className={`element-btn -right -add ${
                isEditItemVisible ? "-editable" : ""
              }`}
              onClick={() => deleteTaskFromLayer(layerId, task.id)}
            >
              <CloseIcon fontSize="inherit" />
            </button>
          </div>
        </div>
        <span>text</span>
      </div>
    </>
  );
});
