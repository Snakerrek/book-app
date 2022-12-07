import React from "react";
import { UserData } from "../../types";
import { getAvatar, getGenreLabel } from "../../configService";
import { calculateUserLevel, getFavoriteCategory } from "../../helpers";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9rem;
  margin: 15px;
  box-shadow: ${(props) => props.theme.shadows.lightGreyShadow};
  border-radius: 5px;
  @media (max-width: 676px) {
    transform-origin: top left;
    transform: scale(0.75);
    font-size: 0.8rem;
  }
  @media (max-width: 500px) {
    transform-origin: top left;
    transform: scale(0.5);
    font-size: 0.6rem;
  }

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
  th {
    padding: 10px;
  }
`;

type Props = { users: UserData[] };

const UserTable = ({ users }: Props) => {
  const navigate = useNavigate();

  const redirectToUserProfile = (userId: string) => {
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Nazwa użytkownika</th>
            <th>Poziom</th>
            <th>Ilość followersów</th>
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
              <td>0</td>
              <td>{user.books.length}</td>
              <td>
                {!!user.books && getGenreLabel(getFavoriteCategory(user.books))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
