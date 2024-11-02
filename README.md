# Developer Task Dashboard

A modern, interactive Kanban board for managing development tasks with a beautiful user interface and drag-and-drop functionality. Created by Srujit Varasala.

<div align="center">
    <img src="![Snap](https://github.com/user-attachments/assets/815d19ed-1ca2-4464-b077-9c84e6c65b82)
" alt="Developer Dashboard Preview" width="800"/>
</div>

## 🌟 Features

- **Modern UI/UX Design**: Clean and intuitive interface with a professional look
- **Drag & Drop**: Easily move tasks between different status columns
- **Local Storage**: Tasks persist between sessions using browser local storage
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Task Management**:
  - Create new tasks
  - Edit existing tasks
  - Delete tasks
  - Move tasks between columns
- **Priority Columns**:
  - Crucial
  - Important
  - Nice to Have

## 🚀 Getting Started

### Prerequisites

- Modern web browser
- Basic understanding of HTML, CSS, and JavaScript

### Installation

1. Clone the repository:
```bash
git clone https://github.com/srujitv/developer-task-dashboard.git
```

2. Navigate to the project directory:
```bash
cd developer-task-dashboard
```

3. Open `index.html` in your web browser:
```bash
# For macOS
open index.html

# For Linux
xdg-open index.html

# For Windows
start index.html
```

## 🛠️ Project Structure

```
developer-task-dashboard/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js          # JavaScript functionality
└── README.md          # Project documentation
```

## 💻 Usage

1. **Adding a Task**:
   - Click the "+ Add a card" button in any column
   - Enter task details in the modal
   - Press Enter or click "Add"

2. **Moving Tasks**:
   - Drag and drop tasks between columns
   - Tasks will automatically save their new position

3. **Editing Tasks**:
   - Click the edit (✎) icon on any task
   - Update the task title
   - Click save or press Enter

4. **Deleting Tasks**:
   - Click the delete (×) icon on any task
   - Confirm deletion in the prompt

## 🎨 Customization

### Changing Colors

The project uses CSS variables for easy customization. In `styles.css`:

```css
:root {
    --crucial-color: #22c55e;
    --important-color: #eab308;
    --nice-color: #3b82f6;
    --bg-color: #e9d5ff;
    /* ... other variables ... */
}
```

### Adding New Columns

1. Add new column to HTML:
```html
<div class="column new-column" ondragover="allowDrop(event)" ondrop="KanbanBoard.drop(event, 'newColumn')">
    <!-- Column content -->
</div>
```

2. Update JavaScript tasks object:
```javascript
tasks: {
    crucial: [],
    important: [],
    niceToHave: [],
    newColumn: [] // Add new column
}
```

## 🔧 Technical Details

### Local Storage

Tasks are automatically saved to the browser's local storage. The data structure:

```javascript
{
    "crucial": [
        { "id": 1, "title": "Task 1" },
        // ...
    ],
    "important": [
        // ...
    ],
    "niceToHave": [
        // ...
    ]
}
```

### Event Handling

The project uses native HTML5 drag and drop events:
- `dragstart`
- `dragend`
- `dragover`
- `drop`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons provided by [Lucide Icons](https://lucide.dev/)
- Color palette inspired by [Tailwind CSS](https://tailwindcss.com/)
- Drag and Drop functionality based on HTML5 native API

## 📞 Support

For support, email srujit.varasala@gmail.com or open an issue in the repository.

## 👨‍💻 Author

**Srujit Varasala**
- GitHub: [@srujitv](https://github.com/srujitv)
- LinkedIn: [Srujit Varasala](https://linkedin.com/in/srujitv)
- Portfolio: [srujitv.dev](https://srujitv.dev)

---
Made with ❤️ by Srujit Varasala

© 2024 Srujit Varasala. All Rights Reserved.