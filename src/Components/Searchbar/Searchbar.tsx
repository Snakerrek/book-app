import React from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

const SearchbarWrapper = styled.form`
  width: 100%;
  max-width: 800px;
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
  return (
    <SearchbarWrapper>
      <input
        type={"text"}
        placeholder={"Search for book or an author!"}
        name={"search"}
      />
      <button type="submit">
        <FaSearch />
      </button>
    </SearchbarWrapper>
  );
};

export default Searchbar;
