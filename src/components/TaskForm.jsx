import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
  Collapse,
  Typography,
} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useIntl } from "react-intl";

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState(null);
  const [reminder, setReminder] = useState(false);
  const [notes, setNotes] = useState("");
  const [expanded, setExpanded] = useState(false);
  const intl = useIntl();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask({
        name: taskName,
        priority,
        dueDate: dueDate ? dueDate.toISOString() : null,
        reminder,
        notes,
      });
      setTaskName("");
      setPriority("medium");
      setDueDate(null);
      setReminder(false);
      setNotes("");
      setExpanded(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Stack direction="row" spacing={1}>
        <TextField
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder={intl.formatMessage({ id: "taskForm.newTask" })}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 1,
            }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: '#33b5e5',
            '&:hover': {
              bgcolor: '#0099cc',
            },
            borderRadius: 1,
            px: 3,
          }}
        >
          {intl.formatMessage({ id: "taskForm.add" })}
        </Button>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          size="small"
          sx={{ ml: 1 }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Stack>

      <Collapse in={expanded}>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <FormControl size="small">
            <InputLabel>{intl.formatMessage({ id: "taskForm.priority" })}</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
              value={dueDate}
              onChange={setDueDate}
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider>

          <TextField
            multiline
            rows={2}
            size="small"
            label={intl.formatMessage({ id: "taskForm.notes" })}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Stack>
      </Collapse>
    </Box>
  );
};

export default TaskForm;
