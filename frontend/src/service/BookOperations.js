import { endpoints } from "./apis";
import { apiConnector } from "./apiConnector";
import toast from "react-hot-toast";

export const getBooks = async () => {
  const toastId = toast.loading("Fetching Books...");
  const response = await apiConnector(
    "GET",
    endpoints.getBooks,
    null,
    null,
    null
  ).catch((err) => {
    toast.error("Error fetching books");
  });
  toast.success("Successfully Fetched Books");
  toast.dismiss(toastId);
  return response.data;
};

export const getIssuedBooks = async (userId, token) => {
  const toastId = toast.loading("Fetching Issued Books...");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await apiConnector(
    "GET",
    `${endpoints.getIssuedBooks}/get=${userId}`,
    null,
    headers,
    null
  ).catch((err) => {
    toast.error("Error fetching issued books");
    toast.dismiss(toastId);
  });
  toast.success("Successfully Fetched Issued Books");
  toast.dismiss(toastId);
  return response.data.data;
};

export const borrowBook = async (bookId, userId, token) => {
  const toastId = toast.loading("Borrowing Book...");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const data = {
    bookId: bookId,
    userId: userId,
  };
  const response = await apiConnector(
    "POST",
    endpoints.borrowBook,
    data,
    headers,
    null
  ).catch((err) => {
    toast.error("Error borrowing book");
    toast.dismiss(toastId);
  });
  toast.success("Successfully Borrowed Book");
  toast.dismiss(toastId);
  return response.data;
};

export const returnBook = async (bookId, userId, token) => {
  const toastId = toast.loading("Returning Book...");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const data = {
    bookId: bookId,
    userId: userId,
  };
  const response = await apiConnector(
    "POST",
    endpoints.returnBook,
    data,
    headers,
    null
  ).catch((err) => {
    toast.error("Error returning book");
    toast.dismiss(toastId);
  });
  toast.success("Successfully Returned Book");
  toast.dismiss(toastId);
  return response.data;
};

export const addBook = async (data, token) => {
  const toastId = toast.loading("Adding Book...");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await apiConnector(
    "POST",
    endpoints.addBook,
    data,
    headers,
    null
  ).catch((err) => {
    toast.error("Error adding book");
    toast.dismiss(toastId);
    console.log(err);
  });

  console.log("ADD BOOK RESPONSE : ", response);
  toast.success("Successfully Added Book");
  toast.dismiss(toastId);
  return response.data;
};

export const updateBook = async (bookId, data, token) => {
  const toastId = toast.loading("Updating Book...");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await apiConnector(
    "PUT",
    `${endpoints.updateBook}/${bookId}`,
    data,
    headers,
    null
  ).catch((err) => {
    toast.error("Error updating book");
    toast.dismiss(toastId);
  });
  toast.success("Successfully Updated Book");
  toast.dismiss(toastId);
  return response.data;
};

export const deleteBook = async (bookId, token) => {
  const toastId = toast.loading("Deleting Book...");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const response = await apiConnector(
    "DELETE",
    `${endpoints.deleteBook}/${bookId}`,
    null,
    headers,
    null
  ).catch((err) => {
    toast.error("Error deleting book");
    toast.dismiss(toastId);
  });
  toast.success("Successfully Deleted Book");
  toast.dismiss(toastId);
  return response.data;
};

export const getBookById = async (bookId) => {
  const toastId = toast.loading("Fetching Book...");
  const response = await apiConnector(
    "GET",
    `${endpoints.getBookById}/${bookId}`,
    null,
    null,
    null
  ).catch((err) => {
    toast.error("Error fetching book");
    toast.dismiss(toastId);
  });
  toast.success("Successfully Fetched Book");
  toast.dismiss(toastId);
  return response.data;
};
