import React, { useState } from "react";
import { AdvancedBookType } from "../../types";

import Form from "../../Components/Form/Form";
import FormInput from "../../Components/Form/FormInput";
import FormSubmitButton from "../../Components/Form/FormSubmitButton";
import TextArea from "../../Components/Form/TextArea";
import TagsInput from "../Form/TagsInput";
import { validateNonEmpty, xssSanitize } from "../Form/validators";
import IncorrectInput from "../Form/IncorrectInput";

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

  const [isBookDataInvalid, setIsBookDataInvalid] = useState<{
    titleInvalid: boolean;
    authorInvalid: boolean;
  }>({ titleInvalid: false, authorInvalid: false });

  const isBookDataValid = (bookData: AdvancedBookType) => {
    const isTitleValid = validateNonEmpty(bookData.title);
    const isAuthorValid =
      bookData.authors.length > 0 && validateNonEmpty(bookData.authors[0]);
    setIsBookDataInvalid({
      titleInvalid: !isTitleValid,
      authorInvalid: !isAuthorValid,
    });
    return isTitleValid && isAuthorValid;
  };

  const updateAuthorsData = (authors: string[]) => {
    let authorsClean: string[] = [];
    authors.forEach((author) => {
      if (!author.includes(",") && author !== "") {
        authorsClean.push(xssSanitize(author));
      }
    });
    setBookData({ ...bookData, authors: authorsClean });
  };

  const updateCategoriesData = (authors: string[]) => {
    let categoriesClean: string[] = [];
    authors.forEach((category) => {
      if (!category.includes(",") && category !== "") {
        categoriesClean.push(xssSanitize(category));
      }
    });
    setBookData({ ...bookData, categories: categoriesClean });
  };

  const updateBookData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setBookData({ ...bookData, [e.target.name]: xssSanitize(value) });
  };

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBookDataValid(bookData)) {
      await fetch("/api/books/addBook", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      onSubmit();
    }
  };

  return (
    <Form onSubmit={handleAddBook}>
      <FormInput
        type="text"
        placeholder="Title"
        name="title"
        value={bookData.title}
        onChange={updateBookData}
      />
      <IncorrectInput
        display={isBookDataInvalid.titleInvalid}
        message={"Title is required"}
      />
      <TagsInput
        name={"authors"}
        placeholder={"Author"}
        onChange={updateAuthorsData}
      />
      <IncorrectInput
        display={isBookDataInvalid.authorInvalid}
        message={"At least one author is required"}
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
