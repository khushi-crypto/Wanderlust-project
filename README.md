🌍 Wanderlust – Travel Listing & Review Web App

Wanderlust is a full-stack web application inspired by platforms like Airbnb, designed to allow users to explore travel destinations, create listings, and leave reviews. This project demonstrates a combination of Node.js, Express, MongoDB, and EJS to build a production-ready web app with authentication, CRUD operations, and session handling.

🚀 Features
User Authentication – Secure sign-up, login, and logout using Passport.js.
Create & Manage Listings – Add new travel listings with title, description, price, and image.
Review System – Logged-in users can post reviews and ratings for listings.
Authorization Middleware – Ensures only owners can edit/delete their listings, and only review authors can delete their reviews.
Flash Messages – User-friendly success/error messages for all actions.
Responsive UI – Clean EJS templates styled for a smooth user experience.
Session Persistence – Keeps users logged in until they manually log out.

🛠️ Tech Stack

Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Frontend: EJS (server-side rendering), CSS
Authentication: Passport.js (Local Strategy)
Other: Express-Session, Connect-Flash, Middleware-based validation

📚 Learning Outcomes

This project helped me understand:
RESTful routing and CRUD operations in Express
Middleware chaining and custom authorization checks
Data modeling and relationships in MongoDB (one-to-many with reviews)
Handling authentication securely

Deploying a maintainable, structured Node.js app
