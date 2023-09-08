# Northcoders News API

---

### Summary:
The back-end API is hosted: https://nc-news-gmb6.onrender.com/api

This project serves the purpose of creating a RESTful API which is designed to provide access to the multiple endpoints supported by the front-end news media web service, where the user can interact and manipulate the data stores within this SQL database with the CRUD operators

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

To install all the required dependencies for this project listed in the package.json file, type the following code into your terminal: 
```
npm install
```
---

### Environment Variables Setup:

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

---
## Seed local database:

1. run the following code in the terminal to setup the initial database: 
```
npm run setup-dbs
```
2. run the following code in the terminal to seed the database with the provided data:
```
npm run seed
```

3. to seed the production database with data use:
```
npm run seed-prod
```
--- 
### running tests:

The Jest test suites can be run by using the following code along with an optional identifier for the file containing test suites to run:
```
npm test OPTIONAL_IDENTIFIER
```

---

