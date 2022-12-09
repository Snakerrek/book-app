import React, { useEffect } from "react";
import styled from "styled-components";
import UserTable from "../../Components/Tables/UserTable";
import { UserData } from "../../types";

const UserListWrapper = styled.div`
  @media (min-width: 676px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const UserList = () => {
  const [users, setUsers] = React.useState<UserData[]>([]);

  const fetchAllUsers = async () => {
    const usersJson = await fetch("/api/user/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await usersJson.json();
    setUsers(users);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllUsers();
  }, []);

  return (
    <UserListWrapper>
      <UserTable users={users} />
    </UserListWrapper>
  );
};

export default UserList;
