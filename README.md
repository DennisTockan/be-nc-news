# Northcoders News API 👨‍💻

![Screenshot 2023-09-27 at 19 47 56](https://github.com/DennisTockan/be-nc-news/assets/130880613/1182f6bd-0bc6-47eb-ad54-88f6ae832ceb)

Welcome to the NC News Forum! This project represents my inaugural journey into the world of full-stack development. Over the course of two intense weeks, I gave my all into crafting a news forum application powered by JavaScript, Node.js, and PostgreSQL for the backend, and React for the frontend.

## Project Overview
NC News Forum is a dynamic web application designed to facilitate engaging discussions and the sharing of news articles spanning various topics. It serves as a platform for meaningful conversations and a reliable source of updates on current events. This project stands as a testament to the strides I've made as a software developer, with rapid progress and newfound expertise in JavaScript, Node.js, SQL, and React.



#### Explore the Project:

#### Frontend SPA: [Access Here]()
#### Backend API: [Access Here](https://nc-news-gmb6.onrender.com/api)

<br>

## Table of Contents

1. [Project Overview](#Project-Overview)
2. [Features](#Features)
3. [Technologies & Development Tools](#Technologies-&-Development-Tools)
4. [Getting Started](#Getting-Started)
   - [Prerequisites](#Prerequisites)
   - [Installation](#Installation)
5. [The Approach](#The-Approach)
   - [Planning](#Planning)
   - [The API](#The-API)
   - [Backend](#Backend)
   - [Frontend](#Frontend)
6. [Triumphs](#Triumphs)
7. [Lessons and Obstacles](#Lessons-and-Obstacles)

## Features

- User registration and authentication
- Posting and commenting on news articles
- Upvoting and downvoting articles and comments
- Sorting articles by popularity and date
- Search functionality to find specific articles
- User profiles with activity history


## Technologies & Development Tools
### Technologies Used:
- JavaScript - Used for server-side and client-side scripting.
- HTML - Markup language for creating web pages.
- CSS - Styling language for designing the user interface.
- PostgreSQL - Relational database for data storage.
- React (with hooks) - JavaScript library for building the frontend.
- Axios - HTTP client for making API requests.
- Material UI - UI framework for building a modern and responsive user interface.

### Development Tools
- VS Code - Code editor for development.
- Git - Version control system for tracking changes.
- Github - Platform for hosting and collaborating on code.
- Insomnia - API testing tool for debugging and testing API endpoints.
<br>


## Getting Started
### Clone Instructions:
---
If you would like to run this project locally, please follow the steps below:

1. Clone the repository:
```
git clone https://github.com/DennisTockan/be-nc-news.git
```

2. Navigate into the repository folder using
```
cd be-nc-news
```

3. Open your new repository in VSCode:
```
code .
```

### Installation of Dependencies:
---

Install all the required dependencies listed in the package.json file by running the following command in your terminal:
```
npm install
```

### Environment Variables Setup:
---
Two new files will need to be created in the main directory. Name these two files `.env.test` and  `.env.development`.

#### Inside .env.test:
```
PGDATABASE=nc_news
```

#### Inside .env.development:
```
PGDATABASE=nc_news_test
```

Make sure to include both .env files in your .gitignore to keep sensitive data safe.

### Proceed to Run Setup Scripts and Begin Development
---
1. Seed the local database:
```
npm run setup-dbs
```
2. Seed the database with initial data:
```
npm run seed
```
3. For seeding the production database with data:
```
npm run seed-prod
```

### Running Tests:
---
Execute Jest test suites using the following command, optionally providing an identifier for the file containing test suites to run:
```
npm test OPTIONAL_IDENTIFIER
```






### This is probably the apporach

The primary objective of the backend project is to establish a robust RESTful API. This API has been meticulously crafted to offer a comprehensive array of endpoints, which aligns with the frontend news media web service. Through these endpoints, users are empowered with the capability to engage with and exert control over the data contained within the PostgreSQL database. This has become possible withuse of the versatile CRUD (Create, Read, Update & Delete) operations, affording users the ability to shape and mold the data to their specific needs and preferences.
