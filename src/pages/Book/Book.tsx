import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const Book = (props: Props) => {
  const { id } = useParams();
  return <div>Book {id}</div>;
};

export default Book;
