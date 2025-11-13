import { createContext, useEffect, useRef, useState } from "react";
import "./Home.css";
import { Header } from "../../Components/Header";
import { Intro } from "../../Components/Intro";
import { TaskLayer } from "../../Components/TaskLayer";
import { TaskDemo } from "../../Components/TaskDemo";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { TaskContext } from "../../Context";

export const Home = () => {
  const [animateSorting] = useAutoAnimate()

  const [tasksLayer, setTasksLayer] = useState([
    {
      id: 1,
      title: "Task 1",
      tasks: [
        { id: 1, text: "1", isChecked: false },
        { id: 2, text: "2", isChecked: true },
        { id: 3, text: "2", isChecked: true },
        { id: 4, text: "2", isChecked: false },
      ],
    },
    // {
    //   id: 2,
    //   title: "Task 2",
    //   tasks: [
    //     { id: 4, text: "4", isChecked: 1 },
    //     { id: 5, text: "5", isChecked: 1 },
    //     { id: 6, text: "6", isChecked: false },
    //   ],
    // },
    // {
    //   id: 3,
    //   title: "Task 3",
    //   tasks: [
    //     { id: 7, text: "7", isChecked: false },
    //     { id: 8, text: "8", isChecked: false },
    //     { id: 9, text: "9", isChecked: false },
    //     { id: 10, text: "10", isChecked: false },
    //   ],
    // },
    // {
    //   id: 4,
    //   title: "Task 4",
    //   tasks: [
    //     { id: 11, text: "7", isChecked: false },
    //     { id: 12, text: "8", isChecked: false },
    //     { id: 13, text: "9", isChecked: false },
    //     { id: 14, text: "10", isChecked: false },
    //   ],
    // },
    // {
    //   id: 5,
    //   title: "Task 5",
    //   tasks: [
    //     { id: 15, text: "7", isChecked: false },
    //     { id: 16, text: "8", isChecked: false },
    //     { id: 17, text: "9", isChecked: false },
    //     { id: 18, text: "10", isChecked: false },
    //   ],
    // },
    // {
    //   id: 6,
    //   title: "Task 6",
    //   tasks: [
    //     { id: 19, text: "7", isChecked: false },
    //     { id: 20, text: "8", isChecked: false },
    //     { id: 21, text: "9", isChecked: false },
    //     { id: 22, text: "10", isChecked: false },
    //   ],
    // },
  ]);

  const addTaskToLayer = (layerId, text) => {
    if (!text.trim()) return;

    setTasksLayer((prev) =>
      prev.map((layer) => {
        if (layer.id !== layerId) return layer;
        const newTask = { id: `task-${Date.now()}`, text, isChecked: false };
        return { ...layer, tasks: [...layer.tasks, newTask] };
      })
    );
  };

  const deleteTaskFromLayer = (layerId, taskId) => {
    setTasksLayer((prev) =>
      prev.map((layer) => {
        if (layer.id !== layerId) return layer;
        return {
          ...layer,
          tasks: layer.tasks.filter((task) => task.id !== taskId),
        };
      })
    );
  };

  const handleSetTaskIsChecked = (layerId, taskId) => {
    const newLayer = tasksLayer.find((layer) => layer.id === layerId);
    const newTask = newLayer.tasks.find((task) => task.id === taskId);
    newTask.isChecked = !newTask.isChecked;
  };

  const hanldeDragDrop = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "layer") {
      const newLayers = [...tasksLayer];
      const [removed] = newLayers.splice(source.index, 1);
      newLayers.splice(destination.index, 0, removed);

      setTasksLayer(newLayers);
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const newLayers = [...tasksLayer];
      const sourceLayer = newLayers.find(
        (layer) => String(layer.id) === String(source.droppableId)
      );

      const copied = Array.from(sourceLayer.tasks);
      const [removed] = copied.splice(source.index, 1);

      copied.splice(destination.index, 0, removed);
      sourceLayer.tasks = copied;
      setTasksLayer(newLayers);
      return;
    }

    const newLayers = [...tasksLayer];

    const sourceLayer = newLayers.find(
      (layer) => String(layer.id) === String(source.droppableId)
    );
    const destLayer = newLayers.find(
      (layer) => String(layer.id) === String(destination.droppableId)
    );

    const sourceTasks = Array.from(sourceLayer.tasks);
    const destTasks = Array.from(destLayer.tasks);

    const [moved] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, moved);

    sourceLayer.tasks = sourceTasks;
    destLayer.tasks = destTasks;

    setTasksLayer(newLayers);
  };

  const handleCreateTaskLayer = (task) => {
    console.log(task)
    const newTask = { id: Date.now(), title: task.title, tasks: [] }
    const newLayers = [...tasksLayer, newTask]
    setTasksLayer(newLayers)
  }

  const handleSort = () => {

  }

  const sortCheckedTasks = (id) => {
    setTasksLayer((prevLayers) =>
      prevLayers.map((layer) => {
        if (layer.id === id) {
          const sortedTasks = [...layer.tasks].sort((a, b) => {
            return Number(b.isChecked) - Number(a.isChecked);
          });

          return { ...layer, tasks: sortedTasks };
        }
        return layer;
      })
    );
  }

  return (
    <>
      <Header />
      <Intro />
      <section className="task__demo">
        <div className="task__wrapper">
          <div className="task__nav">
            <nav className="nav__inner">
              <ul className="nav__list">
                <li className="nav__item">
                  <button
                    className="nav__btn"
                    onClick={() => {
                      handleCreateTaskLayer({ title: `title ${1}` })
                    }}>
                    Create new task
                  </button>
                </li>
                <li className="nav__item">
                  <button className="nav__btn">
                    View all
                  </button>
                </li>
                <li className="nav__item">
                  <button
                    className="nav__btn"
                    onClick={() =>
                      sortCheckedTasks(1)}
                  >
                    ...
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <TaskContext.Provider value={{ handleSetTaskIsChecked }}>
            <div className="task__layer">
              <DragDropContext onDragEnd={hanldeDragDrop}>
                <Droppable
                  droppableId="all-layers"
                  type="layer"
                  direction="horizontal"
                >
                  {(provided) => (
                    <div
                      className="layer-droppable"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {tasksLayer.map((layer, index) => (
                        <Draggable
                          key={layer.id}
                          draggableId={`layer-${layer.id}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="layer-item"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskLayer
                                layerId={layer.id}
                                title={layer.title}
                                tasks={layer.tasks}
                                addTask={addTaskToLayer}
                                deleteTask={deleteTaskFromLayer}
                                key={layer.id}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </TaskContext.Provider>
        </div>
      </section>
      <TaskDemo />
    </>
  );
};
