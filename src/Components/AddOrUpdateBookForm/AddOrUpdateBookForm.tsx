import React, { useState } from "react";
import { AdvancedBookType } from "../../types";
import Select, { MultiValue } from "react-select";

import Form from "../Form/Form";
import FormInput from "../Form/FormInput";
import FormSubmitButton from "../Form/FormSubmitButton";
import TextArea from "../Form/TextArea";
import TagsInput from "../Form/TagsInput";
import { validateNonEmpty, xssSanitize } from "../Form/validators";
import IncorrectInput from "../Form/IncorrectInput";
import styled from "styled-components";
import { getGenreOptions, getGenresByValue } from "../../configService";

interface Props {
  onSubmit: () => void;
  initialBookData?: AdvancedBookType;
  updateBookDataState?: (bookData: AdvancedBookType) => void;
}

const CoverPeak = styled.div<{ backgroundImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: auto;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(${(props) => props.backgroundImage});
`;

const AddOrUpdateBookForm = ({
  onSubmit,
  initialBookData,
  updateBookDataState,
}: Props) => {
  const [bookData, setBookData] = useState<AdvancedBookType>(
    initialBookData || {
      title: "",
      publishedDate: "",
      publisher: "",
      cover: "",
      authors: [""],
      isbn: "",
      description: "",
      pageCount: "",
      categories: [""],
      reviews: [],
    }
  );

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

  const updateCategoriesData = (
    categories: MultiValue<{ value: string; label: string }>
  ) => {
    let categoriesClean: string[] = categories.map(
      (category) => category.value
    );
    setBookData({ ...bookData, categories: categoriesClean });
  };

  const updateBookData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setBookData({ ...bookData, [e.target.name]: xssSanitize(value) });
  };

  const handleAddOrUpdateBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(bookData.title);
    if (isBookDataValid(bookData)) {
      const resJson = await fetch(
        initialBookData
          ? `api/books/updateBook/${initialBookData._id}`
          : "/api/books/addBook",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(bookData),
        }
      );
      const res = await resJson.json();
      if (updateBookDataState) {
        updateBookDataState(res.book);
      }
      onSubmit();
    }
  };

  return (
    <Form onSubmit={handleAddOrUpdateBook}>
      <p>Tytuł</p>
      <FormInput
        type="text"
        placeholder="Tytuł"
        name="title"
        value={bookData.title}
        onChange={updateBookData}
      />
      <IncorrectInput
        display={isBookDataInvalid.titleInvalid}
        message={"Tytuł jest wymagany"}
      />
      <p>Autorzy</p>
      <TagsInput
        name={"authors"}
        placeholder={"Autor"}
        onChange={updateAuthorsData}
        initialData={bookData.authors}
      />
      <IncorrectInput
        display={isBookDataInvalid.authorInvalid}
        message={"Przynajmniej jeden autor jest wymagany"}
      />
      {!!bookData.cover && <CoverPeak backgroundImage={bookData.cover} />}
      <p>Okładka</p>
      <FormInput
        type="text"
        placeholder="Okładka"
        name="cover"
        value={bookData.cover}
        onChange={updateBookData}
      />
      <p>Wydawnictwo</p>
      <FormInput
        type="text"
        placeholder="Wydawnictwo"
        name="publisher"
        value={bookData.publisher}
        onChange={updateBookData}
      />
      <p>Data wydania</p>
      <FormInput
        type="text"
        placeholder="Data wydania"
        name="publishedDate"
        value={bookData.publishedDate}
        onChange={updateBookData}
      />
      <p>Opis</p>
      <TextArea
        placeholder="Opis"
        name="description"
        value={bookData.description}
        onChange={updateBookData}
      />
      <p>Gatunek</p>
      <Select
        isMulti
        defaultValue={getGenresByValue(bookData.categories)}
        name="categories"
        options={getGenreOptions()}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(categories) => updateCategoriesData(categories)}
      />
      <p>ISBN</p>
      <FormInput
        type="number"
        placeholder="ISBN"
        name="isbn"
        value={bookData.isbn}
        onChange={updateBookData}
      />
      <p>Ilość stron</p>
      <FormInput
        type="number"
        placeholder="Ilość stron"
        name="pageCount"
        value={bookData.pageCount}
        onChange={updateBookData}
      />
      <FormSubmitButton>
        {initialBookData ? "Edytuj książkę" : "Dodaj książkę"}
      </FormSubmitButton>
    </Form>
  );
};

export default AddOrUpdateBookForm;
