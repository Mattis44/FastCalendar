<h1 align="center">
  <img src="./assets/FastCalendarIcon.png" alt="Fast Calendar" width="300" height="300" />
  <br/>
  Fast Calendar
</h1>

<h4 align="center">
  A fast-to-use React Calendar library built for <a href="https://mui.com/" target="_blank">MUI</a>.
</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

-- Gif Demo example --

## Key Features

-   **Fast**: Built with performance in mind, Fast Calendar is optimized for speed and efficiency.
-   **Lightweight**: Minimal dependencies and a small footprint ensure quick load times.
-   **Customizable**: Easily style and configure the calendar to fit your application's design.
-   **Responsive**: Works seamlessly across devices, adapting to different screen sizes.
-   **Easy to Use**: Simple API and clear documentation make integration a breeze.
-   **MUI Integration**: Built specifically for MUI, ensuring a consistent look and feel with your existing components.
-   **Accessibility**: Designed with accessibility in mind, ensuring all users can interact with the calendar.

## How To Use

To use Fast Calendar in your MUI project, follow these steps:

1. **Install the package**:

    ```bash
    npm install @mui/material @mui/styled-engine-sc styled-components fastcalendar
    ```

2. **Import the component**:

    ```javascript
    import { FastCalendar } from "fastcalendar";
    ```

3. **Use the component in your JSX**:
    ```javascript
    <FastCalendar
        onChange={(date) => console.log(date)}
    />
    ```

## Theming

Fast Calendar uses MUI's theming capabilities. You can customize the calendar's appearance by wrapping it in a `ThemeProvider` and passing your theme.

```javascript
// app.tsx (or layout.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { FastCalendar } from "fastcalendar";

const theme = createTheme({
    palette: {
        // Customize your theme here
        mode: "dark",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#f50057",
        },
        background: {
            default: "#121212",
            paper: "#1976d2",
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
);
```
