# React Cookbook

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Create React App with TypeScript](#create-react-app-with-typescript)
- [Simple Component (Old Style v15)](#simple-component-old-style-v15)
- [Simple Hook Example (v17)](#simple-hook-example-v17)
  - [ESLint React Hooks PlugIn](#eslint-react-hooks-plugin)
- [Storybook](#storybook)

<!-- /code_chunk_output -->

## Create React App with TypeScript

    create-react-app react-tsx --template typescript

## Simple Component (Old Style v15)

```jsx
import React from 'react';
import './App.css';

class App extends React.Component {

  myName = "Webia1";
  constructor (props) {
    super(props);
    this.state = {
      myName: this.myName
    };
  }

```

## Simple Hook Example (v17)

```tsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

### ESLint React Hooks PlugIn

<https://www.npmjs.com/package/eslint-plugin-react-hooks>

    npm install eslint-plugin-react-hooks --save-dev

## Storybook

Storybook is an open source tool for developing UI components in isolation for React, Vue, Angular, and more. [>> Watch Video](https://www.youtube.com/watch?v=p-LFh5Y89eM)

```shell
# INSTALLING

npx sb init  # OR
npx sb init -f # f -> force -> overwrite

# STARTING
# npm script: "storybook": "start-storybook -p 6006 -s public",
npm run storybook

╭─────────────────────────────────────────────────────╮
│                                                     │
│   Storybook 6.1.21 started                          │
│   6.5 s for preview                                 │
│                                                     │
│    Local:            http://localhost:6006/         │
│    On your network:  http://my-ip:6006/             │
│                                                     │
╰─────────────────────────────────────────────────────╯
```
