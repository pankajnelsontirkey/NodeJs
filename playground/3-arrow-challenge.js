const tasks = {
  tasks: [
    { text: 'Grocery Shopping', completed: true },
    { text: 'Clean Yard', completed: false },
    { text: 'Node Course', completed: false }
  ],
  getTasksToDo() {
    return this.tasks.filter(task => !task.completed);
  }
};

console.log(tasks.getTasksToDo());
