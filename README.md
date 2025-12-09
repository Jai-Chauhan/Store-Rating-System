**Store Rating System**

The Store Rating System is a full-stack web application designed to facilitate user-generated ratings for stores. It implements role-based access control, allowing standard users to submit ratings, store owners to view feedback for their respective stores, and administrators to monitor platform activity. The system is built with Node.js, Express, and MySQL on the backend, and React with plain CSS on the frontend.

**Features**

User Authentication: Secure registration and login using JWT.
Store Management: Store owners can create a store and access a dashboard displaying all received ratings.
Rating Functionality: Authenticated users may submit or update ratings for any store.
Administrative Overview: Administrators can view platform summaries, user lists, and store listings.


**Technology Stack**

Frontend: React (Vite), Axios, Plain CSS
Backend: Node.js, Express.js, MySQL (mysql2), bcrypt, JSON Web Tokens
Database: MySQL relational schema with foreign key constraints


**Setup Instructions**
Backend
cd backend
npm install
npm start


The backend will run at: http://localhost:4000

Frontend
cd frontend
npm install
npm run dev


The frontend will run at: http://localhost:5173


**API Summary**

POST /api/auth/signup – User registration

POST /api/auth/login – User login and token generation

GET /api/stores – Retrieve all stores

GET /api/stores/:id – Retrieve store details and ratings

POST /api/stores – Create a store (store owners only)

POST /api/ratings – Submit or update a rating

GET /api/store-owner/ratings – Store owner dashboard

GET /api/admin/* – Administrative endpoints

Overview

This project serves as a structured demonstration of full-stack development concepts, including authentication, authorization, REST API design, and client-side state management. It is suitable as a portfolio project or as a learning exercise for building scalable web applications.
