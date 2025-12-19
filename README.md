# **Ainyx Assignment – Frontend**

This repository contains the frontend built using **React, TypeScript, Vite, ReactFlow, and Zustand**.  
The project focuses on **clean architecture**, **predictable state management**, and **production‑ready engineering practices**.

---

## 🚀 **Tech Stack**

- **React + TypeScript**
- **Vite**
- **ReactFlow**
- **Zustand**
- **TanStack Query**
- **ESLint**

---

## **Engineering Requirements**

### **TypeScript + Linting**

- **TypeScript strict mode** is enabled via `tsconfig.app.json`
- **ESLint configured for React + TypeScript**

---

### **Scripts (Required)**

The project provides **all required scripts**:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  }
}
```

- **dev** – start development server  
- **build** – create production build  
- **preview** – preview production build  
- **lint** – run ESLint  
- **typecheck** – run TypeScript type checks  

---

## **Code Quality Expectations**

- **Components split cleanly** by responsibility:
  - **Layout** – TopBar, LeftRail
  - **Canvas** – GraphCanvas, ServiceNode
  - **Inspector** – ServiceNodeInspector
  - **Data hooks / API**
- **Zustand is used instead of prop drilling**
- **ReactFlow state updates are predictable**, using controlled state and `applyNodeChanges`

---

## **Setup Instructions**

```bash
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

---

## **Deployment Link**

**[Vite framework preset](https://ainyx-assignment-omega.vercel.app/)**.

---

## **Key Decisions**

- **Zustand** chosen for global state to avoid prop drilling
- **ReactFlow** used for interactive service graphs
- **Strict TypeScript** for early error detection
- **Controlled state updates** for maintainability

---

## ⚠️ **Known Limitations**

- Backend APIs are **mocked**
- No authentication implemented
