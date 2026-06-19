# Library Management System API – Product Requirements Document (PRD)

## Objective

Build a RESTful API for a simple library management system to learn backend development using Express.js and PostgreSQL.

The project should demonstrate:

* REST API design
* PostgreSQL database design
* Authentication using JWT
* Database relationships and transactions
* Docker fundamentals
* CI/CD practices

---

## User Roles

### Admin

Can:

* Login
* Manage books
* Manage members
* View all loan records

### Member

Can:

* Register an account
* Login
* View available books
* Borrow books
* Return books
* View their own borrowing history

---

## Features

### Authentication

#### Register

**POST** `/auth/register`

Register a new member account.

#### Login

**POST** `/auth/login`

Authenticate users and return a JWT access token.

---

### Books

#### Get All Books

**GET** `/books`

Retrieve all books.

#### Get Book By ID

**GET** `/books/:id`

Retrieve a single book.

#### Create Book (Admin)

**POST** `/books`

Add a new book to the library.

#### Update Book (Admin)

**PUT** `/books/:id`

Update book information.

#### Delete Book (Admin)

**DELETE** `/books/:id`

Remove a book from the library.

---

### Members

#### Get All Members (Admin)

**GET** `/members`

Retrieve all members.

#### Get Member By ID

**GET** `/members/:id`

Retrieve a single member.

#### Update Member

**PUT** `/members/:id`

Update member information.

#### Delete Member (Admin)

**DELETE** `/members/:id`

Delete a member account.

---

### Loans

#### Borrow Book

**POST** `/loans/borrow`

Members can borrow available books.

Business Rules:

* User must be authenticated.
* Book quantity must be greater than zero.
* Reduce book quantity by one.
* Create a loan record.
* Use a database transaction.

#### Return Book

**POST** `/loans/return`

Members can return borrowed books.

Business Rules:

* User must be authenticated.
* Mark the loan as returned.
* Increase book quantity by one.
* Use a database transaction.

#### View My Loans

**GET** `/loans/me`

View authenticated user's loan history.

#### View All Loans (Admin)

**GET** `/loans`

View all loan records.

---

## Database Design

### users

| Column     | Type         | Constraints               |
| ---------- | ------------ | ------------------------- |
| id         | SERIAL       | PRIMARY KEY               |
| name       | VARCHAR(255) | NOT NULL                  |
| email      | VARCHAR(255) | UNIQUE, NOT NULL          |
| password   | VARCHAR(255) | NOT NULL                  |
| role       | VARCHAR(20)  | DEFAULT 'member'          |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

---

### books

| Column     | Type         | Constraints               |
| ---------- | ------------ | ------------------------- |
| id         | SERIAL       | PRIMARY KEY               |
| title      | VARCHAR(255) | NOT NULL                  |
| author     | VARCHAR(255) | NOT NULL                  |
| isbn       | VARCHAR(50)  | UNIQUE                    |
| quantity   | INTEGER      | DEFAULT 0                 |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP |

---

### loans

| Column      | Type        | Constraints               |
| ----------- | ----------- | ------------------------- |
| id          | SERIAL      | PRIMARY KEY               |
| user_id     | INTEGER     | FOREIGN KEY → users(id)   |
| book_id     | INTEGER     | FOREIGN KEY → books(id)   |
| borrowed_at | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP |
| returned_at | TIMESTAMP   | NULLABLE                  |
| status      | VARCHAR(20) | DEFAULT 'borrowed'        |

---

## Entity Relationship

```text
Users
  |
  | 1
  |
  |-----< Loans >-----| 1
                       |
                     Books
```

Relationship Summary:

* One user can have many loans.
* One book can appear in many loans.
* Each loan belongs to one user and one book.

---

## Validation Rules

* Email must be valid.
* Email must be unique.
* Password is required.
* Book title and author are required.
* ISBN must be unique.
* Quantity cannot be negative.
* Members cannot borrow unavailable books.

---

## Security Requirements

* Passwords must be hashed using bcrypt.
* JWT must protect authenticated routes.
* Admin-only routes must verify user roles.

---

## Development Roadmap

### Phase 1

* Create database schema
* Seed admin account
* Seed sample books

### Phase 2

* Authentication APIs
* JWT middleware

### Phase 3

* Books CRUD APIs

### Phase 4

* Members CRUD APIs

### Phase 5

* Borrow and return APIs using transactions

### Phase 6

* Dockerize the application

### Phase 7

* Implement CI/CD using GitHub Actions

---

## Definition of Done

The project is complete when:

* Users can register and login.
* JWT authentication works.
* Admin can manage books.
* Members can borrow and return books.
* Loan history is stored correctly.
* Transactions maintain data consistency.
* The application runs using Docker.
* Deployment is automated through CI/CD.
