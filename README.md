# student-result-management-system

This project is a Student Result Management System designed to manage student results for different courses. It consists of both a backend API and a frontend UI.

## Project Structure

### Frontend UI

The frontend UI is responsible for providing a user interface to interact with the system. The structure includes HTML files for different pages and a components directory for modular components.

- **home.html**: Main landing page.
- **components**:
  - **addNewStudent.html**: Page for adding a new student.
  - **addNewCourse.html**: Page for adding a new course.
  - **addNewResult.html**: Page for adding a new result.
  - **studentsList.html**: Page for displaying a list of students.
  - **coursesList.html**: Page for displaying a list of courses.
  - **resultsList.html**: Page for displaying a list of results.

### Backend API

The backend API provides endpoints for creating, retrieving, and deleting results, courses, and students. The structure includes a `server.js` file, models directory for MongoDB schema models, and routes directory for API route handlers.

- **server.js**: Entry point for the backend server.

- **models**:

  - **student.js**: MongoDB schema model for students.
  - **course.js**: MongoDB schema model for courses.
  - **result.js**: MongoDB schema model for results.

- **routes**:
  - **students.js**: API route handlers for managing students.
  - **courses.js**: API route handlers for managing courses.
  - **results.js**: API route handlers for managing results.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MongoDB installed locally or accessible via a cloud service.
- Basic understanding of web development concepts.

## Getting Started

To get started with the project, follow the instructions in each section of the project structure.

## Dependencies

- **express**: Web application framework.
- **mongoose**: MongoDB object modeling for Node.js.
- **cors**: Enable CORS for Express.
- **dotenv**: Load environment variables from a .env file.

These dependencies are essential for the functionality of the Student Result Management System. Make sure to install them using:

```bash
npm install
```
