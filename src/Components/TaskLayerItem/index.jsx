import "./TaskLayerItem.css";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskItem } from "../TaskItem";
import React, { useContext, useEffect, useState } from "react";
import { TaskLayerDeleteItemContext } from "../../Context";
import { getStyle } from "../../Utils/getStyle";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TaskLayerItemHeader } from "../TaskLayerItemHeader";

export const TaskLayerItem = React.memo(function TaskLayerItem({
  maxWidth,
  layerId,
  title,
  tasks,
  addTask,
  provided,
}) {
  const [isDragDisabled, setIsDragDisabled] = useState(false);

  const [sortAutoAimate, enableSortAutoAnimate] = useAutoAnimate();

  const { cancelDropAnimation } = useContext(TaskLayerDeleteItemContext);

  useEffect(() => {
    enableSortAutoAnimate(false);
  }, [enableSortAutoAnimate]);

  const disableDragOnEdit = () => {
    setIsDragDisabled(true);
  };

  const enableDragOnCloseEdit = () => {
    setIsDragDisabled(false);
  };

  return (
    <section className="task__layer-task">
      <TaskLayerItemHeader
        layerId={layerId}
        title={title}
        addTask={addTask}
        enableSortAutoAnimate={enableSortAutoAnimate}
        provided={provided}
      />
      <Droppable droppableId={`${layerId}`} type="task">
        {(provided) => (
          <>
            <div
              className="task__main"
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ maxWidth: maxWidth }}
            >
              <div className="task__element" ref={sortAutoAimate}>
                {tasks.map((task, index) => (
                  <Draggable
                    key={`task-${task.id}`}
                    draggableId={`task-${task.id}`}
                    index={index}
                    isDragDisabled={task.animate === "exit" || isDragDisabled}
                  >
                    {(provided, snapshot) => {
                      const style = {
                        ...provided.draggableProps.style,
                      };

                      if (cancelDropAnimation && snapshot.isDropAnimating) {
                        style.transitionDuration = `0ms`;
                        style.transition = "none";
                      }
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getStyle(
                            provided.draggableProps.style,
                            snapshot
                          )}
                        >
                          <TaskItem
                            task={task}
                            layerId={layerId}
                            disableDragOnEdit={disableDragOnEdit}
                            enableDragOnCloseEdit={enableDragOnCloseEdit}
                          />
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          </>
        )}
      </Droppable>
    </section>
  );
});
