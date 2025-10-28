import { useEffect, useRef, useState } from "react";
import "./Home.css";
import { Header } from "../../Components/Header";
import { Intro } from "../../Components/Intro";
import { TaskLayer } from "../../Components/TaskLayer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export const Home = () => {
  const [tasksLayer, setTasksLayer] = useState([
    {
      id: 1,
      title: "Task 1",
      tasks: [
        { id: 1, text: "1" },
        { id: 2, text: "2" },
      ],
    },
    {
      id: 2,
      title: "Task 2",
      tasks: [
        { id: 4, text: "1" },
        { id: 5, text: "2" },
        { id: 6, text: "2" },
      ],
    },
    {
      id: 3,
      title: "Task 3",
      tasks: [
        { id: 7, text: "1" },
        { id: 8, text: "2" },
        { id: 9, text: "3" },
        { id: 10, text: "4" },
      ],
    },
  ]);

  const addTaskToLayer = (layerId, text) => {
    if (!text.trim()) return;

    setTasksLayer((prev) =>
      prev.map((layer) => {
        if (layer.id !== layerId) return layer;
        const newTask = { id: `task-${Date.now()}`, text };
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

  const hanldeDragDrop = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const newLayers = [...tasksLayer];
      const sourceLayer = newLayers.find((layer) => String(layer.id) === String(source.droppableId));

      const copied = Array.from(sourceLayer.tasks)
      const [removed] = copied.splice(source.index, 1);

      copied.splice(destination.index, 0, removed);
      sourceLayer.tasks = copied;
      setTasksLayer(newLayers);
      return;
    }
    
    const newLayers = [...tasksLayer];

    const sourceLayer = newLayers.find((layer) => String(layer.id) === String(source.droppableId));
    const destLayer = newLayers.find((layer) => String(layer.id) === String(destination.droppableId));

    const sourceTasks = Array.from(sourceLayer.tasks);
    const destTasks = Array.from(destLayer.tasks);

    const [moved] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, moved);

    sourceLayer.tasks = sourceTasks;
    destLayer.tasks = destTasks;

    setTasksLayer(newLayers);
  };

  return (
    <>
      <Header />
      <Intro />
      <section className="task__demo">
        <div className="task__wrapper">
          <div className="task__nav">
            <nav className="nav__inner">
              <ul className="nav__list">
                <li className="nav__item">Create new task</li>
                <li className="nav__item">View all</li>
                <li className="nav__item">...</li>
              </ul>
            </nav>
          </div>
          <div className="task__layer">
            <DragDropContext onDragEnd={hanldeDragDrop}>
              {tasksLayer.map((layer) => (
                <TaskLayer
                  layerId={layer.id}
                  title={layer.title}
                  tasks={layer.tasks}
                  addTask={addTaskToLayer}
                  deleteTask={deleteTaskFromLayer}
                  key={layer.id}
                />
              ))}
            </DragDropContext>
          </div>
        </div>
      </section>
    </>
  );
};
