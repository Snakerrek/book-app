import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDebounce from "../../Hooks/useDebounce";
import {
  validateNonEmpty,
  validateSQLInjection,
  xssSanitize,
} from "../Form/validators";

const SearchbarWrapper = styled.form`
  width: 80%;
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  border-radius: 40px;
  padding: 5px 10px;
  min-width: 100px;

  & input {
    background: transparent;
    flex: 1;
    border: 0;
    outline: none;
    padding: 10px 6px;
    font-size: ${(props) => props.theme.fontSize.M};
    color: ${(props) => props.theme.textColors.grey};

    ::placeholder {
      color: ${(props) => props.theme.textColors.grey};
    }
  }

  & button {
    border: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background: transparent;
    cursor: pointer;

    svg {
      width: 80%;
      height: 80%;
      color: ${(props) => props.theme.textColors.grey};
    }
  }
`;

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const debouncedSearchPhrase = useDebounce<string>(searchPhrase);

  const redirectToSearch = () => {
    const sanitizedSearchPhrase = xssSanitize(debouncedSearchPhrase);
    if (
      validateNonEmpty(sanitizedSearchPhrase) &&
      validateSQLInjection(sanitizedSearchPhrase)
    ) {
      navigate(`/bookSearch/${sanitizedSearchPhrase}`);
    }
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    redirectToSearch();
  };

  useEffect(() => {
    redirectToSearch();
  }, [debouncedSearchPhrase]);

  return (
    <SearchbarWrapper onSubmit={onSearch}>
      <input
        type={"text"}
        placeholder={"Search for book or an author!"}
        onChange={(e) => setSearchPhrase(e.target.value)}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </SearchbarWrapper>
  );
};

export default Searchbar;
