# Northcoders News API 👨‍💻

## Project Overview

Welcome to the NC News Forum! This is my inaugural project where I've dedicated two weeks to build a news forum application with JavaScript, Node.js, PostgreSQL for the backend, and React for the frontend. 

This news forum is a web application that allows users to discuss and share news articles on various topics. It provides a platform for meaningful conversations and staying updated on current events. This project is the result of two weeks of dedicated work, leveraging the power of JavaScript, Node.js and PostgreSQL for the backend, and React for the front end.

Reflecting on my first full-stack project as a software developer, I'm proud of the rapid progress and newfound skills I've acquired. Despite having learned Node, React, and SQL just a week before project completion, I quickly became proficient with these frameworks and relational databases.

#### Click [here]() to access the hosted front-end SPA

#### Click [here](https://nc-news-gmb6.onrender.com/api) to access the hosted back-end API

<br>

### Table of Contents
---
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

<br>

### Features
---
- User registration and authentication
- Posting and commenting on news articles
- Upvoting and downvoting articles and comments
- Sorting articles by popularity and date
- Search functionality to find specific articles
- User profiles with activity history

<br>

### Technologies & Development Tools
---
#### Technologies Used:
- JavaScript
- HTML
- CSS
- PostgreSQL
- React (with hooks)
- Axios
- Material UI

#### Development tools
- VS Code
- Git
- Github
- Insomnia

 <br>
 
### Getting Started
---

### Clone instructions:
If you would like to run this project locally, please follow the steps below:

1. Clone the repository:
```
git clone https://github.com/DennisTockan/be-nc-news.git
```

2. Navigate into the repo folder using `cd`

3. Open your new repository on VSCode: 
```
code .
```
---

### Installation of dependencies:
---

To install all the required dependencies for this project listed in the package.json file, type the following code into your terminal: 
```
npm install
```


### Environment variables setup:
---
Two new files will need to be created in the main directory. Name these two files `.env.test` and  `.env.development`.

1. Inside the `.env.test` file, add the following code 
```
PGDATABASE=nc_news
```

2. Inside the `.env.development` file, add the following code 
```
PGDATABASE=nc_news_test
```

3. Add both of these .env files to the .gitignored file.

4. Proceed to run setup scripts and begin development


## Seed local database:
---
1. Run the following code in the terminal to setup the initial database: 
```
npm run setup-dbs
```
2. Run the following code in the terminal to seed the database with the provided data:
```
npm run seed
```

3. To seed the production database with data use:
```
npm run seed-prod
```

### Running tests:
---
The Jest test suites can be run by using the following code along with an optional identifier for the file containing test suites to run:
```
npm test OPTIONAL_IDENTIFIER
```

---




### This is probably the apporach

The primary objective of the backend project is to establish a robust RESTful API. This API has been meticulously crafted to offer a comprehensive array of endpoints, which aligns with the frontend news media web service. Through these endpoints, users are empowered with the capability to engage with and exert control over the data contained within the PostgreSQL database. This has become possible withuse of the versatile CRUD (Create, Read, Update & Delete) operations, affording users the ability to shape and mold the data to their specific needs and preferences.
