import "./EditableTask.css";
import { useRef, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const EditableTask = ({
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
                enableDragOnCloseEdit();
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
