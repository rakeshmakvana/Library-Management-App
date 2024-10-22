import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBook, getBookById, updateBook } from "../service/BookOperations"; 

const AddBooks = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        setIsEditMode(true);
        try {
          const bookData = await dispatch(getBookById(id)); 
  
          if (bookData) {
            reset({
              title: bookData.title,
              author: bookData.author,
              description: bookData.description,
              isbn: bookData.isbn,
              genre: bookData.genre,
              copies: bookData.copies,
              bookImage: bookData.bookImage,
            }); 
          } else {
            console.error("No book data found");
          }
        } catch (error) {
          console.error("Error fetching book:", error);
        }
      }
    };
    fetchBook();
  }, [dispatch, id, reset]);
  

  const handleFormSubmit = async (data) => {
    const formData = {
      title: data.title,
      author: data.author,
      description: data.description,
      isbn: data.isbn,
      genre: data.genre,
      copies: data.copies,
      bookImage: data.bookImage, 
    };

    try {
      if (isEditMode) {
        await dispatch(updateBook(id, formData, token));
      } else {
        await dispatch(addBook(formData, token));
      }
      navigate("/books");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="w-[92vw] h-full flex justify-center items-center flex-col text-center text-white my-auto px-40 pb-5 font-Poppins mx-auto">
      <h3 className="font-bold text-4xl text-richgreen-300 mb-3">
        {isEditMode ? "Edit Book" : "Add Book"}
      </h3>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-3 justify-center items-center"
      >
        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="title"
          required
          {...register("title", { required: true })}
        />

        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="author"
          required
          {...register("author", { required: true })}
        />

        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="description"
          required
          {...register("description", { required: true })}
        />
        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="genre"
          required
          {...register("genre", { required: true })}
        />

        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="isbn"
          required
          {...register("isbn", { required: true })}
        />

        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="number"
          placeholder="copies"
          required
          {...register("copies", { required: true })}
        />

        <input
          className="px-5 py-2 border-2 border-yellow-400 rounded-full w-[20rem] text-black"
          type="text"
          placeholder="Book Image URL"
          required
          {...register("bookImage", { required: true })}
        />

        <button
          type="submit"
          className="bg-richYellow hover:bg-yellow-400 text-richBlue-100 font-saira text-xl font-bold p-2 px-7 rounded-full w-[20rem]"
        >
          {isEditMode ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
