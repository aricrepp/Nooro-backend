# Express Todo Backend

This is my RESTful API backend for Nooro Full-Stack Test built with Express, MySQL, and Prisma.

## Prerequisites

Before you start, you must have the following:

- Node.js v16
- MySQL v8
- npm

## Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd todo-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your database configuration:

```env
DATABASE_URL="mysql://user:password@localhost:3306/todo_db"
```

4. Set up the database and run migrations:

```bash
npx prisma migrate dev
```

## Running the Application

```bash
npm run dev
```

## Running Tests

```bash
npm run test
```

## API Swagger Doc

### Get all tasks

```
GET /tasks
```

```json
[
  {
    "id": 1,
    "title": "Complete project",
    "completed": false,
    "color": "#FF0000",
    "createdOn": "2024-01-19T10:00:00Z",
    "updatedOn": "2024-01-19T10:00:00Z"
  }
]
```

### Create a task

```
POST /tasks
```

```json
{
  "title": "New task",
  "color": "#FF0000"
}
```

### Update a task

```
PUT /tasks/:id
```

```json
{
  "title": "Updated task",
  "completed": true,
  "color": "#00FF00"
}
```

### Delete a task

```
DELETE /tasks/:id
```
