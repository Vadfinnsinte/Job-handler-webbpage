
# Job-handler-frontend

## About the project

This is the frontend for **Job Handler**, a fullstack application built with React.  
The application allows users to manage job applications by creating, updating, and tracking posts, as well as interacting with comments.

The frontend communicates with a .NET Web API backend using HTTP requests and JWT authentication.

---

## Features

- User registration and login  
- JWT-based authentication  
- Role-based UI (Admin / User)  
- Create, read, update and delete posts  
- Create comments  
- Admin view for managing users  
- Responsive design for desktop and mobile  

---

## Tech stack

- React (Vite)  
- JavaScript (ES6+)  
- CSS  
- Fetch API  
- React Hooks (useState, useEffect)  

---

## Application Structure

The frontend is structured into reusable and modular components:

- **Pages** – Main views (Feed, Register, etc.)  
- **Components** – Reusable UI components (PostCard, EditPost, etc.)  
- **Services** – Handles API calls  
- **Store** – Global state management using custom hooks  
- **Helpers** – Utility functions (e.g. token handling)  

This structure improves maintainability and separation of concerns.

---

## Authentication

The application uses JWT authentication.

After login:
- The token is stored in `sessionStorage`  
- The token is sent with requests using the Authorization header  

Example:

Role-based logic is used in the UI to control access to certain features.

---

## API Communication

The frontend communicates with the backend using the Fetch API.

- GET requests to fetch data  
- POST/PUT/DELETE requests for CRUD operations  
- Authorization header is included for protected routes  

Example:

fetch(url, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
})


# How to run the projekt:

Terminal:

1. git clone "repoUrl"
2. cd/toReponame
3. npm install
4. npm run dev



## Environment Variables

Make sure to configure your backend connection in .env:

## Responsiveness

The application is designed to work on both desktop and mobile devices.

- Flexible layouts using CSS
- Scrollable containers
- Responsive components and modals
- Error Handling

## The application includes basic error handling:

- Displays messages when API requests fail
- Handles loading states
- Prevents invalid form submissions
- Project Purpose

The purpose of this project is to build a fullstack application with a modern frontend that interacts with a secure backend API.

## Contributors 

Please note: This project was a collaborative effort where all team members contributed across multiple parts of the application, including both frontend components and service logic.
The list below is only an overview of the areas where each contributor created new files. For a more complete overview, please refer to the commit history.

### Linda 

  - Created base structure
  - Login.jsx (page)
  - Feed.jsx (page)
  - ShowPost.jsx (Component)
  - EditUser.jsx(Component)
  - inputlabel.jsx (Component)
  - PostCard.jsx (Component)
  - ShowPost.jsx (Component)
  - authLogin.js 
  - comment.js
  - posts.js
  - user.js
  - token.js

### Tindra
- CreatePost.jsx (Component)
- CreatePostPage.jsx (page)
- postService.js


### Natalie
  - Register (page)
  - EditPost (Component)
  - AdminUsers (Components)
  - userAdmin.js
  - editPost.js
  - authRegister.js



