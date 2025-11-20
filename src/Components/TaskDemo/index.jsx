import { useState } from "react";
import { TaskContext } from "../../Context";
import { TaskLayer } from "../TaskLayer";

export const TaskDemo = () => {
  const [tasksLayer, setTasksLayer] = useState([
    {
      id: 1,
      title: "Task 1",
      tasks: [
        { id: 1, text: "1", isChecked: false },
        { id: 2, text: "2", isChecked: true },
      ],
    },
    {
      id: 2,
      title: "Task 2",
      tasks: [
        { id: 4, text: "4", isChecked: true },
        { id: 5, text: "5", isChecked: true },
        {
          id: 6,
          text: "asdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdasasdas",
          isChecked: false,
        },
      ],
    },
    {
      id: 3,
      title: "Task 3",
      tasks: [
        { id: 7, text: "7", isChecked: false },
        { id: 8, text: "8", isChecked: false },
        { id: 9, text: "9", isChecked: false },
        { id: 10, text: "10", isChecked: false },
      ],
    },
    {
      id: 4,
      title: "Task 4",
      tasks: [
        { id: 11, text: "7", isChecked: false },
        { id: 12, text: "8", isChecked: false },
        { id: 13, text: "9", isChecked: false },
        { id: 14, text: "10", isChecked: false },
      ],
    },
    {
      id: 5,
      title: "Task 5",
      tasks: [
        { id: 15, text: "7", isChecked: false },
        { id: 16, text: "8", isChecked: false },
        { id: 17, text: "9", isChecked: false },
        { id: 18, text: "10", isChecked: false },
      ],
    },
    {
      id: 6,
      title: "Task 6",
      tasks: [
        { id: 19, text: "7", isChecked: false },
        { id: 20, text: "8", isChecked: false },
        { id: 21, text: "9", isChecked: false },
        { id: 22, text: "10", isChecked: false },
      ],
    },
  ]);

  const handleSetTaskIsChecked = (layerId, taskId) => {
    const newLayer = tasksLayer.find((layer) => layer.id === layerId);
    const newTask = newLayer.tasks.find((task) => task.id === taskId);
    newTask.isChecked = !newTask.isChecked;
  };

  const handleCreateTaskLayer = (task) => {
    console.log(task);
    const newTask = { id: Date.now(), title: task.title, tasks: [] };
    const newLayers = [...tasksLayer, newTask];
    setTasksLayer(newLayers);
  };

  const sortMethods = {
    checked: (a, b) => Number(b.isChecked) - Number(a.isChecked),
    title: (a, b) => a.text.localeCompare(b.text),
    dateCreated: (a, b) => a.id - b.id,
  };

  const handleSort = (sortType, id) => {
    const compareFn = sortMethods[sortType];
    sortTasks(id, compareFn);
  };

  const sortTasks = (id, compareFn) => {
    setTasksLayer((prevLayers) =>
      prevLayers.map((layer) => {
        if (layer.id !== id) return layer;

        return {
          ...layer,
          tasks: [...layer.tasks].sort(compareFn),
        };
      })
    );
  };

  const TaskContextValue = {
    handleSetTaskIsChecked: handleSetTaskIsChecked,
    handleSort: handleSort,
    handleCreateTaskLayer: handleCreateTaskLayer,
  };

  return (
    <>
      <section className="task__demo">
        <div className="task__wrapper">
          <div className="task__nav">
            <nav className="nav__inner">
              <ul className="nav__list">
                <li className="nav__item">
                  <button
                    className="nav__btn"
                    onClick={() => {
                      handleCreateTaskLayer({ title: `title ${1}` });
                    }}
                  >
                    Create new task
                  </button>
                </li>
                <li className="nav__item">
                  <button className="nav__btn">View all</button>
                </li>
                <li className="nav__item">
                  <button className="nav__btn" onClick={() => console.log()}>
                    ...
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <TaskContext.Provider value={TaskContextValue}>
            <TaskLayer tasksLayer={tasksLayer} setTasksLayer={setTasksLayer} />
          </TaskContext.Provider>
        </div>
      </section>
    </>
  );
};
