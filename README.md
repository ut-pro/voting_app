# Voting App

This is a voting application built with Node.js, Express, and MongoDB. It allows users to vote for candidates in an election.

## Setup

1. Clone the repository:

   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```sh
   cd voting_app
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=5000
   MONGODB_URI=<your-mongodb-uri>
   ```

5. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### User Routes

- `POST /user/register`

  - Registers a new user.
  - Request body:
    ```json
    {
      "name": "string",
      "email": "string",
      "mobileNo": "string",
      "age": "number",
      "address": "string",
      "adharNo": "string",
      "password": "string",
      "role": "string",
      "isVoted": "boolean"
    }
    ```

- `POST /user/login`
  - Logs in an existing user.
  - Request body:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

### Candidate Routes

- `GET /candidate`

  - Retrieves a list of all candidates.

- `POST /candidate`

  - Adds a new candidate.
  - Request body:
    ```json
    {
      "name": "string",
      "age": "number",
      "email": "string",
      "party": "string"
    }
    ```

- `PUT /candidate/:id`

  - Updates a candidate by ID.
  - Request body:
    ```json
    {
      "name": "string",
      "age": "number",
      "email": "string",
      "party": "string"
    }
    ```

- `DELETE /candidate/:id`

  - Deletes a candidate by ID.

- `POST /candidate/vote`
  - Votes for a candidate.
  - Request body:
    ```json
    {
      "candidateId": "string"
    }
    ```

## License

This project is licensed under the MIT License.
