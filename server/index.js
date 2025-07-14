import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http'; // ⬅️ for HTTP server
import { Server } from 'socket.io'; // ⬅️ for WebSocket

// Routes & Models
import authRoutes from './routes/auth.routes.js';
import teamRoutes from './routes/team.routes.js';
import projectRoutes from './routes/project.routes.js';
import taskRoutes from './routes/task.routes.js';
import './models/Team.js';
import './models/Project.js';
import './models/Task.js';

dotenv.config();

const app = express();
const server = http.createServer(app); // ⬅️ create HTTP server
const io = new Server(server, {
  cors: {
    origin: '*', // ✅ allow frontend dev server to connect
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('GoTeamFlow API is live');
});

// 🔌 WebSocket logic
io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);

  // Listen for task updates from clients
  socket.on('task:update', (data) => {
    console.log('📤 Broadcasting task update:', data);
    socket.broadcast.emit('task:updated', data); // send to all except sender
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected:', socket.id);
  });
});

// MongoDB + Start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  server.listen(process.env.PORT || 8080, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 8080}`);
  });
})
.catch((err) => console.error('❌ DB Error:', err));
