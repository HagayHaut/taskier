import React from 'react'
import {FaTimes, FaCheckDouble} from 'react-icons/fa'

function Task({ task, onToggle, onDelete, onMarkComplete, isDarkMode }) {

  const { reminder, category, completed, description, date_format, id } = task;

  const taskClassName = () => {
    let result = 'task'
    if(completed) result += ' completed';
    if(reminder) result += ' reminder';
    if(isDarkMode) result += ' dark';
    return result;
  }

  return (
    <div
      className = {taskClassName()}
          onDoubleClick = {() => 
          onToggle(id)}
        >
        <h3>
          {description} {' '}
          <p className="category_tag">{category.name}</p>
          <p className="h4_date">By: {date_format}</p>
            <FaCheckDouble style={{position: "relative", top: -87, left: 348}} title='Mark As Completed' className = {isDarkMode ? 'complete dark' : 'complete'}
              onClick = { () => onMarkComplete(task.id)}
            />
            <FaTimes style={{position: "relative", top: -87, left: 350}} title='Delete Task' className = {isDarkMode ? 'delete dark' : 'delete'} 
              onClick = {() => onDelete(task.id)}
            />
        </h3>
    </div>
  )
}

export default Task