// src/utils/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080'); // Adjust if backend is deployed

export default socket;
