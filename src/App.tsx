import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import defaultTheme, { GlobalStyle } from "./Themes/defaultTheme";

import Home from "./Pages/Home/Home";
import BookSearch from "./Pages/BookSearch/BookSearch";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import NotFound from "./Pages/NotFound/NotFound";
import Layout from "./Layouts/PageLayout/PageLayout";
import Register from "./Pages/Register/Register";
import BookDetails from "./Pages/BookDetails/BookDetails";
import EditProfile from "./Pages/EditProfile/EditProfile";
import Logout from "./Pages/Logout/Logout";
import BookList from "./Pages/BookList/BookList";
import UserList from "./Pages/UserList/UserList";

const App = (): JSX.Element => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bookSearch/:searchPhrase" element={<BookSearch />} />
          <Route path="bookSearch/" element={<BookSearch />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="profile/" element={<Profile />} />
          <Route path="editProfile" element={<EditProfile />} />
          <Route path="bookDetails/:id" element={<BookDetails />} />
          <Route path="bookList/" element={<BookList />} />
          <Route path="bookList/:userId" element={<BookList />} />
          <Route path="userList" element={<UserList />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
