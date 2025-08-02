# Drone Control Simulator

## Overview

This is a 3D drone control simulator built with React and Three.js. The application provides an interactive interface for controlling a virtual drone in a 3D environment, complete with real-time controls for throttle, yaw, pitch, and roll. The simulator features a modern UI built with shadcn/ui components and includes advanced 3D rendering capabilities for displaying drone models.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the main application framework
- **Three.js with React Three Fiber** for 3D rendering and scene management
- **Vite** as the build tool and development server with hot module replacement
- **Tailwind CSS** for styling with a custom design system using CSS variables
- **shadcn/ui components** built on top of Radix UI primitives for accessible UI components

### Component Structure
- **App.tsx**: Main application container managing the 3D canvas and drone controls
- **DroneViewer**: 3D component responsible for loading and rendering the drone model with real-time rotation updates
- **DroneControls**: UI overlay providing sliders for throttle, yaw, pitch, and roll controls
- **Custom Hooks**: `useDroneState` for managing drone control state with validation and logging

### 3D Rendering Pipeline
- **Canvas Setup**: Three.js canvas with shadows, anti-aliasing, and optimized performance settings
- **Model Loading**: FBX loader with fallback paths for drone models and error handling
- **Lighting System**: Combination of ambient, directional, and point lights for realistic rendering
- **Animation Loop**: useFrame hook for smooth interpolation of drone rotations based on control inputs

### State Management
- **React useState/useCallback**: Local state management for drone controls with proper memoization
- **Custom Hooks**: Centralized drone state logic with validation and console logging for debugging
- **Real-time Updates**: Immediate state updates with smooth interpolation for 3D model rotations

### Backend Architecture
- **Express.js** server with TypeScript support
- **Modular Route System**: Centralized route registration with `/api` prefix pattern
- **Storage Interface**: Abstract storage interface with in-memory implementation for user management
- **Development Middleware**: Request logging, JSON parsing, and error handling

### Database Layer
- **Drizzle ORM** configured for PostgreSQL with type-safe schema definitions
- **Schema Management**: User table with username/password fields and proper constraints
- **Migration System**: Drizzle-kit for database schema migrations and updates

### Development Tools
- **TypeScript Configuration**: Strict type checking with modern ES modules
- **Path Aliases**: Clean import paths for client components and shared utilities
- **Hot Reload**: Vite development server with runtime error overlay
- **Asset Handling**: Support for 3D models (FBX, GLTF), audio files, and GLSL shaders

## External Dependencies

### 3D Graphics and Visualization
- **@react-three/fiber**: React renderer for Three.js providing declarative 3D scene management
- **@react-three/drei**: Helper components and utilities for common Three.js patterns
- **@react-three/postprocessing**: Post-processing effects pipeline for enhanced visual quality
- **three**: Core 3D graphics library with model loaders and rendering capabilities
- **vite-plugin-glsl**: Shader support for custom visual effects

### UI Component Libraries
- **@radix-ui/react-***: Comprehensive set of accessible, unstyled UI primitives
- **@tanstack/react-query**: Server state management with caching and synchronization
- **class-variance-authority**: Type-safe variant management for component styling
- **clsx**: Utility for conditional CSS class names
- **tailwindcss**: Utility-first CSS framework with custom design tokens

### Backend and Database
- **@neondatabase/serverless**: PostgreSQL database adapter optimized for serverless environments
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect support
- **drizzle-kit**: Database migration and schema management tooling
- **connect-pg-simple**: PostgreSQL session store for Express applications

### Development and Build Tools
- **vite**: Fast build tool with ES modules and hot module replacement
- **@vitejs/plugin-react**: Vite plugin for React with Fast Refresh support
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for better debugging
- **tsx**: TypeScript execution environment for development server
- **esbuild**: Fast JavaScript bundler for production builds