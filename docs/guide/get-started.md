# Get Started
Fast React Calendar is designed to be easy to use and integrate into your React applications. Follow these steps to get started quickly.
It is made to be used with [Material UI](https://mui.com/material-ui/getting-started/installation/) and is fully compatible with MUI's theming and styling system.

Props and syntax are built to be as close to MUI's components as possible, making it easy to use if you're already familiar with MUI.

## Installation

### Prerequisites
- Ensure you have a [React](https://react.dev) project set up. If you don't have one, you can create a new React app using [Vite](https://vite.dev) (recommended) or your preferred method.
-  Install [Material UI](https://mui.com/material-ui/getting-started/installation/) if you haven't already, as Fast React Calendar is built on top of MUI components.

Install Fast React Calendar using npm:

```bash
npm install fast-react-calendar
```
## Basic Usage

To use Fast React Calendar, import the `FastCalendar` component and include it in your JSX. Here's a simple example:

```jsx
import React from 'react';
import { FastCalendar } from 'fast-react-calendar';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <FastCalendar />
    </div>
  );
}
export default App;
```
This will render a basic calendar with the current month displayed. You can customize it further by passing [props](./props).
