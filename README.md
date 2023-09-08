# Northcoders News API

As any future developer will not able to have any access to the necessary environment variables, here are a list of instructions for those who wish to clone this work in the future.

- We must firstly download the 'dotenv' npm package that will handle the configuration of environment variables. [npm install dotenv].
- Next, we must create a .env file, which will hold the variables for this project. 
- We will then want to create a connection.js file, where we want to require in dotenv and invoke its configuration method which sets the environment variables from the .env file to the process.env.

Should look similar to this
require("dotenv").config({ path: `${__dirname}/../.env` });


