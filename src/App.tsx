import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import defaultTheme, { GlobalStyle } from "./Themes/defaultTheme";

import Home from "./pages/Home/Home";
import BookList from "./pages/BookList/BookList";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Book from "./pages/Book/Book";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./Layouts/PageLayout/PageLayout";

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bookList" element={<BookList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="book">
            <Route path=":id" element={<Book />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
