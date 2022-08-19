import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const BookSearch = (props: Props) => {
  const { searchPhrase } = useParams();
  return <div>BookSearch, search phrase: {searchPhrase}</div>;
};

export default BookSearch;
