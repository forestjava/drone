# Overview

Battle Drone Simulator (Симулятор боевого дрона) is a web-based 3D drone simulation application built with React and Three.js. The application renders an interactive 3D drone model loaded from FBX files and provides real-time control through both web interface sliders and gamepad integration. Users can manipulate drone parameters including Throttle, Yaw, Pitch, and Roll while viewing the changes in a realistic 3D environment with animated rotor blades and smooth interpolated movements. The interface has been localized to Russian language while keeping aviation terms in English.

# User Preferences

Preferred communication style: Simple, everyday language.
Interface language: Russian (интерфейс переведен на русский язык).

# System Architecture

## Frontend Architecture
- **React 18 + TypeScript**: Modern React application with full TypeScript support for type safety
- **Vite**: Fast development server and build tool with hot module replacement
- **Component Structure**: Modular component architecture with separate concerns for 3D rendering, controls, and gamepad integration

## 3D Rendering System
- **Three.js + React Three Fiber**: Declarative 3D rendering using Three.js through React Three Fiber wrapper
- **FBX Model Loading**: Custom FBXLoader integration for loading rigged 3D drone models with animations
- **Real-time Animation**: Smooth interpolation system for drone rotations and rotor blade spinning based on control inputs
- **Camera System**: Configurable 3D camera with perspective projection and anti-aliasing

## Control Systems
- **Dual Input Support**: Web-based slider controls and gamepad integration through @greact/controller
- **State Management**: Custom React hooks for drone state management with real-time updates
- **Input Mapping**: Gamepad axes mapped to drone controls with proper value scaling and inversion
- **Responsive Controls**: Touch-friendly interface with mobile breakpoint detection

## Styling and UI
- **Tailwind CSS**: Utility-first CSS framework for consistent styling
- **shadcn/ui**: Pre-built React components using Radix UI primitives
- **CSS Custom Properties**: Dynamic theming support with CSS variables
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Asset Management
- **Static Assets**: Public directory structure for 3D models, textures, and audio files
- **Asset Loading**: Vite configuration for handling various asset types (FBX, textures, audio)
- **Performance Optimization**: Asset preloading and efficient memory management for 3D resources

# External Dependencies

## Core Framework Dependencies
- **@react-three/fiber**: React renderer for Three.js enabling declarative 3D programming
- **@react-three/drei**: Helper components and utilities for React Three Fiber
- **@react-three/postprocessing**: Post-processing effects pipeline for enhanced 3D visuals
- **three**: Core 3D graphics library for WebGL rendering

## UI and Styling
- **@radix-ui/**: Complete set of unstyled, accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework for rapid UI development
- **class-variance-authority**: Type-safe variant API for component styling
- **framer-motion**: Animation library for smooth UI transitions

## Input and Control
- **@greact/controller**: Gamepad API integration for React applications
- **cmdk**: Command palette component for enhanced user interactions

## Development Tools
- **@tanstack/react-query**: Server state management and data fetching (configured but minimal usage)
- **@types/**: TypeScript definitions for various libraries
- **@vitejs/plugin-react**: Official Vite plugin for React support
- **vite-plugin-glsl**: GLSL shader support for custom 3D effects

## Utility Libraries
- **clsx**: Conditional className utility for dynamic styling
- **date-fns**: Date manipulation library
- **embla-carousel-react**: Carousel component for UI elements
- **lucide-react**: SVG icon library with React components