import './TaskLayer.css'

export const TaskLayer = ({ task, onDelete }) => {
  return (
    <div className="task-item">
      <div className="task-item__content">
        <h3 className="task-item__title">{task ? task.title : 'ghfghfgas'}</h3>
        <p className="task-item__description">{task ? task.description : 'dfgdfg'}</p>  
      </div>
      <button className="task-item__delete-button" onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  )
}
