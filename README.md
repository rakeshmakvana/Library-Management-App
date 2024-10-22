# Library Management App

An Libarary Management Application built with React, Node.js, Express, and MongoDB. This application allows users to create, manage, and borow to books. It includes features such as image uploads, JWT token authentication, and a responsive UI.

## Features

- User Authentication using JWT
- Create, Read, Update, and Delete (CRUD) operations for books
- borow functionality for book and return the books
- Image upload for events using url
- Responsive and user-friendly interface
- Data stored in MongoDB Atlas

## Technologies Used

- **Frontend:** React, Axios, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT
- **CSS Framework:** Tailwind CSS (or any other framework you choose)

## Environment Variables

Before running the application, set up the following environment variables :-

  MONGODB_URL = your db link

  JWT_SECRET_KEY = your secret

  PORT = 3000


## Getting Started

### Clone the Repository

```bash
git clone https://github.com/rakeshmakvana/Library-Management-App
```

## Frontend Setup

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

## Backend Setup

```bash
cd backend
```

```bash
npm install
```

```bash
npm start
```

## URLs

Frontend URL: http://localhost:5173

Backend URL: http://localhost:3000

## Usage

You want to implement a complete CRUD system for managing books,
which includes functionalities for adding, deleting, and updating book records. 
Additionally, users should have the ability to borrow books, view a list of borrowed items, return them, and access detailed information about each book. 
This system will enhance user experience by providing a comprehensive management interface for both books and borrowing activities.

## Troubleshooting

If you encounter any issues while running the application, please ensure :-

You have set the correct environment variables.
The MongoDB Atlas connection string is correct and your IP is whitelisted.
Both frontend and backend servers are running without errors.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
