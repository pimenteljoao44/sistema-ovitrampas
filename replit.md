# Ovitrap Monitoring System

## Overview

This is a full-stack web application for monitoring mosquito ovitrap surveillance data, designed for Brazilian health surveillance agencies. The system enables health agents to manage municipalities, traps, collections, and generate surveillance reports for vector control programs.

## System Architecture

The application follows a modern monorepo structure with a React frontend, Express backend, and PostgreSQL database:

- **Frontend**: React with TypeScript, using Vite for development and building
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **UI Framework**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui provides pre-built, accessible components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation
- **Data Fetching**: TanStack Query for API calls and caching
- **Routing**: Wouter for lightweight client-side navigation

### Backend Architecture
- **API Framework**: Express.js with TypeScript for type safety
- **Database Layer**: Drizzle ORM with schema-first approach
- **Connection Pooling**: Neon serverless PostgreSQL with connection pooling
- **Middleware**: JSON parsing, URL encoding, and custom logging middleware

### Database Design
The schema includes hierarchical organization:
- **Users**: Authentication and role-based access
- **Municipalities** → **Localities** → **Blocks** → **Ovitraps**
- **Collections**: Data from trap inspections
- **Reports**: Generated surveillance bulletins

Key tables:
- `users` - System users with municipality assignments
- `municipios` - Municipality management
- `localidades` - Localities within municipalities
- `quarteiroes` - City blocks
- `ovitrampas` - Individual trap installations
- `coletas` - Collection data with egg counts
- `boletins` - Generated surveillance reports

## Data Flow

1. **Authentication**: Users log in with role-based access (agents, coordinators)
2. **Hierarchy Management**: Municipalities contain localities, which contain blocks with traps
3. **Trap Installation**: GPS coordinates, resident information, installation details
4. **Data Collection**: Regular inspections record egg counts and observations
5. **Report Generation**: Statistical analysis and PDF/Word export capabilities
6. **Dashboard Analytics**: Real-time statistics and surveillance metrics

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Runtime type validation
- **wouter**: Lightweight routing

### UI Dependencies
- **@radix-ui/***: Headless UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Component variant management

### Development Tools
- **vite**: Fast development server and build tool
- **typescript**: Type safety across the stack
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

The application is optimized for Replit deployment:

- **Development**: `npm run dev` starts both frontend and backend in development mode
- **Production Build**: `npm run build` creates optimized bundles
- **Database**: Configured for Neon serverless PostgreSQL
- **Environment**: Uses `DATABASE_URL` environment variable
- **Static Assets**: Frontend builds to `dist/public` for serving

The build process:
1. Frontend builds with Vite to `dist/public`
2. Backend bundles with esbuild to `dist/index.js`
3. Production starts with `node dist/index.js`

Key deployment considerations:
- Database migrations run with `npm run db:push`
- Environment variables must include `DATABASE_URL`
- The application serves both API routes and static frontend files

## Changelog
- June 28, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.