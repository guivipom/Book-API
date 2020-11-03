# Bookstore

## Objective

Your assignment is to implement a bookstore REST API using Node and Express

## Brief


## Tasks

- Implement a REST API returning JSON or XML based on the `Content-Type` header
- Implement a custom user model with a "author pseudonym" field
- Implement a book model. Each book should have a title, description, author (your custom user model), cover image and price
- Provide an endpoint to authenticate with the API using username, password and return a JWT
- Implement REST endpoints for the `/books` resource
  - No authentication required
  - Allows only GET (List/Detail) operations
  - Make the List resource searchable with query parameters
- Provide REST resources for the authenticated user
  - Implement the typical CRUD operations for this resource
  - Implement an endpoint to unpublish a book (DELETE)

### Implementation

You should write tests for business logic.
You are expected to design any other required models and routes for your API.

- Language: **Node** and **Typescript**
- Framework: [**Express**](https://expressjs.com/de/)
