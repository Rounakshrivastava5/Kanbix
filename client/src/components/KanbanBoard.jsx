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
  Avatar,
  AvatarGroup,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import logoImage from '../assets/Kanbix-logo.png';

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
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'low',
    dueDate: '',
    assignee: '',
  });

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
    fetchTasks();
  }, []);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'low',
      dueDate: '',
      assignee: '',
    });
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:8080/api/tasks', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => [...prev, res.data]);
      handleClose();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  return (
    <Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh',  px: { xs: 1, sm: 3 }, p: 4, overflowX: 'auto' }}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Typography variant="h4" sx={{ color: '#ffffff' }}>
          
        </Typography>
      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Box display="flex" justifyContent="center">
        <Grid container spacing={2}
              sx={{
        maxWidth: '1200px',
        width: '100%',
        mx: 'auto',
      }}
>
          {COLUMNS.map((col) => (
            <Grid item xs={12} sm={6} md={4} key={col}>
              <Droppable droppableId={col}>
                {(provided, snapshot) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    elevation={4}
                    sx={{
                      bgcolor: snapshot.isDraggingOver ? '#2c2c2c' : '#1e1e1e',
                      p: 2,
                      
                      borderRadius: 2,
                      color: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'background 0.2s',
                      flexWrap: { xs: 'nowrap', md: 'wrap' }, // horizontal scroll on mobileminHeight: '100%',
                      minHeight: '100%',
                    }}
                  >
                        {COLUMNS.map((col) => (
      <Grid item xs={10} sm={6} md={4} key={col}>
        {/* column code... */}
      </Grid>
    ))}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6">{COLUMN_LABELS[col]}</Typography>
                      <Chip label={COLUMN_LABELS[col]} color={COLUMN_COLORS[col]} size="small" />
                    </Box>

                    <Divider sx={{ borderColor: '#333', mb: 2 }} />

                    {grouped[col]?.length === 0 && (
                      <Typography variant="body2" align="center" color="gray">
                        No tasks here
                      </Typography>
                    )}

                    {grouped[col]?.map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              bgcolor: '#2a2a2a',
                              color: 'white',
                              mb: 2,
                              cursor: 'grab',
                              boxShadow: snapshot.isDragging ? 6 : 3,
                              opacity: snapshot.isDragging ? 0.85 : 1,
                              '&:hover': { bgcolor: '#333' },
                            }}
                          >
                            <CardContent>
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography fontWeight="bold" gutterBottom>
                                  {task.title}
                                </Typography>
                                <Chip
                                  label={task.priority || 'Low'}
                                  size="small"
                                  color={
                                    task.priority === 'high'
                                      ? 'error'
                                      : task.priority === 'medium'
                                      ? 'warning'
                                      : 'default'
                                  }
                                />
                              </Box>

                              <Typography variant="body2" color="#bbb" mb={1}>
                                {task.description}
                              </Typography>

                              <Typography variant="body2" color="#bbb" mb={1}>
                                {task.assignedTo?.name}
                              </Typography>


                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                <AvatarGroup max={3}>
                                  {task.assigned?.map((user) => (
                                    <Avatar
                                      key={user._id}
                                      alt={user.name}
                                      src={user.avatarUrl}
                                      sx={{ width: 24, height: 24 }}
                                    />
                                  ))}
                                </AvatarGroup>
                                {task.dueDate && (
                                  <Box display="flex" alignItems="center" color="#aaa">
                                    <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                                    <Typography variant="caption">
                                      {new Date(task.dueDate).toLocaleDateString()}
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
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
        </Box>
      </DragDropContext>

      {/* Task Creation Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select name="status" value={formData.status} label="Status" onChange={handleChange}>
              {COLUMNS.map((col) => (
                <MenuItem key={col} value={col}>
                  {COLUMN_LABELS[col]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select name="priority" value={formData.priority} label="Priority" onChange={handleChange}>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dueDate}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Assignee"
            name="assignee"
            fullWidth
            value={formData.assignee}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default KanbanBoard;
