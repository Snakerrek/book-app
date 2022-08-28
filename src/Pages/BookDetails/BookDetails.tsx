import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdvancedBookType } from "../../types";

type Props = {};

const BookDetails = (props: Props) => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState<AdvancedBookType | null>(null);

  const fetchBookDetails = async (bookId: string) => {
    const bookDetJson = await fetch(`/api/books/getDetails/${id}`);
    const bookDet = await bookDetJson.json();
    setBookDetails(bookDet);
  };

  useEffect(() => {
    if (id) fetchBookDetails(id);
  }, [id]);

  return <div>Book {id}</div>;
};

export default BookDetails;
