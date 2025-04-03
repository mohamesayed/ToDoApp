import React, { useState, useEffect } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Typography, Button, Container, Paper, IconButton, InputBase } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { IntlProvider } from "react-intl";
import enMessages from "./locales/en.json";
import arMessages from "./locales/ar.json";
import SearchIcon from '@mui/icons-material/Search';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';

const messages = { en: enMessages, ar: arMessages };

const App = () => {
  // Initialize tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  
  const [locale, setLocale] = useState(() => {
    const savedLocale = localStorage.getItem('locale');
    return savedLocale || 'en';
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  // Save user preferences
  useEffect(() => {
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
      localStorage.setItem('locale', locale);
    } catch (error) {
      console.error('Error saving preferences to localStorage:', error);
    }
  }, [darkMode, locale]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#33b5e5",
      },
      background: {
        default: darkMode ? '#303030' : '#f5f5f5',
        paper: darkMode ? '#424242' : '#ffffff',
      },
    },
  });

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      name: taskData.name,
      completed: false,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      reminder: taskData.reminder,
      notes: taskData.notes || "",
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (taskId, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, ...updates }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLocale = () => setLocale(locale === "en" ? "ar" : "en");

  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.notes && task.notes.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            background: "linear-gradient(45deg, #ff4081 0%, #2196f3 100%)",
            minHeight: "100vh",
            py: 4,
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 3,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Paper
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 400,
                  borderRadius: 2,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IconButton sx={{ p: '10px' }}>
                  <SearchIcon />
                </IconButton>
              </Paper>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  onClick={toggleDarkMode}
                  sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'white',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)',
                    },
                    color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
                  }}
                >
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
                <IconButton
                  onClick={toggleLocale}
                  sx={{
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'white',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.9)',
                    },
                    color: theme.palette.mode === 'dark' ? 'white' : 'inherit',
                  }}
                >
                  <LanguageIcon />
                </IconButton>
              </Box>
            </Box>

            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <TaskForm addTask={addTask} />
              <TaskList
                tasks={filteredTasks}
                deleteTask={deleteTask}
                updateTask={updateTask}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </Paper>
          </Container>
        </Box>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default App;
