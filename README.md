# Github User Management

This application is used to manage user's github data. The backend focuses on fetching details from the GitHub API, storing it in a PostgreSQL database, and providing various features like searching, updating, and managing users. And the frontend allows to search for GitHub repositories by username and view followers and repository details of respective users.

# Features
Backend -
1. Save GitHub User Details: Accepts a GitHub username and fetches user details from the GitHub API. Stores the data in the database if not already present.
2. Find Mutual Friends: Identifies mutual followers of a user and saves them as friends.
3. Search Users: Allows searching for users based on any field in the database.
4. Soft Delete Users: Marks a user as deleted without removing their data from the database.
5. Update User Fields: Dynamically updates any fields for a user.
6. Get All Users: Returns a list of all users, sorted by specified fields.
Frontend -
1. User Search: Search for GitHub users by entering their username.
2. Repository List: Display a list of repositories for the searched user, including names and descriptions.
3. Repository Details: Click on a repository to view additional details.
4. Followers Navigation: Navigate to the list of followers for the user.
5. Responsive Design: Styled components for better user experience.

# Tech stack
Backend: Node.js (Express.js)
Frontend: ReactJS
Database: PostgreSQL
HTTP Client: Axios (for GitHub API calls)

# Prerequisities
Node.js (v18.x or later)
PostgreSQL (v12.x or later)
Git (optional)

# Installation and Setup
1. Clone the repository-
   git clone https://github.com/Ridhi1001/github-data.git
   cd github-data
2. Backend setup-
   1. Navigate to backend directory-
      cd backend
   2. Install dependencies-
      npm install
   3. Configure database-
      Create .env file and set following fields-
      DB_USER='your_db_user'
      DB_HOST=localhost
      DB_NAME='your_database'
      DB_PASSWORD='your_db_password'
      DB_PORT=5432
   4. Setup databse-
      Run setup.sql to initialize db-
      psql -U your_user -d your_db -f setup.sql
   5. Start the server-
      npm start
   The server will start at http://localhost:3000
3. Frontend setup-
   1. Navigate to frontend directory-
      cd frontend
   2. Install dependencies-
      npm install
   3. Start the server-
      npm start

# API Endpoints
1. POST /api/users/github
   Body -
   {
      "username": "octocat"
   }
   Description- Fetches user details from the GitHub API and saves them to the database if not already present.
2. POST /api/friends/:username/mutual-friends
   Description: Identifies mutual followers of the specified user and saves them as friends in the database.
3. GET /api/users/search
   Query Parameters:
       field: The database field to search (e.g., username, location).
       value: The value to search for.
   GET /api/users/search?field=username&value=xyz
   Description: Returns all users matching the specified field and value.
4. DELETE /api/users/:username
   Description: Marks the specified user as deleted without removing their data from the database.
5. PUT /api/users/:username
   Body-
   {
      "location": "India",
      "bio": "GitHub user"
   }
   Description: Updates any specified fields for the given user dynamically.
6. GET /api/users
   Query Parameters:
      sortBy: The field to sort by (e.g., followers, following, created_at).
   Description: Returns a list of all users, sorted by the specified field.




