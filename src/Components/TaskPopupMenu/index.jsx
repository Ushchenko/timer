import "./TaskPopupMenu.css";
import { useContext, useEffect, useState } from "react";
import { TaskLayerDeleteItemContext } from "../../Context";
import CloseIcon from "@mui/icons-material/Close";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const SortPopup = ({ sortTasks }) => {
  return (
    <>
      <li className="sort-popup">
        <ul className="sort-popup__list">
          <li
            className="sort-popup__item"
            onClick={() => {
              sortTasks("checked");
            }}
          >
            <div>By checked</div>
          </li>
          <li
            className="sort-popup__item"
            onClick={() => {
              sortTasks("dateCreated");
            }}
          >
            <div>By date created</div>
          </li>
          <li
            className="sort-popup__item"
            onClick={() => {
              sortTasks("title");
            }}
          >
            <div>By title</div>
          </li>
        </ul>
      </li>
    </>
  );
};

export const TaskPopupMenu = ({ layerId, CallbacksList }) => {
  const [isSortPopupOpen, setIsSortPopupOpen] = useState(false);
  const [sortPopurAnimate, enableSortPopupAnimate] = useAutoAnimate();

  const { deleteLayer } = useContext(TaskLayerDeleteItemContext);
  const { activateColorPicker, closePopupMenu, sortTasks } = CallbacksList;

  return (
    <div className="task-header-popup-menu">
      <header className="popup__header">
        <div className="popup__header -title">Actions with layer</div>
        <button onClick={closePopupMenu}>
          <CloseIcon fontSize="inherit" />
        </button>
      </header>
      <ul className="popup-menu__list" ref={sortPopurAnimate}>
        <li className="popup-list__item" onClick={() => deleteLayer(layerId)}>
          <div>
            <span>Delete task layer</span>
          </div>
        </li>
        <li
          className="popup-list__item"
          onClick={() => setIsSortPopupOpen((p) => !p)}
        >
          <div>
            <span>Sort by...</span>
          </div>
        </li>
        {isSortPopupOpen && <SortPopup sortTasks={sortTasks} />}
        <li
          className="popup-list__item"
          onClick={() => {
            closePopupMenu();
            activateColorPicker();
          }}
        >
          <div>
            <span>Set color</span>
          </div>
        </li>
        <li className="popup-list__item">
          <div>
            <span>hello</span>
          </div>
        </li>
        <li className="popup-list__item">
          <div>
            <span>hello</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
