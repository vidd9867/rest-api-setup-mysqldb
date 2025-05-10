import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

import dotenv from 'dotenv';
import { AppDataSource } from './config/db';
import path from 'path';
import "reflect-metadata";
import { authenticateJWT } from './Utils/authentication';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3024;

// Middleware
app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define public routes that don't require authentication
const publicRoutes = [
  '/authentication/login',
  '/authentication/register',
  // Add other public routes here
];

// JWT Authentication middleware
app.use((req, res, next) => {
  // Skip authentication for public routes
  if (publicRoutes.includes(req.path)) {
    return next();
  }
  
  // Apply JWT authentication for all other routes
  authenticateJWT(req, res, next);
});

// Auto-mount routes
const autoRoutes = require('express-auto-routes')(app);
autoRoutes(path.join(__dirname, './controllers')); // Automatically mount routes

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}/`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  });