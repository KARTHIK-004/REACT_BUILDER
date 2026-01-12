# 🚀 ReactBuilder

<div align="center">

**A powerful web-based React component development platform with live code editing and real-time preview**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

</div>

---

## 📸 Screenshots

<div align="center">

### 🌙 Dark Mode

![Dark Mode Dashboard](./client/public/Dark.png)

### ☀️ Light Mode

![Light Mode Dashboard](./client/public/Light.png)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Configuration](#-environment-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**ReactBuilder** is a comprehensive web-based platform designed for developers to rapidly prototype, build, and manage React components with an intuitive visual interface. It combines the power of code editing with real-time preview capabilities, making React development faster and more efficient.

The platform features a full-stack architecture with user authentication, project management, and a live code editor powered by Monaco Editor. Whether you're building UI components, experimenting with React patterns, or managing multiple projects, ReactBuilder provides all the tools you need in one place.

---

## ✨ Key Features

### 🎨 **Live Code Editor**

- **Monaco Editor Integration**: Professional-grade code editing experience
- **Real-time Preview**: See your changes instantly with react-live
- **Syntax Highlighting**: Full JSX/JavaScript syntax support
- **Split-pane Interface**: Code and preview side-by-side

### 📁 **Project Management**

- **Multiple Projects**: Organize components into separate projects
- **Component Library**: Pre-built UI components ready to use
- **CRUD Operations**: Create, read, update, and delete projects and components
- **Search & Filter**: Quickly find components across all projects

### ⭐ **Favorites System**

- **Bookmark Components**: Mark frequently used components as favorites
- **Quick Access**: Dedicated favorites page for easy retrieval
- **Toggle Functionality**: One-click favorite/unfavorite

### 🔐 **Authentication & Security**

- **JWT-based Authentication**: Secure token-based auth system
- **Cookie Support**: HTTP-only cookies for enhanced security
- **Password Hashing**: bcrypt encryption for user passwords
- **Protected Routes**: Middleware-based route protection

### 🎨 **Modern UI/UX**

- **Dark/Light Mode**: Full theme support with system preference detection
- **Responsive Design**: Works seamlessly on all device sizes
- **shadcn/ui Components**: Beautiful, accessible UI components
- **Tailwind CSS**: Utility-first styling for rapid development
- **Framer Motion**: Smooth animations and transitions

### 👤 **User Profile Management**

- **Profile Customization**: Update username, email, and avatar
- **Password Management**: Secure password change functionality
- **Visibility Settings**: Control profile visibility (public/private)

---

## 🛠 Technology Stack

### **Frontend**

| Technology      | Version | Purpose                 |
| --------------- | ------- | ----------------------- |
| React           | 18.3.1  | UI Framework            |
| Vite            | 5.4.8   | Build Tool & Dev Server |
| React Router    | 6.27.0  | Client-side Routing     |
| Tailwind CSS    | 3.4.14  | Styling Framework       |
| shadcn/ui       | Latest  | UI Component Library    |
| Monaco Editor   | 4.6.0   | Code Editor             |
| react-live      | 4.1.7   | Live Code Preview       |
| Framer Motion   | 11.11.9 | Animations              |
| Axios           | 1.7.7   | HTTP Client             |
| Lucide React    | 0.453.0 | Icon Library            |
| Zod             | 3.23.8  | Schema Validation       |
| React Hook Form | 7.53.1  | Form Management         |

### **Backend**

| Technology    | Version | Purpose                       |
| ------------- | ------- | ----------------------------- |
| Node.js       | 20.x    | Runtime Environment           |
| Express       | 4.21.1  | Web Framework                 |
| MongoDB       | 6.10.0  | Database Driver               |
| Mongoose      | 8.8.0   | ODM (Object Data Modeling)    |
| JWT           | 9.0.2   | Authentication Tokens         |
| bcryptjs      | 2.4.3   | Password Hashing              |
| CORS          | 2.8.5   | Cross-Origin Resource Sharing |
| dotenv        | 16.4.5  | Environment Variables         |
| cookie-parser | 1.4.7   | Cookie Parsing                |

---

## 📂 Project Structure

```
REACT_BUILDER/
├── api/                          # Backend API
│   ├── controllers/              # Request handlers
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── component.controller.js
│   │   ├── profile.controller.js
│   │   └── project.controller.js
│   ├── models/                   # MongoDB schemas
│   │   ├── user.model.js
│   │   └── project.model.js
│   ├── routes/                   # API routes
│   │   ├── auth.route.js
│   │   ├── component.route.js
│   │   ├── profile.route.js
│   │   └── project.route.js
│   ├── utils/                    # Utility functions
│   │   ├── error.js
│   │   └── verifyUser.js
│   └── index.js                  # Server entry point
├── client/                       # Frontend application
│   ├── public/                   # Static assets
│   │   ├── Dark.png
│   │   └── Light.png
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── dashboard/        # Dashboard components
│   │   │   ├── theme/            # Theme provider
│   │   │   └── ui/               # shadcn/ui components
│   │   ├── pages/                # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditorPage.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Components.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── SignIn.jsx
│   │   │   └── SignUp.jsx
│   │   ├── lib/                  # Utility libraries
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   └── package.json              # Frontend dependencies
├── .env                          # Environment variables
├── package.json                  # Backend dependencies
└── README.md                     # This file
```

---

## 🚀 Installation & Setup

### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git** for version control

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/yourusername/react-builder.git
cd react-builder
```

### **Step 2: Install Backend Dependencies**

```bash
npm install
```

### **Step 3: Install Frontend Dependencies**

```bash
cd client
npm install
cd ..
```

### **Step 4: Configure Environment Variables**

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables (see [Environment Configuration](#-environment-configuration) for details):

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### **Step 5: Start the Development Servers**

**Option 1: Run Backend and Frontend Separately**

Terminal 1 (Backend):

```bash
npm run dev
```

Terminal 2 (Frontend):

```bash
cd client
npm run dev
```

**Option 2: Run Both Concurrently** (if configured)

```bash
npm run dev
```

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 🔧 Environment Configuration

### **MongoDB Atlas Setup**

1. **Create a MongoDB Atlas Account**

   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a New Cluster**

   - Click "Build a Cluster"
   - Choose the free tier (M0)
   - Select your preferred cloud provider and region

3. **Configure Database Access**

   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password
   - Grant "Read and Write to any database" permissions

4. **Configure Network Access**

   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Add `0.0.0.0/0` (allows access from anywhere)
   - For production: Add your specific IP addresses

5. **Get Connection String**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `reactbuilder`)

### **Environment Variables Explained**

| Variable      | Description                      | Example                                                                          |
| ------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| `MONGODB_URI` | MongoDB connection string        | `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority` |
| `JWT_SECRET`  | Secret key for JWT token signing | `your_super_secret_key_here_min_32_chars`                                        |
| `PORT`        | Backend server port              | `5000`                                                                           |
| `NODE_ENV`    | Environment mode                 | `development` or `production`                                                    |

### **Important Notes**

- **Never commit `.env` file to version control** (it's already in `.gitignore`)
- **Use strong JWT secrets** (minimum 32 characters, random string)
- **URL-encode special characters** in MongoDB password:
  - `@` → `%40`
  - `!` → `%21`
  - `#` → `%23`
  - `$` → `%24`

### **Example .env File**

```env
MONGODB_URI=mongodb+srv://reactbuilder:MyP%40ssw0rd@cluster0.mongodb.net/reactbuilder?retryWrites=true&w=majority&appName=ReactBuilder
JWT_SECRET=8B$z&fLmN2!gR@X8dC6vPfZkQ3sT^y9W1xK4mP7qL5nH3jF6
PORT=5000
NODE_ENV=development
```

---

## 📖 Usage

### **Getting Started**

1. **Sign Up**: Create a new account at `/sign-up`
2. **Sign In**: Log in with your credentials at `/sign-in`
3. **Dashboard**: Access your dashboard at `/dashboard`
4. **Create Project**: Click "New Project" to create your first project
5. **Add Components**: Within a project, add new React components
6. **Live Editing**: Use the Monaco editor to write code with live preview
7. **Favorites**: Mark important components as favorites for quick access

### **Creating a Component**

1. Navigate to a project
2. Click "New Component"
3. Enter component name
4. Write your React code in the editor
5. See live preview on the right panel
6. Save your component

### **Example Component Code**

```jsx
function MyButton() {
  const [count, setCount] = React.useState(0);

  return (
    <button
      onClick={() => setCount(count + 1)}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Clicked {count} times
    </button>
  );
}
```

---

## 🔌 API Endpoints

### **Authentication**

| Method | Endpoint            | Description       | Auth Required |
| ------ | ------------------- | ----------------- | ------------- |
| POST   | `/api/auth/signup`  | Register new user | ❌            |
| POST   | `/api/auth/signin`  | Login user        | ❌            |
| POST   | `/api/auth/signout` | Logout user       | ✅            |
| POST   | `/api/auth/google`  | Google OAuth      | ❌            |

### **Profile**

| Method | Endpoint                  | Description       | Auth Required |
| ------ | ------------------------- | ----------------- | ------------- |
| GET    | `/api/profile`            | Get user profile  | ✅            |
| PUT    | `/api/profile`            | Update profile    | ✅            |
| PUT    | `/api/profile/password`   | Change password   | ✅            |
| PUT    | `/api/profile/visibility` | Update visibility | ✅            |

### **Projects**

| Method | Endpoint                   | Description             | Auth Required |
| ------ | -------------------------- | ----------------------- | ------------- |
| GET    | `/api/projects`            | Get all projects        | ✅            |
| POST   | `/api/projects`            | Create new project      | ✅            |
| GET    | `/api/projects/:id`        | Get project by ID       | ✅            |
| PUT    | `/api/projects/:id`        | Update project          | ✅            |
| DELETE | `/api/projects/:id`        | Delete project          | ✅            |
| GET    | `/api/projects/components` | Get all components      | ✅            |
| GET    | `/api/projects/favorites`  | Get favorite components | ✅            |

### **Components**

| Method | Endpoint                                                    | Description                   | Auth Required |
| ------ | ----------------------------------------------------------- | ----------------------------- | ------------- |
| GET    | `/api/projects/:projectId/components`                       | Get all components in project | ✅            |
| POST   | `/api/projects/:projectId/components`                       | Create new component          | ✅            |
| GET    | `/api/projects/:projectId/components/:componentId`          | Get component by ID           | ✅            |
| PUT    | `/api/projects/:projectId/components/:componentId`          | Update component              | ✅            |
| DELETE | `/api/projects/:projectId/components/:componentId`          | Delete component              | ✅            |
| PUT    | `/api/projects/:projectId/components/:componentId/favorite` | Toggle favorite               | ✅            |

---

## 📜 Available Scripts

### **Backend Scripts**

```bash
# Start development server with nodemon (auto-reload)
npm run dev

# Start production server
npm start

# Build entire application (backend + frontend)
npm run build
```

### **Frontend Scripts**

```bash
# Navigate to client directory first
cd client

# Start Vite development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

---

## 🤝 Contributing

We welcome contributions to ReactBuilder! Here's how you can help:

### **How to Contribute**

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### **Development Guidelines**

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

### **Reporting Issues**

If you find a bug or have a feature request:

1. Check if the issue already exists
2. Create a new issue with detailed description
3. Include steps to reproduce (for bugs)
4. Add screenshots if applicable

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Monaco Editor** for the powerful code editor
- **Tailwind CSS** for the utility-first CSS framework
- **React** team for the amazing framework
- **MongoDB** for the flexible database solution

---

## 📞 Support

If you need help or have questions:

- 📧 Email: support@reactbuilder.com
- 💬 Discord: [Join our community](#)
- 📖 Documentation: [Read the docs](#)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/react-builder/issues)

---

<div align="center">

**Made with ❤️ by KARTHIK-004**

⭐ Star this repo if you find it helpful!

</div>
