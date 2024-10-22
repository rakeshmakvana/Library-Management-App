const baseURL = `http://localhost:3000/api/v1`;

export const endpoints = {
  login: `${baseURL}/auth/login`,
  signup: `${baseURL}/auth/signup`,
  addBook: `${baseURL}/book/addBook`,
  getAvailableBooks: `${baseURL}/book/getAvailableBooks`,
  borrowBook: `${baseURL}/transaction/borrow`,
  returnBook: `${baseURL}/transaction/return`,
  getBooks: `${baseURL}/book/getBooks`,
  getIssuedBooks: `${baseURL}/book/getIssuedBooks`,
  updateBook: `${baseURL}/book/updateBook`, 
  deleteBook: `${baseURL}/book/deleteBook`, 
  getBookById: `${baseURL}/book/getBookById`,
};