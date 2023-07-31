# Introduction 

## Technologies used

This project is built with a range of technologies that provide a robust, modern development experience. Here are some of the key technologies used:

- [PNPM](https://pnpm.io/) - A fast, disk-efficient package manager
- [TypeScript](https://www.typescriptlang.org/): A statically typed superset of JavaScript that adds optional types.
- [Express](https://expressjs.com/): A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [MongoDB](https://www.mongodb.com/): A source-available cross-platform document-oriented database program, classified as a NoSQL database program.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Vite](https://vitejs.dev/): A build tool that aims to provide a faster and leaner development experience for modern web projects.
- [Jest](https://jestjs.io/): A JavaScript testing framework with a focus on simplicity.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro): A set of helpers for testing React components without relying on their implementation details.
- [Storybook](https://storybook.js.org/): An open-source tool for developing UI components in isolation and documenting them.


## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later)
- [PNPM](https://pnpm.io/) (version 8 or later)

You can install PNPM globally with the following command:

```bash
npm install -g pnpm
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lsicca/monorepo.git
```
2. Install the project dependencies:
```bash
cd monorepo
pnpm install
```
3. Start the application:
```bash
pnpm run dev
```

## Project structure


This project is structured using a monorepo approach, which helps us to organize our codebase into isolated, yet interconnected packages. This approach provides a number of advantages, including shared dependencies, atomic commits across different parts of the project, and simplified testing and deployment processes.

The project consists of several workspaces, each serving a specific purpose:

1. `applications/frontend`: This workspace contains the React application. It's where we manage the user interface of our web application.

2. `applications/backend`: This workspace is responsible for everything related to the server-side. It's where we handle API requests, connect to the database, and perform server-side logic.

3. `packages/ui`: This workspace is a library of reusable UI components. It's where we define and style the visual elements that are used across the frontend application.

4. `packages/types`: This workspace is dedicated to TypeScript type definitions that are shared across different workspaces.

Each workspace has its own `src` directory and `package.json` file, and can be developed and tested independently. Yet, thanks to Yarn Workspaces, they can also seamlessly work together and share common dependencies.


## Testing

We believe in the importance of testing to maintain code quality, catch bugs early, and allow for safe refactoring. This project uses a combination of different types of tests to ensure all parts of the application are functioning correctly.

To run the tests:
```bash
pnpm test
```
