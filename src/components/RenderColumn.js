import React, { Fragment } from 'react'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa'
import RenderTask from './RenderTask'

function RenderColumn({ column, onDrop, handleAddTask, handleDeleteTask, onDragStart, handleTaskClick }) {
    return (
        <motion.div
            className="column bg-gray-100 rounded-lg shadow-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => onDrop(event, column.id)}
        >
            <div className="flex justify-between items-center mb-4 border-b pb-1">
                <h2 className="text-xl font-bold">{column.title}</h2>
                <button
                    onClick={() => handleAddTask(column.id)}
                    className="p-2 bg-blue-500 text-white rounded"
                >
                    <FaPlus />
                </button>
            </div>
            {column.tasks.map((task, index) => (
                <Fragment key={`${column.id}-${index}`}>
                    <RenderTask
                        task={task}
                        columnId={column.id}
                        index={index}
                        handleDeleteTask={handleDeleteTask}
                        onDragStart={onDragStart}
                        handleTaskClick={handleTaskClick}
                    />
                </Fragment>
            ))}
        </motion.div>
    )
}

export default RenderColumn
