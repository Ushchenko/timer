import "./TaskLayer.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from "react";
import { TaskLayerItem } from "../TaskLayerItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskLayerDeleteItemContext } from "../../Context";
import { TaskContext } from "../../Context";

export const TaskLayer = React.memo(function TaskLayer({
  tasksLayer,
  setTasksLayer,
}) {
  const mouseDragScrollRef = useRef(null);

  const { handleCreateTaskLayer } = useContext(TaskContext);

  const [cancelDropAnimation, setCancelDropAnimation] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setTop] = useState(0);

  const isOnDragHandle = useCallback((target) => {
    return (
      !!target.closest("[data-rfd-drag-handle-draggable-id]") ||
      !!target.closest("[data-rfd-draggable-id]") ||
      !!target.closest("[data-drag-handle]")
    );
  }, []);

  //handle mouse drag to scroll
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
  }, [isDragging, startX, startY, scrollLeft, scrollTop, isOnDragHandle]);

  const deleteLayer = useCallback(
    (layerId) => {
      setTasksLayer((prev) => prev.filter((layer) => layer.id !== layerId));
    },
    [setTasksLayer]
  );

  const deleteTaskFromLayer = useCallback(
    (layerId, taskId) => {
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
        setCancelDropAnimation(true);
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

      setTimeout(() => {
        setCancelDropAnimation(false);
      }, 250);
    },
    [setTasksLayer]
  );

  const deleteContextValue = useMemo(
    () => ({
      deleteLayer,
      deleteTaskFromLayer,
      cancelDropAnimation,
      setCancelDropAnimation,
    }),
    [deleteLayer, deleteTaskFromLayer, cancelDropAnimation]
  );

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

    setTimeout(() => {
      setTasksLayer((prev) => {
        const animatedTasks = prev.find((layer) => layer.id === layerId).tasks;
        const animatedTask = animatedTasks.find(
          (task) => task.animate === "enter"
        );
        animatedTask.animate = "";
        return [...prev];
      });
    }, 250);
  };

  const handleDragStart = () => {
    setCancelDropAnimation(true);
  };

  const onDragStart = useCallback(() => {
    handleDragStart();
  }, []);

  const onDragEnd = useCallback(
    (result) => {
      setCancelDropAnimation(false);

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

      const sourceTasks = [...sourceLayer.tasks];
      const destTasks = [...destLayer.tasks];

      const [moved] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, moved);

      sourceLayer.tasks = sourceTasks;
      destLayer.tasks = destTasks;

      setTasksLayer(newLayers);
    },
    [tasksLayer, setTasksLayer]
  );

  return (
    <div className="task__layer" ref={mouseDragScrollRef}>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Droppable droppableId="all-layers" type="layer" direction="horizontal">
          {(provided) => (
            <div
              className={"layer-droppable"}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasksLayer.map((layer, index) => (
                <Draggable
                  key={layer.id}
                  draggableId={`layer-${layer.id}`}
                  index={index}
                >
                  {(provided) => {
                    const style = {
                      ...provided.draggableProps.style,
                    };

                    return (
                      <div
                        className="layer-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={style}
                      >
                        <TaskLayerDeleteItemContext.Provider
                          value={deleteContextValue}
                        >
                          <TaskLayerItem
                            layerId={layer.id}
                            title={layer.title}
                            tasks={layer.tasks}
                            addTask={addTaskToLayer}
                            provided={provided}
                            key={layer.id}
                          />
                          {provided.placeholder}
                        </TaskLayerDeleteItemContext.Provider>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="layer__add -btn">
        <button className="add-btn" onClick={handleCreateTaskLayer}>
          + Add new column
        </button>
      </div>
    </div>
  );
});
