import React, { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { initialColumns, itemVariants } from './common/constant';
import RenderColumn from './components/RenderColumn';


function App() {
  const [columns, setColumns] = useState(initialColumns);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const onDragStart = (event, columnId, taskIndex) => {
    event.dataTransfer.setData('columnId', columnId);
    event.dataTransfer.setData('taskIndex', taskIndex);
  };

  const onDrop = (event, columnId) => {
    const sourceColumnId = event.dataTransfer.getData('columnId');
    const taskIndex = event.dataTransfer.getData('taskIndex');
    const sourceColumn = columns.find(column => column.id === sourceColumnId);
    const targetColumn = columns.find(column => column.id === columnId);
    const task = sourceColumn.tasks[taskIndex];

    sourceColumn.tasks.splice(taskIndex, 1);
    targetColumn.tasks.push(task);

    setColumns([...columns]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteTask = (columnId, taskIndex) => {
    const column = columns.find(column => column.id === columnId);
    column.tasks.splice(taskIndex, 1);
    setColumns([...columns]);
  };

  const handleAddTask = (columnId) => {
    const taskTitle = prompt("Masukkan judul task:");
    const taskDescription = prompt("Masukkan deskripsi task:");
    if (taskTitle && taskDescription) {
      const column = columns.find(column => column.id === columnId);
      column.tasks.push({ title: taskTitle, description: taskDescription });
      setColumns([...columns]);
    }
  };

  const filteredColumns = columns.map(column => ({
    ...column,
    tasks: column.tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleClosePopup = () => {
    setSelectedTask(null);
  };
  return (
    <div className="scrumboard grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <div className="col-span-1 sm:col-span-2 md:col-span-3 mb-4">
        <input
          type="text"
          placeholder="Cari tugas..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
      </div>
      {filteredColumns.map(column => (
        <Fragment key={column.id}>
          <RenderColumn
            column={column}
            handleAddTask={handleAddTask}
            onDrop={onDrop}
            handleDeleteTask={handleDeleteTask}
            onDragStart={onDragStart}
            handleTaskClick={handleTaskClick} />
        </Fragment>
      ))}
      {selectedTask && (
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-4 rounded-lg shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-xl font-bold mb-2">{selectedTask.title}</h3>
              <p className="text-gray-600 mb-4">{selectedTask.description}</p>
              <button
                onClick={handleClosePopup}
                className="p-2 bg-red-500 text-white rounded"
              >
                Tutup
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default App;

