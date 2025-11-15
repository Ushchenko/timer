import "./TaskLayer.css";
import { useEffect, useRef, useState } from "react";
import { TaskLayerItem } from "../TaskLayerItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TaskLayerDeleteItemContext } from "../../Context";

export const TaskLayer = ({ tasksLayer, setTasksLayer }) => {
  const mouseDragScrollRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setTop] = useState(0);

  const isOnDragHandle = (target) => {
    return (
      !!target.closest("[data-rbd-drag-handle-draggable-id]") ||
      !!target.closest("[data-rbd-draggable-id]")
    );
  };

  useEffect(() => {
    const element = mouseDragScrollRef.current;
    if (!element) return;

    const handleMouseDown = (e) => {
      if (isOnDragHandle(e.target)) return;
      setIsDragging(true);
      setStartX(e.pageX - element.offsetLeft);
      setStartY(e.pageY - element.offsetTop);
      setScrollLeft(element.scrollLeft);
      setTop(element.scrollTop);
      element.style.userSelect = "none";
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - element.offsetLeft;
      const y = e.pageY - element.offsetTop;
      const walkX = x - startX;
      const walkY = y - startY;
      element.scrollLeft = scrollLeft - walkX;
      element.scrollTop = scrollTop - walkY;
    };

    const handleMouseUp = (e) => {
      setIsDragging(false);
      element.style.userSelect = "";
    };

    element.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, startY, scrollLeft, scrollTop]);

  const deleteTaskFromLayer = (layerId, taskId) => {
    setTasksLayer((prev) =>
      prev.map((layer) => {
        if (layer.id !== layerId) return layer;

        const taskIndex = layer.tasks.findIndex((t) => t.id === taskId);
        const nextTask =
          layer.tasks[taskIndex + 1] || layer.tasks[taskIndex - 1];
          
        if (nextTask) nextTask.hoverNext?.();

        return {
          ...layer,
          tasks: layer.tasks.map((task) =>
            task.id === taskId ? { ...task, animate: `exit` } : task
          ),
        };
      })
    );

    setTimeout(() => {
      setTasksLayer((prev) =>
        prev.map((layer) => {
          if (layer.id !== layerId) return layer;

          return {
            ...layer,
            tasks: layer.tasks.filter((task) => task.id !== taskId),
          };
        })
      );
    }, 250);
  };

  const addTaskToLayer = (layerId, text) => {
    if (!text.trim()) return;

    setTasksLayer((prev) =>
      prev.map((layer) => {
        if (layer.id !== layerId) return layer;
        const newTask = {
          id: `task-${Date.now()}`,
          text,
          isChecked: false,
          animate: `enter`,
        };
        return { ...layer, tasks: [...layer.tasks, newTask] };
      })
    );
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

  return (
    <div className="task__layer">
      <DragDropContext onDragEnd={hanldeDragDrop}>
        <Droppable droppableId="all-layers" type="layer" direction="horizontal">
          {(provided) => (
            <div
              className={"layer-droppable"}
              ref={(el) => {
                provided.innerRef(el);
                mouseDragScrollRef.current = el;
              }}
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
                      <TaskLayerDeleteItemContext.Provider
                        value={deleteTaskFromLayer}
                      >
                        <TaskLayerItem
                          layerId={layer.id}
                          title={layer.title}
                          tasks={layer.tasks}
                          addTask={addTaskToLayer}
                          key={layer.id}
                        />
                      </TaskLayerDeleteItemContext.Provider>
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
  );
};
