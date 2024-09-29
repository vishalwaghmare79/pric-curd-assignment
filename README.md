## **Assignment Solution**

#### **User Dashboard Application (CRUD operations)**

The app allows you to perform the following CRUD operations:
1. **Create:** Add a new user with `name` and `email`.
2. **Read:** Fetch and display users from the Firebase Realtime Database.
3. **Update:** Edit an existing user’s details.
4. **Delete:** Remove a user from the system.

#### **Docker Containerization:**

- **Dockerfile:** 
    - A Dockerfile is included to containerize the application.
    - The Docker container runs the app on port 3000.
    - Dockerfile contains the build steps to ensure that the production build is optimized and the application can be deployed.

**Dockerfile Example:**
```dockerfile
# Use the official Node.js image from Docker Hub
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json (if available)
COPY package*.json ./

# Install node modules
RUN npm install --silent

# Copy the rest of the application files to the working directory
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "run", "start"]
```

---

### **3. Documentation:**

#### **Summary of the project and steps for setup**

```markdown
# User Dashboard (CRUD Application)

This is a simple user dashboard to manage user data using Firebase as a backend. The app performs CRUD operations and is containerized using Docker for easy deployment.

## Features:
- Create a new user with name and email.
- Read existing user data.
- Update user information.
- Delete a user from the database.

## Technologies:
- React.js (Frontend)
- Firebase Realtime Database (Backend)
- Docker (Containerization)
- Axios (HTTP Requests)

## How to Run:

### Prerequisites:
1. Install Docker.
2. Clone this repository.
3. Install Node.js (for local development, optional).

### Running the app with Docker:
1. Build the Docker image:
   ```bash
   docker build -t user-dashboard .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 3000:3000 user-dashboard
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app.

## API Endpoints (Using Firebase Realtime Database):

### Fetch Users (GET):
```
GET https://userdashboardcurd-35d3e-default-rtdb.firebaseio.com/users.json
```

### Create User (POST):
```
POST https://userdashboardcurd-35d3e-default-rtdb.firebaseio.com/users.json
Body: { "name": "User Name", "email": "user@example.com" }
```

### Update User (PUT):
```
PUT https://userdashboardcurd-35d3e-default-rtdb.firebaseio.com/users/{id}.json
Body: { "name": "Updated Name", "email": "updated@example.com" }
```

### Delete User (DELETE):
```
DELETE https://userdashboardcurd-35d3e-default-rtdb.firebaseio.com/users/{id}.json
```