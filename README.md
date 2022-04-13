# Decent. Exchange [![CircleCI](https://circleci.com/gh/skp96/decent-exchange.svg?style=svg)](https://circleci.com/gh/skp96/decent-exchange)

Decent. Exchange is a web application built using Vite, React, Recoil, and Typescript. The application lets a user search for various cryptocurrencies, provides a chart displaying time-series data, and an interface to allow the user to buy and sell curriencies in USD

## Requirements

- Node version >= 17.5.X
- Npm version >= 8.4.X

## Deployment Tool

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## How to Set up Locally

1. Clone the repository

```
$ https://github.com/skp96/decent-exchange.git
$ cd decent-exchange
```

2. Install dependencies

```
$ npm install
```

3. Start the web server

```
$ npm run dev
```

4. Confirm the web server is up and running
   - In your browser visit http://localhost:3000/

## How to Run Tests

```
$ npm run test
```

## How to Deploy to Production

Please make sure you have created an account with [Heroku](https://www.heroku.com/) and have installed the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

1. Run `heroku login` and enter your Heroku credentials

```
$ heroku login
```

2. Set up your Heroku git remote

```
# version change
$ git init
$ git add .
$ git commit -m "ready to deploy to Heroku"

# create a new application
$ heroku apps:create decent-exchange
```

3. Set the `heroku/nodejs` buildpack. Note this needs to be set first so Heroku to handle building the `dist` folder, which will contain a production build of the application

```
$ heroku buildpacks:set heroku/nodejs -a decent-exchange
```

3. Add a second buildpack `heroku-buildpack-static` which is used to handle static sites and single page web applications

```
$ heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git -a decent-exchange
```

4. Deploy the application

```
# deploy the application
$ git push heroku main

# open a browser to view the deployed app
$ heroku open
```

