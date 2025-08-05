# Users Management SaaS

A modern, full-featured user management system built with Next.js, TypeScript, and Material-UI. This application provides a comprehensive solution for managing users with a clean, responsive interface and robust functionality.

## 🚀 Features

- **📋 User Listing**: View all users in both list (DataGrid) and dashboard (cards) formats
- **👀 User Details**: Detailed user information modal with comprehensive user data
- **➕ Create User**: Add new users with form validation and error handling
- **🔄 Real-time Updates**: Automatic data synchronization with server-side pagination
- **📱 Responsive Design**: Fully responsive interface that works on all devices
- **🎨 Modern UI**: Clean, intuitive interface built with Material-UI and Tailwind CSS
- **⚡ Performance Optimized**: Server-side rendering with React Query for efficient data fetching

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Material-UI
- **State Management**: React Query (TanStack Query)
- **Data Grid**: MUI X Data Grid
- **API**: RESTful API integration with Reqres.in
- **Form Handling**: React Hook Form with validation
- **Icons**: Material-UI Icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:ilyasse-brachmi/users-sass.git
   cd users-sass
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── users/
│   │   └── page.tsx                 # Users main page
│   └── layout.tsx
├── components/
│   ├── BreadCrumbsComponent.tsx     # Navigation breadcrumbs
│   ├── DataGridComponent.tsx        # Reusable data grid
│   ├── Pagination.tsx               # Server-side pagination
│   └── Toggle.tsx                   # View switcher component
├── features/
│   └── users/
│       ├── api/
│       │   └── index.ts             # Users API functions
│       └── components/
│           ├── UsersClient.tsx      # Main users client component
│           ├── UsersDataGrid.tsx    # Users data grid with actions
│           ├── UsersHeader.tsx      # Users page header
│           ├── UserCard.tsx         # User card for dashboard view
│           ├── UserDetailsModal.tsx # User details modal
│           ├── CreateUserModal.tsx  # Create user modal
│           └── UsersFallback.tsx    # Loading fallback component
├── types/
│   └── users.ts                     # User type definitions
└── services/
    └── get-query-client.ts          # React Query client setup
```

## 🔗 API Integration

The application integrates with the Reqres.in API for demonstration purposes:

- **Base URL**: `https://reqres.in/api`
- **Endpoints Used**:
  - `GET /users` - Fetch users with pagination
