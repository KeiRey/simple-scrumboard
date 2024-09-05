export const initialColumns = [
    { id: 'todo', title: 'To Do', tasks: [{ title: 'Task 1', description: 'Deskripsi Task 1' }, { title: 'Task 2', description: 'Deskripsi Task 2' }] },
    { id: 'in-progress', title: 'In Progress', tasks: [{ title: 'Task 3', description: 'Deskripsi Task 3' }] },
    { id: 'done', title: 'Done', tasks: [{ title: 'Task 4', description: 'Deskripsi Task 4' }] },
];


export const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};