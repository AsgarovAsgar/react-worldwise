# React Worldwise 🌍

A modern React application for exploring and managing cities around the world. Built with React, Vite, and various modern web technologies.

## Features

- 🗺️ Interactive map interface using Leaflet
- 📱 Responsive design
- 🏙️ City management and exploration
- 📅 Date-based city tracking
- 🔄 Real-time data updates
- 🛣️ Client-side routing

## Tech Stack

- React 18
- Vite
- React Router DOM
- Leaflet & React Leaflet
- React Datepicker
- JSON Server (for mock API)

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (version 10 or higher)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

### Development

To start the development server:

```bash
pnpm dev
```

To start the mock API server:

```bash
pnpm server
```

The application will be available at `http://localhost:5173`
The mock API will be available at `http://localhost:8000`

### Building for Production

To create a production build:

```bash
pnpm build
```

To preview the production build:

```bash
pnpm preview
```

## Project Structure

```
src/
├── assets/      # Static assets
├── components/  # Reusable UI components
├── contexts/    # React context providers
├── hooks/       # Custom React hooks
├── pages/       # Page components
└── App.jsx      # Main application component
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm preview` - Preview production build
- `pnpm server` - Start mock API server
- `pnpm lint` - Run ESLint

## Special Thanks

This app is created based on the Ultimate React Course by Jonas Schmedtmann
