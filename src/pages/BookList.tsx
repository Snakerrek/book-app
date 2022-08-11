import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const BookList = (props: Props) => {
  return (
    <div>
      BookList
      <br />
      <Link to="/book/1">Book 1</Link>
      <Link to="/book/2">Book 2</Link>
    </div>
  );
};

export default BookList;
