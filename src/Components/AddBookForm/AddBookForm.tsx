import React, { useState } from "react";
import { AdvancedBookType } from "../../types";

import Form from "../../Components/Form/Form";
import FormInput from "../../Components/Form/FormInput";
import FormSubmitButton from "../../Components/Form/FormSubmitButton";
import TextArea from "../../Components/Form/TextArea";
import TagsInput from "../Form/TagsInput";

const AddBookForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [bookData, setBookData] = useState<AdvancedBookType>({
    title: "",
    cover: "",
    authors: [""],
    isbn: "",
    description: "",
    pageCount: "",
    categories: [""],
    reviews: [],
  });

  const updateAuthorsData = (authors: string[]) => {
    let authorsClean: string[] = [];
    authors.forEach((author) => {
      if (!author.includes(",") && author !== "") {
        authorsClean.push(author);
      }
    });
    setBookData({ ...bookData, authors: authorsClean });
  };

  const updateCategoriesData = (authors: string[]) => {
    let categoriesClean: string[] = [];
    authors.forEach((category) => {
      if (!category.includes(",") && category !== "") {
        categoriesClean.push(category);
      }
    });
    setBookData({ ...bookData, categories: categoriesClean });
  };

  const updateBookData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setBookData({ ...bookData, [e.target.name]: value });
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
      <TagsInput
        name={"authors"}
        placeholder={"Author"}
        onChange={updateAuthorsData}
      />
      <FormInput
        type="text"
        placeholder="Cover"
        name="cover"
        value={bookData.cover}
        onChange={updateBookData}
      />
      <TextArea
        placeholder="Description"
        name="description"
        value={bookData.description}
        onChange={updateBookData}
      />
      <TagsInput
        name={"categories"}
        placeholder={"Category"}
        onChange={updateCategoriesData}
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
