import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const BookDetails = (props: Props) => {
  const { id } = useParams();
  return <div>Book {id}</div>;
};

export default BookDetails;
