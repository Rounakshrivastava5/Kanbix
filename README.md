# Kanbix [In Progress]

Kanbix is a modern, real-time Kanban board application for agile teams. It features collaborative task management, drag-and-drop boards, real-time updates via socket.io, and a beautiful UI built with React, Tailwind CSS, and Material UI.

<img width="1919" height="955" alt="image" src="https://github.com/user-attachments/assets/7108299b-343b-49db-863e-366b29105170" />

<img width="1919" height="953" alt="image" src="https://github.com/user-attachments/assets/b9720ea4-5214-4c5d-a48d-9fe63bf052c8" />
<img width="1919" height="954" alt="image" src="https://github.com/user-attachments/assets/45ab3026-6083-4704-8576-203889c725e1" />
<img width="1919" height="947" alt="image" src="https://github.com/user-attachments/assets/5b9d0071-5cba-40b5-88f5-e78e596662da" />





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
