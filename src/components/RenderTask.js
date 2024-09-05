import React from 'react'
import { motion } from 'framer-motion'
import { FaTrash } from 'react-icons/fa'
import { itemVariants } from '../common/constant';

function RenderTask({task, columnId, index, handleDeleteTask, onDragStart, handleTaskClick}) {
  return (
    <motion.div
      variants={itemVariants}
      key={index}
      className="task bg-white p-2 rounded-lg shadow-sm mb-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      draggable
      onDragStart={(event) => onDragStart(event, columnId, index)}
    >
      <div className="flex justify-between items-center">
        <div onClick={() => handleTaskClick(task)}>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <button
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteTask(columnId, index);
          }}
          className="ml-2 p-1 bg-red-500 text-white rounded"
        >
          <FaTrash />
        </button>
      </div>
    </motion.div>
  )
}

export default RenderTask
