import React, { useContext, useEffect, useRef, useState } from "react";
import "./TaskItem.css";
import { TaskContext } from "../../Context";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { TaskLayerDeleteItemContext } from "../../Context";

const EditableTask = ({
  closeItemEditable,
  dialogPos,
  enableDragOnCloseEdit,
  taskText,
  onSave,
}) => {
  const dialogRef = useRef(null);
  const textareaRef = useRef(null);

  const [taskEditText, setTaskEditText] = useState(taskText);

  useEffect(() => {
    document.body.classList.add("modal-open");

    const handleKey = (e) => {
      if (e.key === "Escape") closeItemEditable();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKey);
    };
  }, [closeItemEditable]);

  useEffect(() => {
    const el = document.scrollingElement || document.body;

    const prev = el.style.overflow;
    el.style.overflow = "hidden";

    return () => {
      el.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const closeOnOutside = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      closeItemEditable();
      enableDragOnCloseEdit();
    }
  };

  return (
    <div className="editable-overlay" onMouseDown={closeOnOutside}>
      <div
        ref={dialogRef}
        className="editable-dialog anchored"
        style={{
          position: "absolute",
          top: dialogPos.top + "px",
          left: dialogPos.left + "px",
        }}
      >
        <form>
          <div className="editable-item__card">
            <textarea
              ref={textareaRef}
              className="editable-item__textarea"
              placeholder={taskEditText}
              onChange={(e) => {
                setTaskEditText(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
          </div>

          <div className="actions__btn-wrapper">
            <button
              className="actions__btn -save"
              onClick={(e) => {
                e.preventDefault();
                onSave(taskEditText);
                enableDragOnCloseEdit();
                closeItemEditable();
              }}
            >
              Save
            </button>
            <button
              className="actions__btn -close"
              onClick={() => {
                closeItemEditable();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const TaskItem = React.memo(function TaskItem({
  task,
  layerId,
  disableDragOnEdit,
  enableDragOnCloseEdit,
}) {
  const hoverTaskRef = useRef(null);

  const [isBoxChecked, setIsBoxChecked] = useState(task.isChecked);
  const [isEditItemVisible, setIsEditItemVisible] = useState(false);
  const [isCheckboxHidden, setIsCheckBoxHidden] = useState(true);
  const [isItemEditable, setIsItemEditable] = useState(false);
  const [dialogPos, setDialogPos] = useState(null);

  const { deleteTaskFromLayer } = useContext(TaskLayerDeleteItemContext);

  const { handleSetTaskIsChecked, handleUpdateTaskText } =
    useContext(TaskContext);

  useEffect(() => {
    task.hoverNext = () => {
      setTimeout(() => {
        setIsCheckBoxHidden(false);
        setIsEditItemVisible(true);
      }, 250);
    };
  }, [task]);

  const openEdit = () => {
    const rect = hoverTaskRef.current.getBoundingClientRect();
    setDialogPos({
      top: rect.top,
      left: rect.left,
      width: rect.width,
    });
    setIsItemEditable(true);
  };

  const closeItemEditable = () => {
    setIsCheckBoxHidden(true);
    setIsEditItemVisible(false);
    setIsItemEditable(false);
  };

  return (
    <>
      {isItemEditable ? (
        <div>
          <EditableTask
            closeItemEditable={closeItemEditable}
            dialogPos={dialogPos}
            enableDragOnCloseEdit={enableDragOnCloseEdit}
            taskText={task.text}
            onSave={(newText) =>
              handleUpdateTaskText(layerId, task.id, newText)
            }
          />
          <div className="element__inner">{task.text}</div>
        </div>
      ) : (
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
                onClick={() => {
                  disableDragOnEdit();
                  openEdit();
                }}
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
      )}
    </>
  );
});
