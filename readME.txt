RECIPE MANAGER – USER GUIDE

Table of Contents

Introduction

System Requirements

Installation

Configuration

Database Seeding

Starting the Application

Application Usage 
7.1 Navigating the UI 
7.2 Creating a Recipe
7.3 Viewing & Editing Recipes 
7.4 Deleting a Recipe 
7.5 Available HTTP Endpoints

Troubleshooting

--------------------------------------------

Introduction 
The Recipe Manager is a full-stack web application for creating, viewing, editing 
and deleting cooking recipes. 

Technologies used:
 • Node.js & Express (server and routing) 
 • EJS (templating) 
 • MongoDB with Mongoose (data storage and schema validation) 
 • Bootstrap (responsive styling)

System Requirements 
• Node.js v16 or newer 
• npm (included with Node.js) 
• MongoDB (Atlas cluster or local instance) 
• Git (optional, for cloning the repo)

Installation

Install dependencies: npm install

Configuration

In the project root, create a file named .env

Add these variables 
(replace placeholders): MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/recipe_db PORT=3000

Ensure .env is listed in .gitignore to keep credentials private.

Database Seeding 
Populate the database with sample recipes before first run: 
    node seed.js 
Expected output: 
MongoDB connected Database seeded with 4 recipes

Starting the Application
 • Production mode: npm start 
 • Development mode (auto-reload on file changes): npm run dev Server listens on http://localhost:<PORT> (default PORT=3000).

Application Usage

7.1 Navigating the UI 
– Home page (/recipes) displays all recipes in card format. 
Screenshot placeholder: recipe-list view on desktop

7.2 Creating a Recipe

Click “Add Recipe” on the home page.

Fill in the form: 
• Title (min. 3 characters) 
• Ingredients (comma-separated list) 
• Steps (comma-separated list) 
• Optional: Image URL (must start with http:// or https://)

Submit. Client-side validation will prevent incomplete forms. 
Screenshot placeholder: recipe-creation form with validation

7.3 Viewing & Editing Recipes 
– To view details, click “View” on any recipe card. 
– On the detail page, click “Edit” to modify fields, 
then submit to save. 
Screenshot placeholder: recipe-detail view with Edit button

7.4 Deleting a Recipe 
– On the recipe’s detail page, click “Delete.” 
The recipe is removed and you return to the list.

7.5 Available HTTP Endpoints Method URL Description 
    GET /recipes List all recipes 
    GET /recipes/new Show recipe creation form 
    POST /recipes Create a new recipe 
    GET /recipes/:id View a single recipe 
    GET /recipes/:id/edit Show edit form for a recipe 
    PUT /recipes/:id Update an existing recipe 
    DELETE /recipes/:id Delete a recipe

Troubleshooting 
• MongoNetworkError: 
– Verify MONGO_URI is correct.
– In MongoDB Atlas, whitelist your IP under Network Access. 
 
• EJS Template Errors: 
– Ensure all .ejs files are in the views/ directory. 
– Confirm app.set('view engine', 'ejs') is configured in server.js.. 
 
• Module Not Found: dotenv: 
– Run npm install dotenv.