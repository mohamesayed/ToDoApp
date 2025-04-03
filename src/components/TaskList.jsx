import { Box, Typography, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { useIntl } from "react-intl";

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  const intl = useIntl();
  const [currentTab, setCurrentTab] = useState(0);
  
  const filteredTasks = () => {
    switch (currentTab) {
      case 1: // Active
        return tasks.filter(task => !task.completed);
      case 2: // Completed
        return tasks.filter(task => task.completed);
      default: // All
        return tasks;
    }
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#33b5e5',
            },
            '& .Mui-selected': {
              color: '#33b5e5 !important',
            },
          }}
        >
          <Tab label="ALL" />
          <Tab label="ACTIVE" />
          <Tab label="COMPLETED" />
        </Tabs>
      </Box>

      <Box sx={{ p: 2 }}>
        {filteredTasks().map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
        {filteredTasks().length === 0 && (
          <Typography
            color="text.secondary"
            textAlign="center"
            sx={{ py: 3 }}
          >
            {intl.formatMessage({ id: "taskList.noTasks" })}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default TaskList;
