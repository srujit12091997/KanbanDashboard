// script.js
const KanbanBoard = {
    tasks: {
        crucial: [],
        important: [],
        niceToHave: []
    },
    draggedTask: null,
    currentSection: null,
    
    // Initialize the board
    init() {
        this.loadFromLocalStorage();
        this.renderAllTasks();
        this.setupEventListeners();
    },
    
    // Load saved tasks from localStorage
    loadFromLocalStorage() {
        const savedTasks = localStorage.getItem('kanbanTasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        } else {
            // Initialize with sample tasks if no saved data
            this.tasks = {
                crucial: [
                    { id: 1, title: 'Understanding HTML5 Basics' },
                    { id: 2, title: 'Learn CSS Fundamentals' }
                ],
                important: [
                    { id: 3, title: 'JavaScript Basics' }
                ],
                niceToHave: [
                    { id: 4, title: 'Advanced Animations' }
                ]
            };
            this.saveToLocalStorage();
        }
    },
    
    // Save current state to localStorage
    saveToLocalStorage() {
        localStorage.setItem('kanbanTasks', JSON.stringify(this.tasks));
    },
    
    // Render all tasks in each section
    renderAllTasks() {
        Object.keys(this.tasks).forEach(section => {
            const container = document.getElementById(`${section}-tasks`);
            container.innerHTML = ''; // Clear existing tasks
            
            this.tasks[section].forEach(task => {
                const taskElement = this.createTaskElement(task, section);
                container.appendChild(taskElement);
            });
        });
    },
    
    // Create a single task element
    createTaskElement(task, section) {
        const taskEl = document.createElement('div');
        taskEl.className = 'task';
        taskEl.dataset.taskId = task.id;
        taskEl.draggable = true;
        
        // Create task content
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        taskContent.textContent = task.title;
        
        // Create task controls
        const controls = document.createElement('div');
        controls.className = 'task-controls';
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'task-edit';
        editBtn.innerHTML = '✎';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            this.editTask(task, section);
        };
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'task-delete';
        deleteBtn.innerHTML = '×';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            this.deleteTask(task.id, section);
        };
        
        controls.appendChild(editBtn);
        controls.appendChild(deleteBtn);
        
        taskEl.appendChild(taskContent);
        taskEl.appendChild(controls);
        
        // Add drag event listeners
        this.addDragListeners(taskEl, task, section);
        
        return taskEl;
    },
    
    // Add drag and drop event listeners to task element
    addDragListeners(element, task, section) {
        element.addEventListener('dragstart', (e) => {
            this.draggedTask = { task, fromSection: section };
            element.classList.add('dragging');
            e.dataTransfer.setData('text/plain', task.id);
        });
        
        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
            this.draggedTask = null;
        });
    },
    
    // Handle dropping tasks
    drop(event, section) {
        event.preventDefault();
        if (!this.draggedTask) return;
        
        const { task, fromSection } = this.draggedTask;
        
        // Remove from original section
        this.tasks[fromSection] = this.tasks[fromSection].filter(t => t.id !== task.id);
        
        // Add to new section
        this.tasks[section].push(task);
        
        this.saveToLocalStorage();
        this.renderAllTasks();
    },
    
    // Allow dropping
    allowDrop(event) {
        event.preventDefault();
    },
    
    // Show task edit modal
    editTask(task, section) {
        const newTitle = prompt('Edit task:', task.title);
        if (newTitle && newTitle.trim() !== '') {
            task.title = newTitle.trim();
            this.saveToLocalStorage();
            this.renderAllTasks();
        }
    },
    
    // Delete task
    deleteTask(taskId, section) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks[section] = this.tasks[section].filter(task => task.id !== taskId);
            this.saveToLocalStorage();
            this.renderAllTasks();
        }
    },
    
    // Show add task form
    showAddTaskForm(section) {
        this.currentSection = section;
        const modal = document.getElementById('add-task-modal');
        const input = document.getElementById('new-task-input');
        modal.classList.add('show');
        input.value = '';
        input.focus();
    },
    
    // Hide add task form
    hideAddTaskForm() {
        const modal = document.getElementById('add-task-modal');
        modal.classList.remove('show');
        this.currentSection = null;
    },
    
    // Add new task
    addNewTask() {
        const input = document.getElementById('new-task-input');
        const title = input.value.trim();
        
        if (title && this.currentSection) {
            const newTask = {
                id: Date.now(),
                title: title
            };
            
            this.tasks[this.currentSection].push(newTask);
            this.saveToLocalStorage();
            this.renderAllTasks();
            this.hideAddTaskForm();
        }
    },
    
    // Setup global event listeners
    setupEventListeners() {
        // Close modal when clicking outside
        const modal = document.getElementById('add-task-modal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideAddTaskForm();
            }
        });
        
        // Handle enter key in input
        const input = document.getElementById('new-task-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNewTask();
            }
        });
    }
};

// Initialize the board when the page loads
document.addEventListener('DOMContentLoaded', () => {
    KanbanBoard.init();
});

// Make the allowDrop function globally available for HTML ondragover attribute
function allowDrop(event) {
    KanbanBoard.allowDrop(event);
}