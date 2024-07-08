# Course Management System

This is a simple Course Management System built with Node.js, Express, and MongoDB. It provides separate routes for administrators and users, allowing course creation, user registration, and course purchases.

## Features

- User authentication (signup and signin)
- Admin authentication (signup and signin)
- Course creation and listing (admin only)
- Course purchasing (users)
- Viewing purchased courses (users)

## Setup

### Prerequisites

Ensure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

### Database Setup

1. Set up your MongoDB database:
   - This project uses MongoDB Atlas. Make sure you have a MongoDB Atlas account and a cluster set up.
   - In the `db/index.js` file, replace the connection string with your own:
     ```javascript
     mongoose.connect("mongodb+srv://<username>:<password>@<your-cluster-url>/<database-name>")
     ```
   - Replace `<username>`, `<password>`, `<your-cluster-url>`, and `<database-name>` with your actual MongoDB Atlas credentials and chosen database name.

2. Configure the JWT secret:
   - The project uses a hardcoded JWT secret. In a production environment, it's recommended to use an environment variable instead. You can set it up in a `.env` file:
     ```env
     JWT_SECRET=manish12
     ```

### Running the Server

Start the server with:
```bash
node index.js
```
The server will run on port 3000 by default.

## Database Schema

The project uses the following MongoDB schemas:

### Admin Schema

```javascript
const AdminSchema = new mongoose.Schema({
  username: String,
  password: String
});
```

### Course Schema

```javascript
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imgLink: String
});
```

### User Schema

```javascript
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  courses: [CourseSchema]
});
```

## API Endpoints

### Admin Routes

- `POST /admin/signup`: Create a new admin account
- `POST /admin/signin`: Sign in as an admin
- `POST /admin/courses`: Create a new course (requires admin authentication)
- `GET /admin/courses`: List all courses (requires admin authentication)

### User Routes

- `POST /user/signup`: Create a new user account
- `POST /user/signin`: Sign in as a user
- `GET /user/courses`: List all available courses
- `POST /user/courses/:courseId`: Purchase a course (requires user authentication)
- `GET /user/purchasedCourses`: List purchased courses (requires user authentication)

## Authentication

This project uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header of your requests:
```http
Authorization: Bearer <your_token_here>
```

## Project Structure

- `index.js`: Main application file
- `routes/`:
  - `admin.js`: Admin routes
  - `user.js`: User routes
- `middleware/`:
  - `admin.js`: Admin authentication middleware
  - `user.js`: User authentication middleware
- `db/`:
  - `index.js`: Database models and connection

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or improvements.

## License

This project is open source and available under the [MIT License](LICENSE).