import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import defaultTheme, { GlobalStyle } from "./Themes/defaultTheme";

import Home from "./Pages/Home/Home";
import BookSearch from "./Pages/BookSearch/BookSearch";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Book from "./Pages/Book/Book";
import NotFound from "./Pages/NotFound/NotFound";
import Layout from "./Layouts/PageLayout/PageLayout";
import Register from "./Pages/Register/Register";

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bookSearch/:searchPhrase" element={<BookSearch />} />
          <Route path="profile" element={<Profile />} />
          <Route path="book/:id" element={<Book />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
