import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { useIntl } from "react-intl";

// مكون لعرض المحتوى بناءً على التبويب النشط
const TabPanel = ({ value, index, children }) => (
  <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const TaskStatus = ({ tasks }) => {
  const [value, setValue] = useState(0);
  const intl = useIntl();

  // تغيير التبويب
  const handleChange = (event, newValue) => setValue(newValue);

  // تصفية المهام بناءً على حالتها
  const filteredTasks = (status) => {
    if (!tasks) return []; // إذا كانت tasks غير معرفة أو فارغة
    if (status === "active") return tasks.filter((task) => !task.completed);
    if (status === "completed") return tasks.filter((task) => task.completed);
    return tasks;
  };

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Tabs value={value} onChange={handleChange} aria-label="task tabs">
        <Tab label={intl.formatMessage({ id: "taskStatus.all" })} />
        <Tab label={intl.formatMessage({ id: "taskStatus.active" })} />
        <Tab label={intl.formatMessage({ id: "taskStatus.completed" })} />
      </Tabs>

      <TabPanel value={value} index={0}>
        {filteredTasks("all").length === 0 ? (
          <Typography>
            {intl.formatMessage({ id: "taskStatus.noTasks" })}
          </Typography>
        ) : (
          filteredTasks("all").map((task) => (
            <Typography key={task.id}>{task.name}</Typography>
          ))
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {filteredTasks("active").length === 0 ? (
          <Typography>
            {intl.formatMessage({ id: "taskStatus.noActiveTasks" })}
          </Typography>
        ) : (
          filteredTasks("active").map((task) => (
            <Typography key={task.id}>{task.name}</Typography>
          ))
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
        {filteredTasks("completed").length === 0 ? (
          <Typography>
            {intl.formatMessage({ id: "taskStatus.noCompletedTasks" })}
          </Typography>
        ) : (
          filteredTasks("completed").map((task) => (
            <Typography key={task.id}>{task.name}</Typography>
          ))
        )}
      </TabPanel>
    </Box>
  );
};

export default TaskStatus;
