Ainyx Assignment – Frontend

This repository contains the frontend implementation for the Ainyx Assignment, built using React, TypeScript, Vite, ReactFlow, and Zustand.
The project focuses on clean architecture, predictable state management, and production-ready engineering practices.

🚀 Tech Stack

React + TypeScript

Vite (build & dev tooling)

ReactFlow (graph visualization)

Zustand (state management)

TanStack Query (data fetching)

ESLint (linting)

PostCSS + Tailwind utilities

✅ Engineering Requirements
TypeScript + Linting

TypeScript strict mode is enabled via tsconfig.app.json

ESLint is configured for:

React

TypeScript

React Hooks

Vite Fast Refresh

Prettier can be optionally added for formatting consistency

Required Scripts

The following scripts are available in package.json:

{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}


Script usage:

npm run dev – start local development server

npm run build – create production build

npm run preview – preview production build locally

npm run lint – run ESLint checks

npm run typecheck – run TypeScript type checking without emitting files

🧱 Code Quality & Architecture
Component Structure

The codebase is organized by responsibility:

layout – TopBar, LeftRail

canvas – GraphCanvas, ServiceNode (ReactFlow integration)

inspector – ServiceNodeInspector (runtime/config editing)

data hooks / api – data fetching and mocks

store – global state using Zustand

This structure keeps concerns isolated and easy to scale.

State Management

Zustand is used to manage shared UI and application state such as:

selected node

active inspector tab

mobile drawer visibility

topbar dropdown state

This avoids unnecessary prop drilling across deeply nested components.

ReactFlow State Handling

Nodes and edges are managed via local state

Updates are handled using applyNodeChanges

Inspector updates are applied predictably via controlled state updates

This ensures ReactFlow state remains debuggable and consistent.

📦 Setup Instructions
Prerequisites

Node.js ≥ 18

npm or yarn

Installation
npm install

Run locally
npm run dev


Open http://localhost:5173 in your browser.

🌍 Deployment

The application can be deployed to Vercel using the Vite preset.

Vercel settings:

Framework: Vite

Root Directory: client (if applicable)

Build Command: npm run build

Output Directory: dist

A live deployment can be added optionally.

🧠 Key Decisions

Zustand over Context for predictable and scalable global state

ReactFlow for flexible graph-based UI interactions

Controlled inspector updates to avoid side effects

Strict TypeScript for early error detection and safer refactoring

⚠️ Known Limitations

Backend APIs are mocked for demonstration purposes

No authentication or persistence layer included

Styling is optimized for desktop and modern mobile screens

📌 Optional Improvements

Add keyboard navigation & accessibility enhancements

Add persistence for graph state

Add unit tests for store logic

Introduce Prettier for enforced formatting

📄 License

This project is for evaluation and demonstration purposes only.
