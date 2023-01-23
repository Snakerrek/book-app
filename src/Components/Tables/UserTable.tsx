import React from "react";
import { UserData } from "../../types";
import { getAvatar, getGenreLabel } from "../../configService";
import { calculateUserLevel, getFavoriteCategory } from "../../helpers";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const BookTableWrapper = styled.div`
  overflow-x: scroll;
`;

const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9rem;
  margin: 15px;
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
  border-radius: 5px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  tbody {
    tr {
      cursor: pointer;
      transition: 0.2s ease-in-out;
      :hover {
        box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
      }
    }
  }
  td {
    padding: 5px 10px;
  }
  td:nth-child(odd),
  th:nth-child(odd) {
    background-color: ${(props) => props.theme.backgroundColors.greyish};
  }
  th {
    padding: 10px;
  }
`;

type Props = { users: UserData[]; onRedirect?: () => void };

const UserTable = ({ users, onRedirect }: Props) => {
  const navigate = useNavigate();

  const redirectToUserProfile = (userId: string) => {
    if (onRedirect) onRedirect();
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <BookTableWrapper>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Nazwa użytkownika</th>
            <th>Poziom</th>
            <th>Ilość obserwujących</th>
            <th>Ilość książek</th>
            <th>Ulubiony gatunek</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} onClick={() => redirectToUserProfile(user._id)}>
              <td>
                <img
                  src={user.avatar ? user.avatar : getAvatar("default")?.url}
                  alt="avatar"
                />{" "}
              </td>
              <td>
                <h3>{user.username}</h3>
              </td>
              <td>{calculateUserLevel(user.books).lvl} Lvl</td>
              <td>{user.followers.length}</td>
              <td>{user.books.length}</td>
              <td>
                {!!user.books && getGenreLabel(getFavoriteCategory(user.books))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </BookTableWrapper>
  );
};

export default UserTable;
