# Northcoders News API 👨‍💻

![Screenshot 2023-09-27 at 19 47 56](https://github.com/DennisTockan/be-nc-news/assets/130880613/1182f6bd-0bc6-47eb-ad54-88f6ae832ceb)

Welcome to the NC News Forum! This project represents my inaugural journey into the world of full-stack development. Over the course of two intense weeks, I gave my all into crafting a news forum application powered by JavaScript, Node.js, and PostgreSQL for the backend, and React for the frontend.

## Project Overview
NC News Forum is a dynamic web application designed to facilitate engaging discussions and the sharing of news articles spanning various topics. It serves as a platform for meaningful conversations and a reliable source of updates on current events. This project stands as a testament to the strides I've made as a software developer, with rapid progress and newfound expertise in JavaScript, Node.js, SQL, and React.



#### Explore the Project:

#### Frontend SPA: [Access Here](https://ncsubsidiarynews.netlify.app/)
#### Backend API: [Access Here](https://nc-news-gmb6.onrender.com/api)

<br>

## Table of Contents

1. [Project Overview](#Project-Overview)
2. [Features](#Features)
3. [Technologies & Development Tools](#Technologies-&-Development-Tools)
4. [Getting Started](#Getting-Started)
   - [Clone Instructions](#Clone-Instructions)
   - [Installation of Dependencies](#Installation-of-Dependencies)
   - [Environment Variables Setup](#Environment-Variables-Setup)
   - [Proceed to Run Setup Scripts and Begin Development](#Proceed-to-Run-Setup-Scripts-and-Begin-Development)
   - [Running Tests](#Running-Tests)
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
```js
git clone https://github.com/DennisTockan/be-nc-news.git
```

2. Navigate into the repository folder using
```js
cd be-nc-news
```

3. Open your new repository in VSCode:
```js
code .
```

### Installation of Dependencies:
---

Install all the required dependencies listed in the package.json file by running the following command in your terminal:
```js
npm install
```

### Environment Variables Setup:
---
Two new files will need to be created in the main directory. Name these two files `.env.test` and  `.env.development`.

#### Inside .env.test:
```js
PGDATABASE=nc_news
```

#### Inside .env.development:
```js
PGDATABASE=nc_news_test
```

Make sure to include both .env files in your .gitignore to keep sensitive data safe.

### Proceed to Run Setup Scripts and Begin Development:
---
1. Seed the local database:
```js
npm run setup-dbs
```
2. Seed the database with initial data:
```js
npm run seed
```
3. For seeding the production database with data:
```js
npm run seed-prod
```

### Running Tests:
---
Execute Jest test suites using the following command, optionally providing an identifier for the file containing test suites to run:
```js
npm test OPTIONAL_IDENTIFIER
```

<br>

## The Approach
### The Application Programming Interface (API)
---

The primary object for the backend project is to establish and create my very own robust RESTful API. This API has been meticulously designed to provide a wide range of endpoints, all of which integrate with the frontend news media web service. These endpoints empower users by giving them the ability to interact with and manage the data stored within the PostgreSQL database.

This level of interaction is made possible through the incorporation of the CRUD (Create, Read, Update, and Delete) operations. These allow users to not only access but also manipulate the data according to their individual requirements and preferences. In essence, this API serves a flexible and dynamic bridge between users and the underlying database, enabling them to shape and customize the data to suit their specific needs.

### Defining my MVP
---
Before getting started on building API for the backend, I had to decide on the core functionality that I thought would be essential for the project to be useful and valuable. 

The MVP aimed to deliver essential features necessary for a fully functional News Forum: 
- Getting All Articles 
- Filtering Artilces by Category
- Posting and Deleting Comments 
- Upvoting and Downvoting Articles

I decided to use Trello to create, visualise and organise the tickets for my project required in my MVP. After several iterations, this was the decided tickets for my project.

Trello: 

![Screenshot 2023-09-29 at 18 58 04](https://github.com/DennisTockan/be-nc-news/assets/130880613/f6fb4ce2-4c1b-4200-bf9d-6cbb3de7b53b)

<br> 

### Express
---
In this project, I leveraged the Express.js framework, a powerful and widely adopted Node.js framework, to simplify and streamline the development of our backend. Express provides us with a robust set of tools and features for rdefining routes and handling different HTTP methods (GET, POST, PUT & DELETE) making it an ideal choice for building RESTful APIs. 

```js
const express = require("express");

const app = express();

const { getAllTopics } = require("./controllers/topics.controllers");

const { getAllApiEndpoints } = require("./controllers/api.controllers");

const {
  getArticleById,
  getAllArticles,
  getArticleIdComments,
  postArticleIdComment,
  patchArticleIdsArticle
} = require("./controllers/articles.controllers");

const { deletedComment } = require("./controllers/comment.controller");

const { getAllUsers } = require("./controllers/users.controllers")

const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServersErrors,
} = require("./errors");

app.use(express.json()); 

app.use(cors());

app.get("/api/topics", getAllTopics);
app.get("/api/", getAllApiEndpoints);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles/:article_id/comments", getArticleIdComments);
app.patch("/api/articles/:article_id", patchArticleIdsArticle);
app.post("/api/articles/:article_id/comments", postArticleIdComment);
app.delete("/api/comments/:comment_id", deletedComment);
app.get("/api/users", getAllUsers);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServersErrors);
module.exports = app;
```
<br>

### Model View Controller
---
The project adopted the Model View Controller (MVC) pattern to efficiently manage various aspects of the application, categorising the functions to make the codebase neat and managable. 

The MVC Flow chart is a visual representation of the structure the backend project follows: 

![image](https://github.com/DennisTockan/be-nc-news/assets/130880613/3d790789-a5df-4a27-9e71-75793bd3f58a)

#### MVC separates responsibilities into distinct components:

- Controller: Handles client requests, utilizes request information to interact with the model, and responds to the client with relevant data.

- Model: Manages data operations like retrieval, updating, creation, and deletion, delivering data to the controller in the required format.


<br> 
 
In the MVC flow, the user first interacts with the view, triggering an event or request. This request is then directed to the controller. The code below demonstrates the scenario where a user wants to retrieve an article by its unique ID. In the controller, there's a specific route handler [getArticleById] which extracts the article_id from the request parameters. Here's the controller code:

```js
const { selectArticleById } = require("../models/articles.models");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
```
In this code, the controller delegates the task of retrieving the article to the model's selectArticleById function. This function contains the database query logic, as shown below:

```js
exports.selectArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.author, articles.title, articles.article_id, articles.body, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count FROM articles JOIN comments ON comments.article_id = articles.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id;`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Not Found" });
      }
      return rows[0];
    });
};
```

Here, the model handles the database interaction. It uses an SQL query to fetch the article data along with the number of comments associated with it. If no results are found, the model rejects the promise with a 404 "Not Found" error.

## Error Handling

Once the model successfully retrieves the article data or handles errors, it communicates back to the controller. The controller then formats the data and sends an HTTP response with a status code of 200 and the article information. 

In case of errors during data retrieval or processing, the catch block handles them and forwards them to error handling middleware. This separation of responsibilities between view, controller, and model, along with proper error handling, contributes to a robust and maintainable application architecture.

```js
exports.handlePsqlErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad Request" });
  } else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.message) {
    res.status(err.status).send({ message: err.message });
  } else next(err);
};

exports.handleServersErrors = (err, req, res, next) => {
  res.status(500).send({ message: "Errors with the internal server!" });
};
```

## Interacting With The Database

The project involved building an Express.js application that interacts with a PostgreSQL database using the 'node-postgres' library. The goal is to ensure the security of SQL queries and protect against SQL injection.

#### Security Measures
- In the MVC data retrieval process, SQL query security was ensured.
- I used parameterized queries, avoiding manual string concatenation.
- Instead of injecting user data directly, we employed the $1 placeholder.
- User inputs are handled securely, making it challenging for attackers to exploit.
- Our code includes error handling, returning a 404 Not Found if no results are found.

```js
exports.selectArticleIdComments = async (article_id) => {
  const checkExists = async (article_id) => {
    const dbOutput = await db.query(
      `SELECT * FROM articles WHERE article_id = $1;`,
      [article_id]
    );
    if (dbOutput.rows.length === 0) {
      return Promise.reject({ status: 404, message: "Not Found" });
    }
  };

  const doesArticleIdExist = await checkExists(article_id);
  if (doesArticleIdExist) {
    return doesArticleIdExist;
  }
```

The $1 placeholder is employed within the SQL query string. Rather than directly injecting user data into the SQL query [in this casearticle_id, is supplied as an array in the second argument to the query method. 

By adopting parameterized queries and these security practices, the possibility of SQL injection risks for the application has been nullified. 

