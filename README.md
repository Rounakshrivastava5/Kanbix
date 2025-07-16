# Kanbix [In Progress]

Kanbix is a modern, real-time Kanban board application for agile teams. It features collaborative task management, drag-and-drop boards, real-time updates via WebSockets, and a beautiful UI built with React, Tailwind CSS, and Material UI.


<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/c20c5e73-01e6-43fa-bd48-33b9212fbfa7" />




<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/05e6410b-6971-4922-b72f-b552c759c689" />



## Features
- 📝 Create, update, and manage tasks in real time
- 🏷️ Drag-and-drop Kanban board (To Do, In Progress, Done)
- 👥 Team and project management
- 🔒 JWT-based authentication & role-based access
- 🌐 Real-time updates with Socket.io
- 🎨 Modern UI with Tailwind CSS & Material UI
- 🗄️ MongoDB backend with Express.js API

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Material UI, Socket.io-client
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.io

## Getting Started

### Prerequisites
- Node.js (v20.19.0 or newer recommended)
- npm
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/go-teamflow.git
   cd go-teamflow/go-teamflow
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables:**
   - Create a `.env` file in the `server/` directory:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=8080
     ```

5. **Start the backend server:**
   ```bash
   cd ../server
   npm run dev
   ```

6. **Start the frontend dev server:**
   ```bash
   cd ../client
   npm run dev
   ```

7. **Open the app:**
   - Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure
```
go-teamflow/
  client/      # React frontend (Vite, Tailwind, MUI)
  server/      # Express backend (API, MongoDB, Socket.io)
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

---
Made with ❤️ for agile teams.
