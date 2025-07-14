import React, { useEffect, useState } from 'react';
import socket from '../utils/socket';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';

const COLUMNS = ['todo', 'in-progress', 'done'];
const COLUMN_LABELS = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};
const COLUMN_COLORS = {
  todo: 'info',
  'in-progress': 'warning',
  done: 'success',
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:8080/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Connected to Socket.io:', socket.id);
    });

    socket.on('task:updated', ({ taskId, newStatus }) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
      );
    });

    return () => {
      socket.off('connect');
      socket.off('task:updated');
    };
  }, []);

  const onDragEnd = async ({ source, destination, draggableId }) => {
    if (!destination || source.droppableId === destination.droppableId) return;
    const newStatus = destination.droppableId;
    const token = localStorage.getItem('token');

    try {
      await axios.put(
        `http://localhost:8080/api/tasks/${draggableId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      socket.emit('task:update', { taskId: draggableId, newStatus });

      setTasks((prev) =>
        prev.map((t) =>
          t._id === draggableId ? { ...t, status: newStatus } : t
        )
      );
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const grouped = COLUMNS.reduce((acc, col) => {
    acc[col] = tasks.filter((t) => t.status === col);
    return acc;
  }, {});

  return (
    <Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', p: 4 }}>
<Box display="flex" justifyContent="center" alignItems="center" mb={4}>
  <Typography variant="h4" sx={{ color: '#ffffff' }}>
    🚀 Go Team Flow
  </Typography>
</Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {COLUMNS.map((col) => (
            <Grid item xs={12} sm={6} md={4} key={col}>
              <Droppable droppableId={col}>
                {(provided) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    elevation={4}
                    sx={{
                      bgcolor: '#1e1e1e',
                      p: 2,
                      minHeight: '500px',
                      borderRadius: 2,
                      color: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6">{COLUMN_LABELS[col]}</Typography>
                      <Chip label={COLUMN_LABELS[col]} color={COLUMN_COLORS[col]} size="small" />
                    </Box>

                    <Divider sx={{ borderColor: '#333', mb: 2 }} />

                    {grouped[col]?.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              bgcolor: '#2a2a2a',
                              color: 'white',
                              mb: 2,
                              cursor: 'grab',
                              boxShadow: 3,
                              '&:hover': { bgcolor: '#333' },
                            }}
                          >
                            <CardContent>
                              <Typography fontWeight="bold" gutterBottom>
                                {task.title}
                              </Typography>
                              <Typography variant="body2" color="#bbb">
                                {task.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </Paper>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  );
};

export default KanbanBoard;
