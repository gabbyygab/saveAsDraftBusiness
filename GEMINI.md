# GEMINI.md - SaveAsDraft

This document provides instructional context for the SaveAsDraft project, a modern full-stack React application built with React Router v7.

## Project Overview

SaveAsDraft is a production-ready web application for a business offering **Wedding and Events Digital Website Invitations**. The goal is to provide custom-designed, feature-rich digital invitations that serve as a central hub for guests.

### Core Technologies
- **Framework:** [React Router v7](https://reactrouter.com/)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Build Tool:** [Vite v8](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

### Brand Identity & Design
- **Business Concept:** One-pager business front for digital event invitations.
- **Logo:** Located at `app/assets/Logo/image.png`.
- **Color Palette:** Minimalist black and white.
- **Typography:** Elegant, beautiful calligraphy/wedding-style fonts. (e.g., *Great Vibes*, *Playfair Display*, or *Dancing Script* from Google Fonts).
- **Design Philosophy:** Comprehensive, beautiful, and minimalist, leveraging Tailwind CSS for a high-impact visual experience.

### Core Features (to be implemented)
- **Digital Invitations:** Custom designs and colors tailored to the client's event.
- **Guest Features:** Interactive elements like games, RSVP, and a message board for the couple or event hosts.
- **Event Details:** Seamlessly integrated maps, schedules, and information.

## Building and Running
... (rest of the sections) ...

### Development
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Production
1. **Build the application:**
   ```bash
   npm run build
   ```
2. **Start the production server:**
   ```bash
   npm run start
   ```

### Type Checking
Ensure type safety and generate route-specific types:
```bash
npm run typecheck
```

### Docker
The application is containerized and can be built/run using:
```bash
docker build -t saveasdraft .
docker run -p 3000:3000 saveasdraft
```

## Development Conventions

- **File Structure:**
  - `app/`: Contains the main application code.
  - `app/routes/`: Route-specific components and logic.
  - `app/routes.ts`: Central routing configuration.
  - `public/`: Static assets.
- **Routing:** Use the `RouteConfig` API in `app/routes.ts` to define application routes.
- **Styling:** Use Tailwind CSS utility classes. Global styles are managed in `app/app.css`.
- **TypeScript:** Strict typing is encouraged. Use the generated route types (`./+types/...`) for loaders, actions, and component props.
- **SSR/Hydration:** Be mindful of browser-only APIs; wrap them in `useEffect` or check for `typeof window !== "undefined"`.
