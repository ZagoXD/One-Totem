
# Task Manager

A web-based task management application that allows users to register, log in, and manage their tasks. Users can add, filter, and mark tasks as complete or incomplete. The app also features a responsive design and a scrollable task list for seamless usability.

---

## Features

- **User Authentication**: Register and log in to manage your tasks securely.
- **Task Management**: Add, delete, filter, and mark tasks as complete or incomplete.
- **Dynamic Filtering**: Filter tasks by their status (all, completed, or incomplete).
- **Responsive Design**: Automatically adjusts to screen sizes with a scrollable task list.
- **Real-time Feedback**: Users receive success/error messages for actions like adding, deleting, and updating tasks.

---

## Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (with Bootstrap)
  - JavaScript (Vanilla)
- **Backend**:
  - Node.js (Express)
  - RESTful API endpoints
- **Database**:
  - MongoDB (or your preferred database)
- **Additional Tools**:
  - Font: [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
  - Icons: Bootstrap icons

---

## Installation

### Prerequisites
- **Node.js** and **npm** installed on your machine.
- **MongoDB** or any preferred database for data storage.

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ZagoXD/One-Totem.git
   cd task-manager
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Environment Variables**:
   Create a `.env` file in the root directory and include:
   ```env
   PORT=5000
   MONGO_URI=your_mongo_database_uri
   JWT_SECRET= your_password
   ```

4. **Run the Application**:
   Start the server:
   ```bash
   node server.js
   ```
   The application will be available at [http://localhost:5000](http://localhost:5000).

---

## Usage

1. **Register an Account**:
   - Enter your username and password on the registration form.

2. **Login**:
   - Log in with your credentials to access the task manager.

3. **Manage Tasks**:
   - Add tasks via the input field.
   - Use the dropdown menu to filter tasks by their status.
   - Delete tasks by clicking the delete button.
   - Toggle task completion using the checkbox.

---

## Author

- **Your Name**  
  - Gustavo Zago
  - Github: [@ZagoXD](https://github.com/ZagoXD)  

---

