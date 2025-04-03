import {
  Box,
  Checkbox,
  Typography,
  IconButton,
  Collapse,
  Stack,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

const priorityColors = {
  high: '#f44336',
  medium: '#ff9800',
  low: '#4caf50',
};

const TaskItem = ({ task, deleteTask, updateTask }) => {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const intl = useIntl();

  const handleUpdate = () => {
    updateTask(task.id, editedTask);
    setEditing(false);
  };

  const toggleComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const formatDueDate = (date) => {
    if (!date) return '';
    return format(new Date(date), 'MMM d, yyyy h:mm a');
  };

  return (
    <Box
      sx={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          py: 1,
          px: 2,
          gap: 1,
        }}
      >
        <Checkbox
          checked={task.completed}
          onChange={toggleComplete}
          sx={{
            color: '#33b5e5',
            '&.Mui-checked': {
              color: '#33b5e5',
            },
          }}
        />
        
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? 'text.secondary' : 'text.primary',
            }}
          >
            {task.name}
          </Typography>
          {task.dueDate && (
            <Typography variant="caption" color="text.secondary">
              {formatDueDate(task.dueDate)}
            </Typography>
          )}
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label={intl.formatMessage({ id: `priority.${task.priority}` })}
            size="small"
            sx={{
              bgcolor: `${priorityColors[task.priority]}15`,
              color: priorityColors[task.priority],
              fontWeight: 'medium',
            }}
          />
          <IconButton size="small" onClick={() => setEditing(true)}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => deleteTask(task.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Stack>
      </Box>

      <Collapse in={expanded || editing}>
        <Box sx={{ p: 2, bgcolor: 'action.hover' }}>
          {editing ? (
            <Stack spacing={2}>
              <TextField
                fullWidth
                size="small"
                label={intl.formatMessage({ id: "taskItem.name" })}
                value={editedTask.name}
                onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
              />
              
              <FormControl size="small">
                <InputLabel>{intl.formatMessage({ id: "taskForm.priority" })}</InputLabel>
                <Select
                  value={editedTask.priority}
                  onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                  label={intl.formatMessage({ id: "taskForm.priority" })}
                >
                  <MenuItem value="high">{intl.formatMessage({ id: "priority.high" })}</MenuItem>
                  <MenuItem value="medium">{intl.formatMessage({ id: "priority.medium" })}</MenuItem>
                  <MenuItem value="low">{intl.formatMessage({ id: "priority.low" })}</MenuItem>
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label={intl.formatMessage({ id: "taskForm.dueDate" })}
                  value={editedTask.dueDate ? new Date(editedTask.dueDate) : null}
                  onChange={(newDate) => setEditedTask({ ...editedTask, dueDate: newDate?.toISOString() })}
                  slotProps={{ textField: { size: 'small' } }}
                />
              </LocalizationProvider>

              <TextField
                multiline
                rows={2}
                size="small"
                label={intl.formatMessage({ id: "taskForm.notes" })}
                value={editedTask.notes}
                onChange={(e) => setEditedTask({ ...editedTask, notes: e.target.value })}
              />

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                <IconButton onClick={() => setEditing(false)} color="error">
                  <DeleteIcon />
                </IconButton>
                <IconButton onClick={handleUpdate} color="primary">
                  <EditIcon />
                </IconButton>
              </Box>
            </Stack>
          ) : (
            task.notes && (
              <Typography variant="body2" color="text.secondary">
                {task.notes}
              </Typography>
            )
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default TaskItem;
