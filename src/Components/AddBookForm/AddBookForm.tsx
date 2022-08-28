import React, { useState } from "react";
import { AdvancedBookType } from "../../types";

import Form from "../../Components/Form/Form";
import FormInput from "../../Components/Form/FormInput";
import FormSubmitButton from "../../Components/Form/FormSubmitButton";

const AddBookForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [bookData, setBookData] = useState<AdvancedBookType>({
    title: "",
    cover: "",
    authors: [""],
    isbn: "",
    description: "",
    pageCount: "",
    categories: [""],
  });

  const updateBookData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "authors" || e.target.name === "categories") {
      const value = [e.target.value];
      setBookData({ ...bookData, [e.target.name]: value });
    } else {
      const value = e.target.value;
      setBookData({ ...bookData, [e.target.name]: value });
    }
  };

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/books/addBook", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    onSubmit();
  };

  return (
    <Form onSubmit={handleAddBook}>
      <FormInput
        type="text"
        placeholder="Title"
        required
        name="title"
        value={bookData.title}
        onChange={updateBookData}
      />
      <FormInput
        type="text"
        placeholder="Authors"
        required
        name="authors"
        value={bookData.authors}
        onChange={updateBookData}
      />
      <FormInput
        type="text"
        placeholder="Cover"
        name="cover"
        value={bookData.cover}
        onChange={updateBookData}
      />
      <FormInput
        type="text"
        placeholder="Description"
        name="description"
        value={bookData.description}
        onChange={updateBookData}
      />
      <FormInput
        type="text"
        placeholder="Categories"
        name="categories"
        value={bookData.categories}
        onChange={updateBookData}
      />
      <FormInput
        type="number"
        placeholder="ISBN"
        name="isbn"
        value={bookData.isbn}
        onChange={updateBookData}
      />
      <FormInput
        type="number"
        placeholder="Page count"
        name="pageCount"
        value={bookData.pageCount}
        onChange={updateBookData}
      />
      <FormSubmitButton>Add Book</FormSubmitButton>
    </Form>
  );
};

export default AddBookForm;
