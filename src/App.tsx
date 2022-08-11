import { Routes, Route, Link } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Book from "./pages/Book";
import NotFound from "./pages/NotFound";

const App = (): JSX.Element => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bookList">Book list</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/bookList" element={<BookList />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/book/:id" element={<Book />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};

export default App;
