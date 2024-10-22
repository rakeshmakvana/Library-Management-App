import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import BookCatalogPage from "./components/BookCatalogPage";
import Profile from "./components/Profile";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AddBooks from "./components/AddBooks";
import AllBooks from "./components/AllBooks";
import PrivateRoute from "./privateRoute";
import RouterComp from "./components/RouterComp";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <RouterComp />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "/",
        element: (
          <PrivateRoute>
            <BookCatalogPage />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "addBook",
        element: (
          <PrivateRoute>
            <AddBooks />
          </PrivateRoute>
        ),
      },{
        path: "/edit-book/:id",
        element: (
          <PrivateRoute>
            <AddBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "allBooks",
        element: (
          <PrivateRoute>
            <AllBooks />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
      <Toaster />
    </Provider>
  );
}

export default App;