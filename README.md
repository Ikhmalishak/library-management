# Library Management API

Learning project for Node.js and Express.js.

## Goals

* Learn Express.js fundamentals
* Learn routing and middleware
* Learn JWT authentication
* Learn MySQL integration
* Learn Docker
* Learn CI/CD with GitHub Actions
* Deploy to Ubuntu Linux server

## Features Implemented

### Authentication

* User login
* JWT token generation
* Protected routes
* Token verification

### Express Concepts Learned

* Routes
* Request and Response objects
* Middleware
* Route prefixes using `app.use()`
* Static file serving

## Tech Stack

* Node.js
* Express.js
* JSON Web Token (JWT)

## API Endpoints

### Login

```http
POST /api/auth/login
```

### Protected Route

```http
GET /api/auth/protected
```

Authorization Header:

```http
Authorization: Bearer <jwt_token>
```

## Learning Progress

* [x] Express Setup
* [x] Routing
* [x] Middleware
* [x] JWT Authentication
* [ ] MySQL Database
* [ ] Docker
* [ ] GitHub Actions CI
* [ ] Automated Deployment

## Run Project

Install dependencies:

```bash
npm install
```

Start server:

```bash
node app.js
```

Server runs on:

```text
http://localhost:3000
```
